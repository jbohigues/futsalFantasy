var express = require("express");
var router = express.Router();
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

//Obtener las pujas de un usuario
router.get("/pujas/j=:idJugador", async function (req, res) {
  try {
    const traspaso = await prisma.traspasos.findMany({
      where: {
        idEquipoUserEmisor: Number(req.params.idJugador),
      },
      include: {
        jugadoresreales: {
          include: {
            equiposreales: true,
          },
        },
        equiposusuarios_equiposusuariosTotraspasos_idEquipoUserEmisor: true,
        equiposusuarios_equiposusuariosTotraspasos_idEquipoUserReceptor: true,
      },
    });
    let status = traspaso == null ? "noHayPujas" : "hayPujas";
    res.json({ traspaso: traspaso, status: status });
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

//Obtener la puja de un jugador, si la hay
router.get("/j=:idJugador/e=:idEmisor", async function (req, res) {
  try {
    const traspaso = await prisma.traspasos.findFirst({
      where: {
        idJugador: Number(req.params.idJugador),
        idEquipoUserEmisor: Number(req.params.idEmisor),
      },
    });
    let status = traspaso == null ? "noHayJugador" : "hayJugador";
    res.json({ traspaso: traspaso, status: status });
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

//Pujar por un jugador
router.post("/puja", async function (req, res) {
  try {
    const traspaso = await prisma.traspasos.create({
      data: {
        ...req.body,
      },
    });
    let status = traspaso == null ? "noHayTraspaso" : "hayTraspaso";
    res.json({ traspaso: traspaso, status: status });
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

//Cambia la puja de un jugador
router.put("/update/p=:idPuja", async function (req, res) {
  const { precio } = req.body;
  const update = await prisma.traspasos.update({
    where: {
      id: Number(req.params.idPuja),
    },
    data: {
      precio: precio,
    },
  });
  let status = update == null ? "mal" : "update";
  res.json({ update: update, status: status });
});

//Retirar puja
router.delete("/retirarPuja/p=:idPuja", async function (req, res) {
  const traspaso = await prisma.traspasos.delete({
    where: {
      id: Number(req.params.idPuja),
    },
  });
  let status = traspaso == null ? "fallo" : "puja retirada";
  res.json({ traspaso: traspaso, status: status });
});

module.exports = router;
