const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  vehicleName: String,
  driverName: String,
});

module.exports = mongoose.model("Order", orderSchema);
