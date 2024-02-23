class User {
    constructor(name, lastName, cellphone, email, password) {
      this.name = name;
      this.lastName = lastName;
      this.cellphone = cellphone;
      this.email = email;
      this.password = password;
      this.activationToken = null;
      this.verifiedAt = null;
    }
  
    setActivationToken(token) {
      this.activationToken = token;
    }
  
    setVerifiedAt(date) {
      this.verifiedAt = date;
    }
  }
  
  module.exports = User;