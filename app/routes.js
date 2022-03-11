module.exports = function (app) {
    app.use("/", require("./routes/index"));
    app.use("/cardshome", require("./routes/cardshome"));
};
  