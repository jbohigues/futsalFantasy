var express = require("express");
var router = express.Router();
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

router.get("/", async function (req, res) {
  try {
    const jornadas = await prisma.calendario.findMany({
      orderBy: {
        fecha: "asc",
      },
    });
    res.json(jornadas);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

module.exports = router;
