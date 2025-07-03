import express from 'express';
import { createBooking, findBookingsByUserId, findFlightById } from '../database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Create booking
router.post('/', authenticateToken, (req, res) => {
  try {
    const { flightId, passengers, passengerDetails } = req.body;
    
    // Validate flight exists
    const flight = findFlightById(flightId);
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    
    // Check availability
    if (flight.availableSeats < passengers) {
      return res.status(400).json({ error: 'Not enough seats available' });
    }
    
    // Create booking
    const booking = createBooking({
      userId: req.userId,
      flightId,
      passengers,
      passengerDetails,
      totalPrice: flight.price * passengers
    });
    
    res.status(201).json({
      ...booking,
      flight
    });
  } catch (error) {
    res.status(500).json({ error: 'Booking failed' });
  }
});

// Get user bookings
router.get('/my-bookings', authenticateToken, (req, res) => {
  const bookings = findBookingsByUserId(req.userId);
  
  // Populate flight details
  const bookingsWithFlights = bookings.map(booking => ({
    ...booking,
    flight: findFlightById(booking.flightId)
  }));
  
  res.json(bookingsWithFlights);
});

export default router;