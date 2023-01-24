const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  company_name: { type: String, require: true },
  position: { type: String, require: true },
  contract: { type: String, require: true },
  location: { type: String, require: true },
});

const Job = mongoose.model("job", jobSchema);

module.exports = { Job };
