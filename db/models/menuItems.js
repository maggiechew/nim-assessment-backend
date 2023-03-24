const mongoose = require("../db.js");

const menuItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  }
}, { timestamps: { createdAt: "created_at" } });
menuItemsSchema.set("toJSON", {
  virtuals: true
});
// menu model
const MenuItems = mongoose.model("MenuItems", menuItemsSchema);

const getAll = async () => {
  try {
    const menuItems = await MenuItems.find();
    return menuItems;
  } catch (error) {
    return error;
  }
};

const getOne = async (id) => {
  try {
    const menuItem = await MenuItems.findById(id);
    return menuItem;
  } catch (error) {
    return error;
  }
};

const create = async (body) => {
  try {
    const menuItem = await MenuItems.create(body);
    return menuItem;
  } catch (error) {
    return error;
  }
};

const updateItem = async (id, updatedBody) => {
  try {
    const doc = await MenuItems.findByIdAndUpdate(id, updatedBody, {
      new: true, timestamps: true
    });
    return doc;
  } catch (error) {
    console.log("error is", error)
    throw error;
  }
};

const deleteItem = async (id) => {
  try {
    const doc = await MenuItems.findByIdAndDelete(id);
    return doc.id;
  } catch (error) {
    console.log("error is", error)
    throw error;
}}

module.exports = { getAll, getOne, create, updateItem, deleteItem, MenuItems };