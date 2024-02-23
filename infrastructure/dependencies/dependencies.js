const UserRepository = require('../UserRepository');
const UserRegistrationService = require('../../application/UserRegistrationService');
const UserActivationService = require('../../application/UserActivationService');

const userRepository = new UserRepository();
const userRegistrationService = new UserRegistrationService(userRepository);
const userActivationService = new UserActivationService(userRepository);

module.exports = {
  userRepository,
  userRegistrationService,
  userActivationService
};