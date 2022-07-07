const express = require('express')
// making a router
const router = express.Router()
// importing Fruit model to access database
const Fruit = require('../models/fruit')

// DELETE - Delete
router.delete('/:id', (req, res) => {
    const fruitId = req.params.id

    Fruit.findByIdAndRemove(fruitId)
        .then(fruit => {
            res.redirect('/fruits')
        })
        .catch(err => {
            res.json(err)
        })
})

// GET route for displaying an update form
router.get('/:id/edit', (req, res) => {
    const fruitId = req.params.id

    Fruit.findById(fruitId)
        .then(fruit => {
            res.render('fruits/edit', { fruit })
        })
        .catch(err => {
            res.json(err)
        })
})

// PUT - Update
router.put('/:id', (req, res) => {
    const fruitId = req.params.id

    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false

    Fruit.findByIdAndUpdate(fruitId, req.body, { new: true })
        .then(fruit => {
            res.redirect(`/fruits/${fruit._id}`)
        })
        .catch(err => {
            res.json(err)
        })
})

// GET route for displaying my form for create
router.get('/new', (req, res) => {
    res.render('fruits/new')
})

// POST - Create
router.post('/', (req, res) => {
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false

    Fruit.create(req.body)
        .then(fruit => {
            console.log(fruit)
            // res.json(fruit)
            res.redirect('/fruits')
        })
        .catch(err => {
            res.json(err)
        })
})

// GET - Index
// localhost:3000/fruits
router.get('/', (req, res) => {
    // mongoose to find all fruits
    Fruit.find({})
    // return fruits as json
        .then(fruits => {
            // res.json(fruit)
            res.render('fruits/index', { fruits })
        })
        .catch(err => {
            res.json(err)
        })
})

// seed route
// insert many items into our database with just going to this route
// localhost:3000/fruits/seed
router.get('/seed', (req, res) => {
    // starting data
    const startFruits = [
    { name: "Orange", color: "orange", readyToEat: false },
    { name: "Grape", color: "purple", readyToEat: false },
    { name: "Banana", color: "orange", readyToEat: false },
    { name: "Strawberry", color: "red", readyToEat: false },
    { name: "Coconut", color: "brown", readyToEat: false },
  ]

  // delete if we have fruits
  Fruit.deleteMany({})
		// insert data
		.then(() => {
            Fruit.create(startFruits)
            // return this data as json to view
            .then(data => {
                res.json(data)
            })
            // .catch(err => console.error(err))
		    .catch(console.error)
        })
  
  
})

// GET - Show
// localhost:3000/fruits/:id <- change with the id being passed in
router.get('/:id', (req, res) => {
    const fruitId = req.params.id

    Fruit.findById(fruitId)
        // send back some json
        .then(fruit => {
            // res.json(fruit)
            res.render('fruits/show', { fruit })
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router