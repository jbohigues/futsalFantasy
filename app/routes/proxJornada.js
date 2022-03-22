var express = require("express");
var router = express.Router();
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

router.get("/j=:id", async function (req, res, next) {
  try {
    const jornada = Number(req.params.id);
    const jornadas = await prisma.calendario.findMany({
      where: {
          jornada: jornada,
      },
      orderBy: {
          fecha: 'asc'
      }
    });
    res.json(jornadas);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

module.exports = router;
