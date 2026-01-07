const express = require('express');
const { createCars, fetchCarsWithPagination, fetchAllCars, addToWishlist, getCarById, getCars } = require('../controllers/carController');
const router = express.Router();

//endpoints
router.get("/cars", getCars);
router.post('/cars', createCars);
router.get('/cars', fetchAllCars);
router.patch('/car/:id', addToWishlist);
router.get('/car/:id', getCarById)
router.get('/pagination', fetchCarsWithPagination)

module.exports = router;

