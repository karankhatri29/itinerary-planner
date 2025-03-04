import express from 'express';
import ItineraryController from '../controllers/ItineraryController.js'; // Add `.js` extension

const router = express.Router();

// Get all destinations
router.get('/destinations', ItineraryController.getAllDestinations);

// Get specific destination details
router.get('/destination/:id', ItineraryController.getDestinationDetail);

// Itinerary form
router.get('/form', ItineraryController.getItineraryForm);

// Create itinerary
router.post('/form', ItineraryController.createItinerary);

export default router;
