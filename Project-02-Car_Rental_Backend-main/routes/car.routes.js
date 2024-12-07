const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const carController = require('../controllers/car.controller');

const router = express.Router();

router.post('/', authMiddleware.verifyToken, carController.createCar);
router.get('/available',authMiddleware.verifyToken ,carController.getAvailableCars);
router.put('/',authMiddleware.verifyToken, carController.updateCarStatus);

module.exports = router;