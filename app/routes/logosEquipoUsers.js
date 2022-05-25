var express = require("express");
var router = express.Router();
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

router.get("/logosEqUs", async function (req, res, next) {
  try {
    const logosEqUs = await prisma.logosequipousers.findMany();
    res.json(logosEqUs);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

module.exports = router;
