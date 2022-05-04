var express = require("express");
var router = express.Router();
var db = require("../db");
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

//ESTA YA NO TE SIRVE, PORQUE NO TIENE CAMPO IDEQUIPOUSER
router.get("/idE=:id", async function (req, res) {
  try {
    let id = Number(req.params.id);
    if (id === 0) id = null;
    const jugadores = await prisma.jugadoresreales.findMany({
      where: {
        idEquipoUsuario: id,
      },
      orderBy: [{ posicion: "asc" }, { puntos: "desc" }],
    });
    res.json(jugadores);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

// router.put("/update/id=:idJugadorReal", async function (req, res) {
//   const { titular } = req.body;
//   console.log(titular);
//   const jugador = await prisma.jugadoresrealesencadaliga.update({
//     where: { idJugadorReal: Number(req.params.idJugadorReal) },
//     data: {
//       titular: titular,
//     },
//   });
//   let status = jugador == null ? "mal" : "update";
//   res.json({ jugador: jugador, status: status });
// });

module.exports = router;
