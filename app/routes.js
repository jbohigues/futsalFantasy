module.exports = function (app) {
    app.use("/", require("./routes/index"));
    app.use("/cardshome", require("./routes/cardshome"));
    app.use("/usuarios", require("./routes/usuarios"));
    app.use("/noticias", require("./routes/noticias"));
};
  