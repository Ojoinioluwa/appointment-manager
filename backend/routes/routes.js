const express = require('express')
const router = express.Router()
const { validateSession, login, signup, schedule, prescribe, fetchCandidates} = require('../controllers/controller')

router.route('/login').post(login)
router.route('/signup').post(signup)
router.route('/schedule').post(validateSession, schedule)
router.route('/prescribe').post(validateSession, prescribe)
router.route('/fetchCandidates').get(validateSession, fetchCandidates)

module.exports = router