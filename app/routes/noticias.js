var express = require("express");
var router = express.Router();
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

router.get("/l=:idLiga/s=:skip", async function (req, res, next) {
  try {
    const skip = Number(req.params.skip);
    const noticias = await prisma.noticias.findMany({
      where: {
        idLiga: Number(req.params.idLiga),
      },
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

router.get("/l=:idLiga/s=:skip/f=:filtro", async function (req, res, next) {
  try {
    const skip = Number(req.params.skip);
    const filtro = req.params.filtro;

    const noticias = await prisma.noticias.findMany({
      where: {
        idLiga: Number(req.params.idLiga),
      },
      skip: skip,
      take: 2,
      orderBy: [
        {
          fecha: "desc",
        },
      ],
      where: {
        tema: filtro,
      },
    });
    res.json(noticias);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

//Crear noticia nueva
router.post("/nuevoFichaje", async function (req, res) {
  try {
    const noticia = await prisma.noticias.create({
      data: {
        ...req.body,
      },
    });
    let status = noticia == null ? "fracaso" : "nuevaNoticia";
    res.json({ noticia: noticia, status: status });
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

module.exports = router;