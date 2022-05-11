var express = require("express");
var router = express.Router();
var db = require("../db");
var prismaclient = require("@prisma/client");
const checkAuth = require("./middleware/checkAuth");

const prisma = new prismaclient.PrismaClient();

router.post("/puja", checkAuth, async function (req, res, next) {
  try {
    const traspaso = await prisma.traspasos.create({
      data: {
        ...req.body,
      },
    });
    console.log(res);

    res.json(traspaso);
  } catch (error) {
    console.log(error);
    res.send("ERROR: " + error);
  }
});

// router.post("/puja", async function (req, res) {
//   console.log("hola");
//   console.log(req.body);

//   const traspaso = await prisma.traspasos.create({
//     data: {
//       ...req.body,
//     },
//   });

//   let status = "ok";
//   res.json({ traspaso: traspaso, status: status });
// });

module.exports = router;
