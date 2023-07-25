const express = require('express');
const router = express.Router();

const { requireSignin, isAuth } = require('../backend/controllers/auth');
const { userById } = require('../backend/controllers/user');
const { generateToken, processPayment } = require('../backend/controllers/braintree');

router.get('/braintree/getToken/:userId', requireSignin, isAuth, generateToken);
router.post(
  '/braintree/payment/:userId',
  requireSignin,
  isAuth,
  processPayment
);

router.param('userId', userById);

module.exports = router;
