const Car = require('../models/Car')
const Rent = require('../models/Rent')

module.exports = {
    addGet: (req, res) => {
        res.render('car/add')
    },
    addPost: (req, res) => {
        const carBody = req.body
        carBody.pricePerDay = +carBody.pricePerDay
        Car.create(carBody)
            .then(() => {
                res.redirect('/')
            }).catch(console.error)
    },
    allCars: (req, res) => {
        Car.find({ isRented: false })
            .then((cars) => {
                res.render('car/all', { cars })
            })
            .catch(console.error)
    },
    rentGet: (req, res) => {
        const carId = req.params.id

        Car.findById(carId)
            .then((car) => {
                res.render('car/rent', car)
            })
    },
    rentPost: async (req, res) => {
        const car = req.params.id
        const user = req.user._id
        const days = Number(req.body.days)

        try {
            const rent = await Rent.create({ days, user, car })
            const carById = await Car.findById(car)
            carById.isRented = true
            await carById.save()
            res.redirect('/car/all')
        } catch (err) {
            console.log(err)
        }

        /*        Rent.create({days, user, car})
                    .then(() => {
                        Car.findById(car)
                        .then((c) => {
                            c.isRented = true
                            return c.save()
                        })
                        .then(() => {
                            res.redirect('/car/all')
                        })
                    })
                    .catch(console.error)
        */
    },
    editGet: (req, res) => {
        const carId = req.params.id

        Car.findById(carId)
            .then((car) => {
                res.render('car/edit', car)
            })
    },
    editPost: (req, res) => {

        Car.findOneAndUpdate(req.params.id, req.body, function (err, car) {
            if (err) {
                console.log(err)
            } else {
                 res.redirect('/car/all')
            }
        })
    }
}