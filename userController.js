const User = require('./users');

exports.updateUserUrl = (req, res) => {
  try {
    const user = new User();
    user.image= req.publicUrl;
    res.status(200).send({ 
      success: true,
      message: 'la imagen del Usuario se guardo  correctamente',
      image: user.image
  });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).send('Error interno del servidor.');
  }
};