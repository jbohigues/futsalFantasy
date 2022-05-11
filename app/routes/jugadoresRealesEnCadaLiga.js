var express = require("express");
var router = express.Router();
var db = require("../db");
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

//Obtiene los jugadores puestos en el mercado de cierta liga
router.get("/l=:idLiga", async function (req, res) {
  try {
    let { idLiga } = req.params;
    const jugadores = await prisma.jugadoresrealesencadaliga.findMany({
      where: {
        idLiga: Number(idLiga),
        mercado: true,
      },
      include: {
        jugadoresreales: {
          include: {
            equiposreales: true,
          },
        },
        equiposusuarios: true,
      },
      orderBy: {
        jugadoresreales: {
          posicion: "asc",
        },
      },
    });
    res.json(jugadores);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

//Obtiene los jugadores reales de cierto equipoUser en cierta liga
router.get("/l=:idLiga/e=:idEquipoUser", async function (req, res) {
  try {
    let { idLiga, idEquipoUser } = req.params;
    if (idEquipoUser == 0) idEquipoUser = null;
    const jugadores = await prisma.jugadoresrealesencadaliga.findMany({
      where: {
        idLiga: Number(idLiga),
        idEquipoUser: Number(idEquipoUser),
      },
      include: {
        jugadoresreales: true,
        //   {
        //     include: {
        //         equiposreales: true
        //     }
        // },
        // equiposusuarios: true,
        //   equiposreales: true
      },
    });
    res.json(jugadores);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

//Cambia la titularidad a un jugador
router.put("/update/idL=:idLiga/idJ=:idJugadorReal", async function (req, res) {
  const { titular } = req.body;

  const jugador = await prisma.jugadoresrealesencadaliga.update({
    where: {
      idJugadorReal_idLiga: {
        idJugadorReal: Number(req.params.idJugadorReal),
        idLiga: Number(req.params.idLiga),
      },
    },
    data: {
      titular: titular,
    },
  });
  let status = jugador == null ? "mal" : "update";
  res.json({ jugador: jugador, status: status });
});

module.exports = router;