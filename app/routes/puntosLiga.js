var express = require("express");
var router = express.Router();
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

//Obtiene los puntos de cierta liga
router.get("/idL=:idLiga", async function (req, res) {
  console.log(req.params);
  try {
    const idLiga = Number(req.params.idLiga);
    console.log(idLiga);
    const puntosLiga = await prisma.puntosliga.findFirst({
      where: {
        idLiga: idLiga,
      },
    });
    console.log(puntosLiga);
    res.json(puntosLiga);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

module.exports = router;
