const Usuario = require("../models/usuarios.schema")
const bcrypt = require('bcrypt')


const nuevoUsuario = async(body) => {
  try {
 
    const usuarioExiste = await Usuario.findOne({nombre: body.nombre})
    const emailExiste = await UsuarioModel.findOne({ email: body.email });
 
    if(usuarioExiste){
      return {
        msg:'usuario no disponible',
        statusCode: 409
      }
    }

    if (emailExiste) {
      return {
        msg: "El correo no está disponible",
        statusCode: 400,
      };
    }
 
    const usuario = new Usuario(body)
 
    let salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(body.password, salt);
   await usuario.save()
   return {
     msg:'Usuario creado',
     statusCode: 201
   }
  } catch (error) {
    return {
     msg:'Error al crear el usuario',
     statusCode: 500,
     error
    }
  }
}



const listarUsuarios = async() => {
  try {
    const usuarios = await Usuario.find()
    return{
      usuarios,
      statusCode: 200
    }
  } catch (error) {
    return {
      msg:'Error al obtener los usuarios',
      statusCode: 500,
      error
     }
  }
}

const obtenerUsuario = async(idUsuario) => {
  try {
    const usuario = await Usuario.findById(idUsuario)
    return{
      usuario,
      statusCode: 200
    }
  } catch (error) {
    return {
      msg:'Error al obtener el usuario',
      statusCode: 500,
      error
     }
  }
}

module.exports= {
    listarUsuarios,
    obtenerUsuario,
    nuevoUsuario
}
