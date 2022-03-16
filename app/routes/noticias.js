var express = require("express");
var router = express.Router();
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

router.get("/:skip", async function (req, res, next) {
  try {
    const skip = Number(req.params.skip);
    const noticias = await prisma.noticias.findMany({
      skip: skip,
      take: 2,
      orderBy: [
        {
          fecha: "desc",
        },
      ],
    });
    res.json(noticias);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

router.get("/:skip/:filtro", async function (req, res, next) {
  try {
    const skip = Number(req.params.skip);
    const filtro = req.params.filtro;

    const noticias = await prisma.noticias.findMany({
      skip: skip,
      take: 2,
      orderBy: [
        {
          fecha: "desc",
        },
      ],
      where: {
        tema: filtro
      }
    });
    res.json(noticias);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

module.exports = router;
