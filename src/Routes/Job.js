const express = require("express");
const {
  authValidator,
  adminValidator,
} = require("../middleWares/authMiddleware");
const jobRoute = express.Router();
const { Job } = require("../models/job.model");

jobRoute.post("/", adminValidator, async (req, res) => {
  const { company_name, position, contract, location } = req.body;

  try {
    await Job.create({ company_name, position, contract, location });
    res.status(200).send({ msg: "Job posted Successfully !" });
  } catch (err) {
    res.status(500).send({ msg: "Job posted Failed ! " });
  }
});

jobRoute.get("/", authValidator, async (req, res) => {
  try {
    let jobs = await Job.find();
    res.status(200).send({ msg: "Job Founded Successfully !", jobs });
  } catch (err) {
    res.status(500).send({ msg: "Job Founded Failed ! " });
  }
});

jobRoute.patch("/:id", adminValidator, async (req, res) => {
  const { company_name, position, contract, location } = req.body;
  const { id } = req.params;

  try {
    await Job.findByIdAndUpdate({
      _id: id,
      company_name,
      position,
      contract,
      location,
    });
    res.status(200).send({ msg: "Job updated Successfully !" });
  } catch (err) {
    res.status(500).send({ msg: "Job update Failed ! " });
  }
});

jobRoute.delete("/:id", adminValidator, async (req, res) => {
  const { id } = req.params;
  try {
    await Job.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Job Deleted Successfully !" });
  } catch (err) {
    res.status(500).send({ msg: "Job delete Failed ! " });
  }
});

module.exports = { jobRoute };
