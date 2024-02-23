const express = require('express');
const bodyParser = require('body-parser');
const router = require('./controllers/UserController');
const { userRegistrationService, userActivationService } = require('./infrastructure/dependencies/dependencies');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});