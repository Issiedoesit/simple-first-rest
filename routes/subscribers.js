const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

module.exports = router


// Getting All

router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message : err.message})
        // 500 : Error on our server [Database in this case]
        // means the error is from us, same as any error in the 500 range
    }
})

// Getting one
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})

// Creating one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name : req.body.name,
        subscribedTo : req.body.subscribedTo,
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)

        // 201: means successfully created an object
        // always use 201 when creating a route rather than 200
        // 200: just means a-Ok
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

// Updating one
router.patch('/:id', getSubscriber, async (req, res) => {
    if(req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedTo != null){
        res.subscriber.subscribedTo = req.body.subscribedTo
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({ message: 'Subscriber deleted'})
    } catch (err) {
        res.status(500).json( {message: err.message} )
    }
})




async function getSubscriber (req, res, next){
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json('Could not find subscriber')
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.subscriber = subscriber
    next()
}