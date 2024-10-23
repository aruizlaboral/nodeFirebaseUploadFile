const User = require('./users');
const uploadController = require('./uploadController');

exports.updateUserUrl = (req, res) => {
  uploadController.uploadFile(req, res, async () => {
    try {
      const user = new User();
      user.image= req.publicUrl;

      res.status(200).send({ 
        success: true,
        message: 'la imagen del Usuario se guardo  correctamente',
        image: user.image
      });
      
    } catch (error) {
      console.error('Error al actualizar el usuario en la base de datos:', error);
      res.status(500).send('Error interno del servidor.');
    }
  });
};