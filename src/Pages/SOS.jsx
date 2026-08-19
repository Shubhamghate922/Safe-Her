import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle, Loader2, MapPin, Users } from 'lucide-react';
import { contactsAPI, sosAPI } from '../services/api';
import toast from 'react-hot-toast';

const getCurrentPosition = () => new Promise((resolve, reject) => {
  if (!navigator.geolocation) {
    reject(new Error('Geolocation is not supported by this browser.'));
    return;
  }
  navigator.geolocation.getCurrentPosition(resolve, reject, {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 0,
  });
});

const SOS = () => {
  const [contacts, setContacts] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    contactsAPI.getAll()
      .then((response) => setContacts(response.success ? response.data : []))
      .catch(() => toast.error('Could not load emergency contacts.'));
    return () => clearInterval(timerRef.current);
  }, []);

  const sendSOS = async () => {
    setSending(true);
    try {
      const position = await getCurrentPosition();
      const response = await sosAPI.create({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        message: 'SOS Emergency Alert — immediate help needed.',
      });
      if (!response.success) throw new Error(response.message || 'Could not send SOS alert.');
      setSent(true);
      toast.success('SOS alert sent successfully.');
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Could not send SOS alert.');
    } finally {
      setSending(false);
      setCountdown(null);
    }
  };

  const startCountdown = () => {
    if (sending || countdown !== null) return;
    let remaining = 5;
    setCountdown(remaining);
    timerRef.current = setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);
      if (remaining === 0) {
        clearInterval(timerRef.current);
        sendSOS();
      }
    }, 1000);
  };

  const cancelCountdown = () => {
    clearInterval(timerRef.current);
    setCountdown(null);
    toast('SOS cancelled.');
  };

  const activeContacts = contacts.filter((contact) => contact.isActive !== false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50 p-6 flex items-center justify-center">
      <section className="w-full max-w-xl text-center bg-white rounded-3xl shadow-xl p-8 md:p-12">
        {sent ? (
          <>
            <CheckCircle className="mx-auto text-green-600 mb-5" size={72} />
            <h1 className="text-3xl font-bold text-gray-900">SOS alert sent</h1>
            <p className="mt-3 text-gray-600">Your location and emergency alert have been recorded and sent to your trusted contacts.</p>
            <button onClick={() => setSent(false)} className="mt-8 rounded-full bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700">Send another SOS</button>
          </>
        ) : (
          <>
            <AlertTriangle className="mx-auto text-red-600 mb-5" size={64} />
            <h1 className="text-3xl font-bold text-gray-900">Emergency SOS</h1>
            <p className="mt-3 text-gray-600">Press SOS to start a 5-second countdown. Your live location will be included in the alert.</p>
            <button
              type="button"
              onClick={startCountdown}
              disabled={sending || countdown !== null}
              className="mx-auto mt-9 flex h-56 w-56 items-center justify-center rounded-full bg-red-600 text-4xl font-black text-white shadow-2xl shadow-red-300 transition hover:scale-105 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? <Loader2 className="animate-spin" size={48} /> : countdown !== null ? countdown : 'SOS'}
            </button>
            {countdown !== null && !sending && <button onClick={cancelCountdown} className="mt-5 text-sm font-semibold text-gray-600 underline">Cancel emergency alert</button>}
            <div className="mt-10 flex items-center justify-center gap-2 text-sm text-gray-600"><Users size={17} /> {activeContacts.length} emergency contact{activeContacts.length === 1 ? '' : 's'} ready to notify</div>
            <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-500"><MapPin size={15} /> Location permission is required to send SOS.</div>
          </>
        )}
      </section>
    </main>
  );
};

export default SOS;
