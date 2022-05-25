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

//Crear configuracion puntos nueva liga
router.post("/crearPuntosLiga", async function (req, res) {
  try {
    const puntosliga = await prisma.puntosliga.create({
      data: {
        idLiga: Number(req.body.idLiga),
      },
    });
    let status = puntosliga == null ? "fracaso" : "creado";
    res.json({ puntosliga: puntosliga, status: status });
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

module.exports = router;
