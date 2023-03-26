const Order = require("../db/models/orders.js");

const getAll = async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const order = await Order.getOne(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const order = await Order.update(req.params.id, req.body);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  try {
    const order = await Order.remove(req.params.id);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getByCustomer = async (req, res) => {
  try {
    const orders = await Order.getByCustomer(req.params.id);
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getByStatus = async (req, res) => {
  const {s, startDate, endDate} = req.query;
  let orders;
  try {
    if (startDate && endDate) {
      orders = await Order.getByStatusAndDate(startDate, endDate,s);
    } else {
      orders = await Order.getByStatus(s);
    }
    res.send(orders);
  } catch (error) {
    res.status(500).send({message: "No orders matching provided status."});
  }
};

const totalSales = async (req, res) => {
  const { startDate, endDate } = req.query;
  let total;
  try {
    if (startDate && endDate) {
      total = await Order.totalSalesByDate(startDate, endDate);
    } else {
      total = await Order.totalSales();
    }
    total = {total};
    res.send(total);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getByCustomer,
  getByStatus,
  totalSales
};
