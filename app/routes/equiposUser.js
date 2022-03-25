var express = require("express");
var router = express.Router();
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

router.get("/u=:id", async function (req, res, next) {
  try {
    const id = Number(req.params.id);
    const equipoUser = await prisma.equiposusuarios.findFirst({
      where: {
          idUsuario: id,
      }
    });
    res.json(equipoUser);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

router.get("/l=:id", async function (req, res, next) {
  try {
    const id = Number(req.params.id);
    const equiposLiga = await prisma.equiposusuarios.findMany({
      where: {
          idLiga: id,
      }
    });
    res.json(equiposLiga);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

router.get("/l2=:id", async function (req, res, next) {
  try {
    const id = Number(req.params.id);
    const equiposLiga = await prisma.equiposusuarios.findMany({
      where: {
          idLiga: id,
      },
      orderBy: {
        puntos: 'desc'
      },
      include:{
        jugadoresreales: true
      }
    });
    res.json(equiposLiga);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

module.exports = router;
