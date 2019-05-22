const encryption = require('../util/encryption')
const User = require('../models/User')
const Rent = require('../models/Rent')

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register')
    },
    registerPost: async (req, res) => {
        const userBody = req.body;
        if (!userBody.username || !userBody.password || !userBody.repeatPassword) {
            userBody.error = 'Please fill all fields!'
            res.render('user/register', userBody)
            return
        }

        if (userBody.password !== userBody.repeatPassword) {
            userBody.error = 'Both passwords must match!'
            res.render('user/register', userBody)
            return
        }

        const salt = encryption.generateSalt()
        const hashedPass = encryption.generateHashedPassword(salt, userBody.password)

        try {
            const user = await User.create({
                username: userBody.username,
                hashedPass,
                salt,
                firstName: userBody.firstName,
                lastName: userBody.lastName,
                roles: ['User']
            })

            req.logIn(user, (err) => {
                if (err) {
                    userBody.error = error
                    res.render('user/register', userBody)
                } else {
                    res.redirect('/')
                }
            })
        } catch (err) {
            console.log(err)
        }
    },
    logout: (req, res) => {
        req.logout()
        res.redirect('/')
    },
    loginGet: (req, res) => {
        res.render('user/login')
    },
    loginPost: async (req, res) => {
        const reqUser = req.body
        try {
            const user = await User.findOne({ username: reqUser.username })
            if (!user) {
                reqUser.error = 'Invalid username!'
                res.render('user/login', reqUser)
                return
            }
            if (!user.authenticate(reqUser.password)) {
                reqUser.error = 'Invalid password'
                res.render('user/login', reqUser)
                return
            } else {

                req.logIn(user, (err) => {
                    if (err) {
                        userBody.error = error
                        res.render('user/register', userBody)
                    } else {
                        res.redirect('/')
                    }
                })
            }
        } catch (err) {
            reqUser.error = 'Something went wrong!'
            res.render('user/register', userBody)
        }
    },
    myRents: (req, res) => {
        Rent.find({ user: req.user._id })
        .populate('car')
        .then((cars) => {

            res.render('user/rented', {cars})
            console.log(cars)
        })
        .catch(console.error)
    }
};