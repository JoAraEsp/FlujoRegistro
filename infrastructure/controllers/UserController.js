const express = require('express');
const UserRegistrationService = require('../application/UserRegistrationService');
const UserActivationService = require('../application/UserActivationService');
const UserRepository = require('../infrastructure/UserRepository');

const router = express.Router();
const userRepository = new UserRepository();
const userRegistrationService = new UserRegistrationService(userRepository);
const userActivationService = new UserActivationService(userRepository);

router.post('/users', async (req, res) => {
  const { name, lastName, cellphone, email, password } = req.body;
  try {
    await userRegistrationService.registerUser(name, lastName, cellphone, email, password);
    res.status(201).json({ message: 'Se ha registrado el usuario correctamente' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/users/:token/activate', async (req, res) => {
  const { token } = req.params;
  try {
    await userActivationService.activateUser(token);
    res.status(200).json({ message: 'Se ha activado la cuenta correctamente' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;