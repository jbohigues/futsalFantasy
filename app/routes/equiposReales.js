var express = require("express");
var router = express.Router();
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

router.get("/eq=:id", async function (req, res, next) {
  try {
    const id = Number(req.params.id);
    const equipoReal = await prisma.equiposreales.findFirst({
      where: {
          id: id,
      }
    });
    res.json(equipoReal);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

module.exports = router;
