var express = require("express");
var router = express.Router();
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

//Obtener la información de la liga de un usuario
router.get("/u=:idLiga", async function (req, res, next) {
  try {
    const ligaUser = await prisma.ligas.findFirst({
      where: {
        id: Number(req.params.idLiga),
      },
    });
    res.json(ligaUser);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

module.exports = router;
