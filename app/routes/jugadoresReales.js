var express = require("express");
var router = express.Router();
var db = require("../db");
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

router.get("/idU=:id", async function (req, res, next) {
  try {
    const id = Number(req.params.id); 
    const jugadores = await prisma.jugadores.findMany({
      where: {
        idUsuario: id
      }
    });
    res.json(jugadores);
    console.log(jugadores);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

module.exports = router;