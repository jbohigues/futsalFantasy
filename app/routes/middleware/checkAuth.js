var express = require("express");
var router = express.Router();
var prismaClient = require("@prisma/client");

const prisma = new prismaClient.PrismaClient();

module.exports = function (req, res, next) {
  var bearerToken;
  var bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    var bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];

    const user = prisma.usuarios.findUnique({
      where: {
        token: bearerToken,
      },
      include: {
        id: true,
        nombre: true,
        usuario: true,
      },
    });
    if (user == null) {
      res.senStatus(403, "Error de acceso");
    } else {
      next();
    }
  } else {
    res.send(403).body("Acceso sin token no permitido");
  }
};
