const express = require('express');
const {
    createCars,
    fetchCarsWithPagination,
    fetchAllCars,
    addToWishlist,
    getCarById,
    getCars,
    searchCar
} = require('../controllers/carController');

const router = express.Router();

router.get('/cars/filter', getCars);
router.post('/cars', createCars);
router.get('/cars', fetchAllCars);
router.patch('/car/:id', addToWishlist);
router.get('/car/:id', getCarById);
router.get('/cars/pagination', fetchCarsWithPagination);
router.get('/searchCar', searchCar);

module.exports = router;
