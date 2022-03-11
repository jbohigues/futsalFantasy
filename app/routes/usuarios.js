var express = require("express");
var router = express.Router();
var MD5 = require("md5");
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

router.get("/", async function (req, res, next) {
    try {
        const usuarios = await prisma.usuarios.findMany();
        res.json(usuarios);
        console.log(usuarios);
    } catch (error) {
        res.send("ERROR: " + error);
    }
});

router.get("/u=:usuario/p=:password", async function (req, res, next) {
    try {
        const {usuario, password} = req.params;
        let md5pass = MD5(password).toString();

        const user = await prisma.usuarios.findFirst({
            where: {
                usuario: usuario,
                password: md5pass
            }
        });
        res.json(user);
    } catch (error) {
        res.send("ERROR: " + error);
    }
  });

module.exports = router;
