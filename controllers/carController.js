const Car = require("../models/car");

//filter api
exports.getCars = async (req, res) => {
    try {
        let filter = {};

        if (req.query.brand) {
            filter.brand = req.query.brand;
        }

        if (req.query.fueltype) {
            filter.fueltype = req.query.fueltype;
        }

        if (req.query.seatingcapacity) {
            filter.seatingcapacity = Number(req.query.seatingcapacity);
        }

        if (req.query.minPrice && req.query.maxPrice) {
            filter.price = {
                $gte: Number(req.query.minPrice),
                $lte: Number(req.query.maxPrice)
            };
        }

        const cars = await Car.find(filter);
        res.status(200).json(cars);

    } catch (error) {
        res.status(400).json({
            message: "Search Error"
        });
    }
};

//insert car api
exports.createCars = async (req, res) => {
    try {
        const { cars } = req.body;
        await car.insertMany(cars);
        return res.status(200).json({
            message: "cars added"
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: " cars not added"
        })

    }
}

//fetching with limit api

exports.fetchCarsWithPagination = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;   // page number
        const limit = Number(req.query.limit) || 10; // cars per page

        const skip = (page - 1) * limit;

        const cars = await car.find()
            .skip(skip)
            .limit(limit);

        const totalCars = await car.countDocuments();

        return res.status(200).json({
            success: true,
            currentPage: page,
            carsPerPage: limit,
            totalCars,
            totalPages: Math.ceil(totalCars / limit),
            data: cars
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error fetching paginated cars"
        });
    }
}

//fetch all api
exports.fetchAllCars = async (req, res) => {
    try {
        const cars = await car.find();
        return res.status(200).json(cars)
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "not fetching cars"
        })

    }
}

//add to wishlist api
exports.addToWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        await car.updateOne({ _id: id }, { $set: { wishlist: true } });
        return res.status(200).json({
            message: "Successfully added to wishlist"
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "car is not added to wishlist"
        })

    }
}

//fetch all add wishlist api
exports.getCarById = async (req, res) => {
    try {
        const { id } = req.params
        const myCar = await car.findById(id);
        console.log(myCar);
        if (!myCar) {
            return res.status(404).json({
                message: "car not found"
            })
        }
        res.status(200).json({
            success: true,
            data: myCar
        })

    } catch (error) {
        return res.status(400).json({
            message: "car not found"
        })
    }
}