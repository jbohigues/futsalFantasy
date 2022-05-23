var express = require("express");
var router = express.Router();
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

//Obtiene los puntos de cierta liga
router.get("/idL=:idLiga", async function (req, res) {
  try {
    const idLiga = Number(req.params.idLiga);
    const puntosLiga = await prisma.puntosliga.findFirst({
      where: {
        idLiga: idLiga,
      },
    });
    res.json(puntosLiga);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

module.exports = router;
