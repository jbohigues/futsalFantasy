var express = require("express");
var router = express.Router();
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

//Obtener la información de la liga de un usuario
router.get("/u=:idLiga", async function (req, res, next) {
  try {
    const ligaUser = await prisma.ligas.findFirst({
      where: {
        id: Number(req.params.idLiga),
      },
    });
    res.json(ligaUser);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

//Comprobar si existe una liga con cierto nombre
router.get("/l=:nombreLiga", async function (req, res, next) {
  try {
    const ligaUser = await prisma.ligas.findFirst({
      where: {
        nombre: req.params.nombreLiga,
      },
    });
    let status = ligaUser == null ? "noExiste" : "existe";
    res.json({ ligaUser: ligaUser, status: status });
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

//Crear liga
router.post("/crearLiga", async function (req, res) {
  try {
    const liga = await prisma.ligas.create({
      data: {
        ...req.body,
        codigoLiga: generateRandomString(),
      },
    });
    let status = liga == null ? "fallo" : "exito";
    res.json({ liga: liga, status: status });
  } catch (error) {
    res.send("ERROR: " + error);
  }
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
