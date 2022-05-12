var express = require("express");
var router = express.Router();
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

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
    console.log(req.body);
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
module.exports = router;
