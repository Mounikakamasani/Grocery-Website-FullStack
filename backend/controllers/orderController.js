const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const { customer, cartItems, totalAmount } = req.body;

    if (!customer || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Missing order details" });
    }

    const newOrder = new Order({ customer, cartItems, totalAmount });
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
