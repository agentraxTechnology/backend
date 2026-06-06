const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
};

exports.sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error('Email send failed:', error);
    return false;
  }
};

exports.sendContactNotification = async (contact) => {
  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${contact.name}</p>
    <p><strong>Email:</strong> ${contact.email}</p>
    <p><strong>Phone:</strong> ${contact.phone || 'N/A'}</p>
    <p><strong>Company:</strong> ${contact.company || 'N/A'}</p>
    <p><strong>Subject:</strong> ${contact.subject || 'N/A'}</p>
    <p><strong>Message:</strong> ${contact.message}</p>
  `;
  return this.sendEmail({
    to: process.env.SMTP_USER || 'admin@agentrax.com',
    subject: `New Contact: ${contact.name}`,
    html,
  });
};

exports.sendBookingNotification = async (booking) => {
  const html = `
    <h2>New Consultation Booking</h2>
    <p><strong>Name:</strong> ${booking.name}</p>
    <p><strong>Email:</strong> ${booking.email}</p>
    <p><strong>Phone:</strong> ${booking.phone || 'N/A'}</p>
    <p><strong>Company:</strong> ${booking.company || 'N/A'}</p>
    <p><strong>Project Type:</strong> ${booking.projectType || 'N/A'}</p>
    <p><strong>Budget:</strong> ${booking.budget || 'N/A'}</p>
    <p><strong>Message:</strong> ${booking.message || 'N/A'}</p>
  `;
  return this.sendEmail({
    to: process.env.SMTP_USER || 'admin@agentrax.com',
    subject: `New Booking: ${booking.name}`,
    html,
  });
};
