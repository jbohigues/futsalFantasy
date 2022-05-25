var express = require("express");
var router = express.Router();
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

//Obtener el equipo de un usuario por su id
router.get("/e=:idEquipoUser", async function (req, res) {
  try {
    const equiposLiga = await prisma.equiposusuarios.findFirst({
      where: {
        id: Number(req.params.idEquipoUser),
      },
    });
    res.json(equiposLiga);
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

//Comprobar si existe el nombre de un equipo
router.get("/eq=:nombreEquipo", async function (req, res) {
  try {
    const equiposLiga = await prisma.equiposusuarios.findFirst({
      where: {
        nombre: req.params.nombreEquipo,
      },
    });
    let status = equiposLiga == null ? "noExiste" : "existe";
    res.json({ equiposLiga: equiposLiga, status: status });
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

//Actualizamos el saldo de cierto EquipoUser
router.put("/actualizarSaldo/e=:idEquipoUser", async function (req, res) {
  const { dinero } = req.body;

  const equipoUser = await prisma.equiposusuarios.update({
    where: {
      id: Number(req.params.idEquipoUser),
    },
    data: {
      dinero: dinero,
    },
  });
  let status = equipoUser == null ? "mal" : "actualizado";
  res.json({ equipoUser: equipoUser, status: status });
});

//Actualiza la información de un equipo en configuracionPerfil
router.put("/update/e=:idEquipo", async function (req, res) {
  const equipo = await prisma.equiposusuarios.update({
    where: {
      id: Number(req.params.idEquipo),
    },
    data: {
      nombre: req.body.nombre,
      foto: req.body.foto,
      // ...req.body,
    },
  });
  let status = equipo == null ? "mal" : "update";
  res.json({ equipo: equipo, status: status });
});

//Crear equipoUser
router.post("/crearEquipoUser", async function (req, res) {
  try {
    const equipoUser = await prisma.equiposusuarios.create({
      data: {
        ...req.body,
        // codigoLiga: generateRandomString(),
      },
    });
    let status = equipoUser == null ? "fallo" : "exito";
    res.json({ equipoUser: equipoUser, status: status });
  } catch (error) {
    res.send("ERROR: " + error);
  }
});

module.exports = router;
