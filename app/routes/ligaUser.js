var express = require("express");
var router = express.Router();
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

router.get("/u=:id", async function (req, res, next) {
  try {
    const id = Number(req.params.id);
    const ligaUser = await prisma.ligas.findFirst({
      where: {
          id: id,
      }
    });
    res.json(ligaUser);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

module.exports = router;
