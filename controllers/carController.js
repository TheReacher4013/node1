const Car = require("../models/car");

// filter api
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
        res.status(400).json({ message: "Search Error" });
    }
};

// insert car api (ARRAY)
exports.createCars = async (req, res) => {
    try {
        const cars = req.body;
        await Car.insertMany(cars);

        return res.status(200).json({
            message: "Cars added successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Cars not added"
        });
    }
};

// pagination api
exports.fetchCarsWithPagination = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const cars = await Car.find()
            .skip(skip)
            .limit(limit);

        const totalCars = await Car.countDocuments();

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
};

// fetch all cars
exports.fetchAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        return res.status(200).json(cars);

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Not fetching cars"
        });
    }
};

// add to wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        await Car.updateOne(
            { _id: id },
            { $set: { wishlist: true } }
        );

        return res.status(200).json({
            message: "Successfully added to wishlist"
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Car not added to wishlist"
        });
    }
};

// get car by id
exports.getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const myCar = await Car.findById(id);

        if (!myCar) {
            return res.status(404).json({
                message: "Car not found"
            });
        }

        res.status(200).json({
            success: true,
            data: myCar
        });

    } catch (error) {
        return res.status(400).json({
            message: "Car not found"
        });
    }
};
