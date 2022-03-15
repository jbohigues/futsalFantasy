var express = require("express");
var router = express.Router();
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

router.get("/", async function (req, res, next) {
  try {
    const noticias = await prisma.noticias.findMany();
    res.json(noticias);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

module.exports = router;
