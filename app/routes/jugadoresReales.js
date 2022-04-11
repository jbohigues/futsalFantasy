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
      }, 
      orderBy: [
        {posicion: 'asc'},
        {puntos: 'desc'}
      ]
    });
    res.json(jugadores);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

router.put("/update/id=:idJugadorReal", async function (req, res) {
  const { titular } = req.body;
  const jugador = await prisma.jugadoresreales.update({
    where: { id: Number(req.params.idJugadorReal) },
    data: {
      titular: titular
    },
  });
  let status = jugador == null ? "mal" : "update";
  res.json({ jugador: jugador, status: status });
});

module.exports = router;