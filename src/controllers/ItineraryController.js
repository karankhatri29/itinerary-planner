import ItineraryService from '../services/ItineraryService.js';
import LocationService from '../services/locationService.js';
import TransportationService from '../services/transportationService.js';

const ItineraryController = {
  getAllDestinations: async (req, res) => {
    try {
      const destinations = await LocationService.getAllDestinations();
      res.render('destinations', { 
        title: 'Destinations',
        destinations 
      });
    } catch (error) {
      console.error(error); // Logging the error
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Failed to fetch destinations' 
      });
    }
  },
  
  getDestinationDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const destination = await LocationService.getDestinationById(id);
      
      if (!destination) {
        return res.status(404).render('error', { 
          title: 'Not Found',
          message: 'Destination not found' 
        });
      }
      
      res.render('destination-detail', { 
        title: destination.name,
        destination 
      });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Failed to fetch destination details' 
      });
    }
  },
  
  getItineraryForm: async (req, res) => {
    try {
      const destinations = await LocationService.getAllDestinations();
      const transportOptions = await TransportationService.getAllTransportOptions();
      
      res.render('form', { 
        title: 'Create Itinerary',
        destinations,
        transportOptions
      });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Failed to load form' 
      });
    }
  },
  
  createItinerary: async (req, res) => {
    try {
      const { startDate, endDate, destinations, transportType } = req.body;
      
      if (!startDate || !endDate || !destinations || destinations.length === 0) {
        return res.status(400).render('form', {
          title: 'Create Itinerary',
          error: 'Please fill all required fields',
          formData: req.body
        });
      }
      
      const itinerary = await ItineraryService.createItinerary({
        startDate,
        endDate,
        destinations,
        transportType
      });
      
      res.render('result', { 
        title: 'Your Itinerary',
        itinerary 
      });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Failed to create itinerary' 
      });
    }
  }
};

export default ItineraryController;
