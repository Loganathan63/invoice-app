const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  tax: { type: Number, default: 0 }
});

const invoiceSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    subject: String,
    dueDate: Date,
    currency: String,

    items: [itemSchema],

    subTotal: Number,
    discount: Number,
    total: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
