import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Mock email service for development
export const sendEmail = async (to, subject, text) => {
  try {
    // If no email credentials, use mock
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('📧 [MOCK] Email would be sent to:', to);
      console.log('Subject:', subject);
      console.log('Message:', text);
      return { success: true, mock: true };
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return { success: true, info };
  } catch (error) {
    console.error('Email sending error:', error.message);
    return { success: false, error: error.message };
  }
};

export const sendSOSAlertEmail = async (contactEmail, userName, locationLink) => {
  const subject = `🚨 SOS Alert - ${userName} needs your help!`;
  const text = `
    URGENT: ${userName} has triggered an SOS emergency alert!
    
    Current Location: ${locationLink}
    
    Please contact ${userName} immediately or reach out to emergency services.
    
    Time: ${new Date().toLocaleString()}
  `;
  
  return await sendEmail(contactEmail, subject, text);
};