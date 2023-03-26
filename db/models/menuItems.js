const mongoose = require("../db.js");
const getLogger = require("../../logger");

const logger = getLogger("db");

const menuItemsSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: { createdAt: "created_at" } }
);
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
      new: true,
      timestamps: true
    });
    return doc;
  } catch (error) {
    logger.log("error is", error);
    throw error;
  }
};

const deleteItem = async (id) => {
  try {
    const doc = await MenuItems.findByIdAndDelete(id);
    return doc.id;
  } catch (error) {
    logger.log("error is", error);
    throw error;
  }
};

const search = async (query) => {
  const param = new RegExp(query, "ig");
  const doc = await MenuItems.find().where(
    { description: param } || { name: param }
  );
  if (doc.length >= 1) return doc;
  logger.log("No objects fit search parameters");
  throw new Error("No objects fit search parameters");
};

module.exports = {
  getAll,
  getOne,
  create,
  updateItem,
  deleteItem,
  search,
  MenuItems
};
