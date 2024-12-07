const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const rentalController = require('../controllers/rental.controller');

const router = express.Router();

router.post('/', authMiddleware.verifyToken, rentalController.rentCar);
router.post('/payment', authMiddleware.verifyToken, rentalController.makePayment);

module.exports = router;