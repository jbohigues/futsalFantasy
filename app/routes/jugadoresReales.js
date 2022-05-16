var express = require("express");
var router = express.Router();
var db = require("../db");
var prismaclient = require("@prisma/client");

const prisma = new prismaclient.PrismaClient();

module.exports = router;
