var express = require("express");
var router = express.Router();
var MD5 = require("md5");
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

router.get("/", async function (req, res, next) {
  try {
    const usuarios = await prisma.usuarios.findMany();
    res.json(usuarios);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

//getUsuario()
router.get("/u=:usuario/p=:password", async function (req, res, next) {
  try {
    const { usuario, password } = req.params;
    let md5pass = MD5(password).toString();

    const user = await prisma.usuarios.findFirst({
      where: {
        usuario: usuario,
        password: md5pass,
      },
    });
    res.json(user);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

router.get("/u=:usuario", async function (req, res, next) {
  try {
    const { usuario } = req.params;
    const user = await prisma.usuarios.findFirst({
      where: {
        usuario: usuario,
      },
    });

    if (user != null) {
      let existeUsername = user.usuario == usuario ? true : false;
      res.send({ existeUsername: existeUsername });
    } else {
      res.send({ existeUsername: false });
    }
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

router.get("/e=:email", async function (req, res, next) {
  try {
    const { email } = req.params;
    const user = await prisma.usuarios.findFirst({
      where: {
        email: email,
      },
    });

    if (user != null) {
      let existeEmail = user.email == email ? true : false;
      res.send({ existeEmail: existeEmail });
    } else {
      res.send({ existeEmail: false });
    }
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

router.post("/registro", async function (req, res, next) {
  const { nombre, apellidos, usuario, email, password } = req.body;
  let md5pass = MD5(password).toString();

  const user = await prisma.usuarios.create({
    data: {
      nombre: nombre,
      apellidos: apellidos,
      usuario: usuario,
      email: email,
      password: md5pass,
      token: generateRandomString(),
    },
  });
  let status = "Usuario registrado con éxito.";
  res.json({ usuario: user, status: status });
});

const generateRandomString = () => {
  var length = 18;
  var resultado = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    resultado += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return resultado;
};

module.exports = router;
