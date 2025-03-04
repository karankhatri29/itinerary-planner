const IndexController = {
  getHomePage: async (req, res) => {
    const featuredDestinations = await ItineraryService.getFeaturedDestinations();
    const categories = await LocationService.getCategories();
    const testimonials = await ItineraryService.getTestimonials();

    res.render('index', { 
      title: 'Itinerary Planner',
      description: 'Plan your perfect trip with our itinerary planner',
      featuredDestinations,
      categories,
      testimonials

    });
  },
  
  getLoginPage: (req, res) => {
    res.render('login', { title: 'Login' });
  },
  
  handleError: (req, res) => {
    res.status(404).render('error', { 
      title: 'Page Not Found',
      message: 'The page you are looking for does not exist.' 
    });
  }
};
