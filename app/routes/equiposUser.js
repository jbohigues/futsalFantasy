var express = require("express");
var router = express.Router();
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

//Obtener el equipo de un usuario por su id
router.get("/e=:idEquipoUser", async function (req, res) {
  try {
    const equiposLiga = await prisma.equiposusuarios.findMany({
      where: {
        id: Number(req.params.idEquipoUser),
      },
    });
    res.json(equiposLiga);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

//Obtiene el equipo de un usuario y sus jugadores ordenados por posicion
router.get("/u=:id", async function (req, res) {
  try {
    const id = Number(req.params.id);
    const equipoUser = await prisma.equiposusuarios.findFirst({
      where: {
        idUsuario: id,
      },
      include: {
        jugadoresrealesencadaliga: {
          include: {
            jugadoresreales: {
              include: {
                equiposreales: true,
              },
            },
            equiposusuarios: true,
          },
          orderBy: {
            jugadoresreales: {
              posicion: "asc",
            },
          },
        },
      },
    });
    res.json(equipoUser);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

//Obtener el equipo del usuario logueado con sus respectivos jugadores
// router.get("/l=:idLiga/e=:idEquipoUser", async function (req, res) {
//   try {
//     let { idLiga, idEquipoUser } = req.params;
//     if (idEquipoUser == 0) idEquipoUser = null;
//     const equiposLiga = await prisma.equiposusuarios.findMany({
//       where: {
//         id: Number(idEquipoUser),
//         idLiga: Number(idLiga),
//       },
//       include: {
//         jugadoresrealesencadaliga: {
//           include: {
//             jugadoresreales: true,
//           },
//         },
//       },
//     });
//     res.json(equiposLiga);
//   } catch (error) {
//     res.send("ERROR: " + error);
//   }
// });

//Obtiene los equiposUser de cierta liga ordenados por puntos
router.get("/l2=:id", async function (req, res) {
  try {
    const id = Number(req.params.id);
    const equiposLiga = await prisma.equiposusuarios.findMany({
      where: {
        idLiga: id,
      },
      orderBy: {
        puntos: "desc",
      },
      include: {
        jugadoresrealesencadaliga: {
          include: {
            jugadoresreales: true,
          },
        },
      },
    });
    res.json(equiposLiga);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

module.exports = router;
