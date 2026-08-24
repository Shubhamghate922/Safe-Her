import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, ArrowLeft, CheckCircle, Loader2, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { contactsAPI, sosAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth.jsx';
import toast from 'react-hot-toast';

const SOS = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [confirming, setConfirming] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [accuracy, setAccuracy] = useState(null);
  const timerRef = useRef(null);
  const popupWindowsRef = useRef([]);

  useEffect(() => {
    contactsAPI.getAll()
      .then((response) => setContacts(response.success ? response.data : []))
      .catch(() => toast.error('Could not load emergency contacts.'));
    return () => clearInterval(timerRef.current);
  }, []);

  // WhatsApp is sent to every saved emergency contact with a phone number.
  const emergencyContacts = contacts.filter((contact) => contact.phone);

  const closePopups = () => {
    popupWindowsRef.current.forEach((popup) => popup && popup.close());
    popupWindowsRef.current = [];
  };

  const getBestPosition = () => new Promise((resolve, reject) => {
    let bestPosition = null;
    let settled = false;
    let timeoutId;
    const finish = (position) => {
      if (settled) return;
      settled = true;
      navigator.geolocation.clearWatch(watchId);
      clearTimeout(timeoutId);
      resolve(position);
    };
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        if (!bestPosition || position.coords.accuracy < bestPosition.coords.accuracy) {
          bestPosition = position;
          setAccuracy(Math.round(position.coords.accuracy));
        }
        // A 30 m accuracy is normally a useful GPS-quality SOS location.
        if (position.coords.accuracy <= 30) finish(position);
      },
      (error) => {
        if (!settled) {
          settled = true;
          navigator.geolocation.clearWatch(watchId);
          clearTimeout(timeoutId);
          reject(error);
        }
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
    );
    // GPS can take time indoors. Use the best fresh reading after 10 seconds
    // instead of delaying an emergency indefinitely.
    timeoutId = setTimeout(() => {
      if (bestPosition) finish(bestPosition);
      else {
        navigator.geolocation.clearWatch(watchId);
        reject(new Error('Unable to obtain a fresh location. Move outdoors or enable precise location.'));
      }
    }, 10000);
  });

  const cancel = () => {
    clearInterval(timerRef.current);
    closePopups();
    setCountdown(null);
    setConfirming(false);
    toast('SOS cancelled.');
  };

  const dispatchSOS = async () => {
    setSending(true);
    try {
      if (!navigator.geolocation) throw new Error('Location is not supported by this browser.');
      const position = await getBestPosition();
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const positionAccuracy = Math.round(position.coords.accuracy);
      setAccuracy(positionAccuracy);
      const response = await sosAPI.create({
        latitude,
        longitude,
        address: 'Current location',
        message: 'SOS Emergency! ' + (user?.name || 'User') + ' needs immediate help!',
        severity: 'critical',
        accuracy: positionAccuracy,
      });
      if (!response.success) throw new Error(response.message || 'Could not create SOS alert.');

      const message = [
        'SOS EMERGENCY ALERT',
        '',
        (user?.name || 'SafeHer User') + ' needs immediate help.',
        'Phone: ' + (user?.phone || 'Not available'),
        'Time: ' + new Date().toLocaleString('en-IN'),
        'GPS accuracy: approximately ' + positionAccuracy + ' m',
        '',
        'Location: https://www.google.com/maps?q=' + latitude + ',' + longitude,
      ].join('\n');

      emergencyContacts.forEach((contact, index) => {
        const phone = contact.phone.replace(/\D/g, '').replace(/^0/, '');
        const internationalPhone = phone.length === 10 ? '91' + phone : phone;
        const whatsappUrl = 'https://wa.me/' + internationalPhone + '?text=' + encodeURIComponent(message);
        const popup = popupWindowsRef.current[index];
        if (popup) popup.location.href = whatsappUrl;
        else window.open(whatsappUrl, '_blank');
      });
      popupWindowsRef.current = [];
      setSent(true);
      toast.success('SOS created and WhatsApp messages opened.');
    } catch (error) {
      closePopups();
      toast.error(error.response?.data?.message || error.message || 'Failed to send SOS.');
    } finally {
      setSending(false);
      setCountdown(null);
    }
  };

  const confirmAndStart = () => {
    if (emergencyContacts.length === 0) {
      toast.error('Add at least one emergency contact with a phone number before sending SOS.');
      return;
    }
    // Reserve browser tabs while this is a user-initiated click. They receive
    // WhatsApp URLs only after the SOS API confirms that the alert was created.
    popupWindowsRef.current = emergencyContacts.map(() => window.open('', '_blank'));
    setConfirming(false);
    let remaining = 5;
    setCountdown(remaining);
    timerRef.current = setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);
      if (remaining === 0) {
        clearInterval(timerRef.current);
        dispatchSOS();
      }
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 p-6 flex items-center justify-center">
      <section className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl">
        <button onClick={() => navigate('/dashboard')} className="mb-7 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"><ArrowLeft size={17} /> Back to dashboard</button>
        {sent ? (
          <><CheckCircle size={72} className="mx-auto mb-5 text-green-600" /><h1 className="text-3xl font-bold text-gray-900">SOS sent</h1><p className="mt-3 text-gray-600">Your SOS alert was recorded and WhatsApp messages were opened for your emergency contacts.</p><button onClick={() => setSent(false)} className="mt-7 rounded-full bg-purple-600 px-6 py-3 font-semibold text-white">Send another SOS</button></>
        ) : (
          <><AlertCircle size={64} className="mx-auto mb-4 text-red-600" /><h1 className="text-3xl font-bold text-gray-900">Emergency SOS</h1><p className="mt-3 text-gray-600">Confirm to begin a 5-second countdown. Your current location will be included.</p>
            <button onClick={() => setConfirming(true)} disabled={confirming || countdown !== null || sending} className="mx-auto mt-8 flex h-56 w-56 items-center justify-center rounded-full bg-red-600 text-4xl font-black text-white shadow-xl shadow-red-300 hover:bg-red-700 disabled:opacity-60">{sending ? <Loader2 size={48} className="animate-spin" /> : countdown !== null ? countdown : 'SOS'}</button>
            {confirming && <div className="mt-6 rounded-2xl bg-red-50 p-4"><p className="font-semibold text-gray-800">Send an emergency alert?</p><div className="mt-3 flex justify-center gap-3"><button onClick={confirmAndStart} className="rounded-full bg-red-600 px-5 py-2 font-semibold text-white">Yes, send</button><button onClick={cancel} className="rounded-full bg-gray-200 px-5 py-2 font-semibold text-gray-700">Cancel</button></div></div>}
            {countdown !== null && !sending && <button onClick={cancel} className="mt-5 text-sm font-semibold text-gray-600 underline">Cancel emergency alert</button>}
            <p className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-600"><Users size={17} /> {emergencyContacts.length} emergency contacts will receive a WhatsApp message</p><p className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-500"><MapPin size={15} /> {accuracy ? 'GPS accuracy: about ' + accuracy + ' m' : 'Precise location permission is required.'}</p>
          </>
        )}
      </section>
    </main>
  );
};

export default SOS;
