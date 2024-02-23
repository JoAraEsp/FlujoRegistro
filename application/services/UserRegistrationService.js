const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserRegistrationService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async registerUser(name, lastName, cellphone, email, password) {
    // Encriptar contraseña
    const encryptedPassword = await this.encryptPassword(password);

    // Generar Activation Token
    const token = this.generateActivationToken(email);

    // Guardar el usuario en la base de datos
    const user = new User(name, lastName, cellphone, email, encryptedPassword);
    user.setActivationToken(token);
    this.userRepository.addUser(user);

    // Enviar correo electrónico de activación
    await this.sendActivationEmail(email, token);
  }

  async encryptPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  generateActivationToken(email) {
    const secretKey = 'secreto123'; 
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
    return token;
  }

  async sendActivationEmail(email, token) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false, 
      auth: {
        user: 'your_email@example.com',
        pass: 'your_email_password'
      }
    });

    const mailOptions = {
      from: 'your.email@example.com',
      to: email,
      subject: 'Activación de cuenta',
      text: `¡Haz click en el siguiente enlace para activar tu cuenta: https://:domain/api/v1/users/${token}/activate`,
    };

    await transporter.sendMail(mailOptions);
  }
}

module.exports = UserRegistrationService;