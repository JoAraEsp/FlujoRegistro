const User = require('../domain/User');

class UserRepository {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  findUserByActivationToken(token) {
    return this.users.find(user => user.activationToken === token);
  }
}

module.exports = UserRepository;