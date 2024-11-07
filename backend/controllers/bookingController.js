const Booking = require('../models/Booking');
const Tutor = require('../models/Tutor'); // Ensure you have a Tutor model to fetch tutor details
const nodemailer = require('nodemailer');

// Configure the email transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can change this based on your email service
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS  // Your email password or app-specific password
    }
});

// Create a new booking
const createBooking = async (req, res) => {
    const { tutorId, userId, date, time, subject, notes } = req.body;

    try {
        const newBooking = new Booking({
            tutorId,
            userId,
            date,
            time,
            subject,
            notes
        });

        await newBooking.save();

        // Fetch the tutor's email
        const tutor = await Tutor.findById(tutorId);
        if (tutor) {
            // Send email notification to the tutor
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: tutor.email,
                subject: 'New Booking Notification',
                text: `You have a new booking!\n\nDetails:\nDate: ${date}\nTime: ${time}\nSubject: ${subject}\nNotes: ${notes}`
            };

            await transporter.sendMail(mailOptions);
        }

        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Failed to create booking', error: error.message });
    }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
    const { status, bookingId } = req.body; // Get the new status from the request body

    const validStatuses = ['confirmed', 'pending', 'canceled'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        const booking = await Booking.findById(bookingId).populate('userId'); // Populate userId to get user details
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Update the status
        booking.status = status;
        await booking.save();

        // If the status is confirmed, send an email notification to the user
        if (status === 'confirmed') {
            const user = booking.userId; // Access user details from populated userId
            if (user) {
                // Send email notification to the user
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subject: 'Booking Confirmed',
                    text: `Your booking has been confirmed!\n\nDetails:\nDate: ${booking.date}\nTime: ${booking.time}\nSubject: ${booking.subject}\nNotes: ${booking.notes}`
                };

                await transporter.sendMail(mailOptions);
            }
        }

        res.status(200).json({ message: 'Booking status updated', booking });
    } catch (error) {
        console.error('Error updating booking status:', error);
        res.status(500).json({ message: 'Failed to update booking status', error: error.message });
    }
};

module.exports = { createBooking, updateBookingStatus };
