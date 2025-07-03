import express from 'express';
import { findFlights, findFlightById, database } from '../database.js';

const router = express.Router();

// Get all flights
router.get('/', (req, res) => {
  res.json(database.flights);
});

// Search flights
router.get('/search', (req, res) => {
  const { from, to, departureDate, passengers } = req.query;
  
  if (!from || !to || !departureDate) {
    return res.status(400).json({ error: 'Missing required search parameters' });
  }
  
  const flights = findFlights(from, to, departureDate, parseInt(passengers) || 1);
  res.json(flights);
});

// Get flight by ID
router.get('/:id', (req, res) => {
  const flight = findFlightById(req.params.id);
  if (!flight) {
    return res.status(404).json({ error: 'Flight not found' });
  }
  res.json(flight);
});

export default router;