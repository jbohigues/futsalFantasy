module.exports = function (app) {
  app.use("/", require("./routes/index"));
  app.use("/cardshome", require("./routes/cardshome"));
  app.use("/usuarios", require("./routes/usuarios"));
  app.use("/noticias", require("./routes/noticias"));
  app.use("/equiposUser", require("./routes/equiposUser"));
  app.use("/ligaUser", require("./routes/ligaUser"));
  app.use("/proxJornada", require("./routes/proxJornada"));
  app.use("/equiposReales", require("./routes/equiposReales"));
  app.use("/jugadoresReales", require("./routes/jugadoresReales"));
  app.use(
    "/jugadoresRealesEnCadaLiga",
    require("./routes/jugadoresRealesEnCadaLiga")
  );
  app.use("/traspasos", require("./routes/traspasos"));
  app.use("/puntosLiga", require("./routes/puntosLiga"));
};
