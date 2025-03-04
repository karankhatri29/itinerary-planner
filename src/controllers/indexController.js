const IndexController = {
  getHomePage: (req, res) => {
    res.render('index', { 
      title: 'Itinerary Planner',
      description: 'Plan your perfect trip with our itinerary planner'
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

export default IndexController;
