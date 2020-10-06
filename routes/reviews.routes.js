const { Router } = require('express')
const Message = require('../models/Message')
const router = Router()

router.post('/reviews', async (req, res) => {
  try {
    const { id, name, message } = req.body

    const review = new Message({ id, name, message })

    await review.save()

    res.status(201).json({ message: 'New review has been added' })

  } catch(e) {
    res.status(500)
      .json({message: 'Something went wrong. Please try again.'})
  }
})

router.get('/reviews', async (req, res) => {
  try {
    const data = await Message.find()

    return res.json(data)
  } catch (e) {
    res.status(500)
      .json({message: 'Something went wrong. Please try again.'})
  }
})

module.exports = router
