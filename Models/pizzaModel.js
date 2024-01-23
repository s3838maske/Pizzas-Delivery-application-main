const mongoose = require("mongoose");

const pizzaSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    variants: [],
    prices: [],
    category: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const pizzaModel = mongoose.model("Pizzas", pizzaSchema, "Pizzas");

module.exports = pizzaModel;
