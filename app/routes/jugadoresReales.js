var express = require("express");
var router = express.Router();
var db = require("../db");
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

router.get("/idE=:id", async function (req, res, next) {
  try {
    const id = Number(req.params.id); 
    const jugadores = await prisma.jugadoresreales.findMany({
      where: {
        idEquipoUsuario: id
      }
    });
    res.json(jugadores);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

module.exports = router;