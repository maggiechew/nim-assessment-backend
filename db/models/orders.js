const mongoose = require("../db.js");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  items: [
    {
      item: {
        type: mongoose.Schema.ObjectId,
        ref: "MenuItems"
      },

      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  status: {
    type: String,
    required: true,
    enum: ["pending", "confirmed", "delivered", "cancelled"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
orderSchema.set("toJSON", {
  virtuals: true
});
orderSchema.statics.calcTotal = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

// order model
const Order = mongoose.model("Order", orderSchema);

const getAll = async () => {
  // populate each item
  const orders = await Order.find().populate("items.item");

  return orders;
};

const getOne = async (id) => {
  const order = await Order.findById(id).populate("items.item");
  return order;
};

const create = async (body) => {
  const order = await Order.create(body);
  return order;
};

const update = async (id, body) => {
  const order = await Order.findByIdAndUpdate(id, body, { new: true });
  return order;
};

const remove = async (id) => {
  const order = await Order.findByIdAndDelete(id);
  return order.id;
};

const getByStatus = async (status) => {
  const orders = await Order.find({ status }).populate("items");
  if (orders.length >= 1) return orders;
  throw new Error();
};
const getByStatusAndDate = async (startDate, endDate, status) => {
  const orders = await Order.find({ status })
    .where("createdAt")
    .gte(startDate)
    .lte(endDate)
    .populate("items");
  if (orders.length >= 1) return orders;
  throw new Error();
};

const calcTotal = (orders) => {
  let sum = 0;
  orders.forEach((order) => {
    const { items } = order;
    items.forEach((item) => {
      const { price } = item.item;
      const { quantity } = item;
      const subtotal = price * quantity;
      sum += subtotal;
    });
  });
  return sum;
};
const totalSales = async () => {
  const orders = await Order.find().populate("items.item");
  const returnVal = calcTotal(orders);
  return returnVal;
};

const totalSalesByDate = async (startDate, endDate) => {
  const orders = await Order.find()
    .where("createdAt")
    .gte(startDate)
    .lte(endDate)
    .populate("items.item");
  const returnVal = calcTotal(orders);
  return returnVal;
};

// const status = async (s) => {
//   const doc = await Order.find().where("status").equals(s);
//   return doc;
// };

// const statusByDate = async (startDate, endDate, s) => {
//   const doc = await Order.find().where("status").equals(s);
//   return doc;
// };

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getByStatus,
  getByStatusAndDate,
  totalSales,
  totalSalesByDate,
  // status,
  // statusByDate,
  Order
};
