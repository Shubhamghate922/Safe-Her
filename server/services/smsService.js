import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

// Mock SMS service for development
export const sendSMS = async (to, message) => {
  try {
    // If no Twilio credentials, use mock
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      console.log('📱 [MOCK] SMS would be sent to:', to);
      console.log('Message:', message);
      return { success: true, mock: true };
    }

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const result = await client.messages.create({
      body: message,
      to: to,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    console.log('SMS sent:', result.sid);
    return { success: true, sid: result.sid };
  } catch (error) {
    console.error('SMS sending error:', error.message);
    return { success: false, error: error.message };
  }
};

export const sendSOSAlertSMS = async (contactPhone, userName, locationLink) => {
  const message = `
    🚨 URGENT SOS ALERT!
    
    ${userName} needs your immediate help!
    
    Location: ${locationLink}
    
    Please respond immediately or contact emergency services.
  `;
  
  return await sendSMS(contactPhone, message);
};