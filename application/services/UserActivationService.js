class UserActivationService {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async activateUser(token) {
      const user = this.userRepository.findUserByActivationToken(token);
  
      if (user) {
        user.setVerifiedAt(new Date());
        // Actualizar el usuario en la base de datos con la nueva fecha de verificación
      } else {
        throw new Error('Token de activación inválido');
      }
    }
  }
  
  module.exports = UserActivationService;