var express = require("express");
var router = express.Router();
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

//Obtener las pujas que ha realizado un usuario
router.get("/pujas/j=:idEquipoUser", async function (req, res) {
  try {
    const traspaso = await prisma.traspasos.findMany({
      where: {
        idEquipoUserEmisor: Number(req.params.idEquipoUser),
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
    let status =
      traspaso == null || !traspaso.length ? "noHayPujas" : "hayPujas";
    res.json({ traspaso: traspaso, status: status });
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

//Obtener las ofertas que le han realizado a un usuario y están en Pendiente
router.get("/ofertas/j=:idEquipoUser", async function (req, res) {
  try {
    const traspaso = await prisma.traspasos.findMany({
      where: {
        idEquipoUserReceptor: Number(req.params.idEquipoUser),
        estado: "P",
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
    let status =
      traspaso == null || !traspaso.length ? "noHayOfertas" : "hayOfertas";
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
        estado: "P",
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

//Aceptar oferta por un jugador: pasa el estado de traspaso a Aceptada
router.put("/responderOferta/p=:idPuja", async function (req, res) {
  const { estado } = req.body;
  const traspaso = await prisma.traspasos.update({
    where: {
      id: Number(req.params.idPuja),
    },
    data: {
      estado: estado,
    },
  });
  let status = traspaso == null ? "mal" : "update";
  res.json({ traspaso: traspaso, status: status });
});

module.exports = router;
