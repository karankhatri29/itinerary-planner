import express from 'express';
import IndexController from '../controllers/indexController.js'; // Ensure the file extension is included

const router = express.Router();

// Home page
router.get('/', IndexController.getHomePage);

// Login page
router.get('/login', IndexController.getLoginPage);

// Error handling
router.get('*', IndexController.handleError);

export default router;
