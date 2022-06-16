const fs = require("fs/promises");
const path = require("path");
const update = require("./update");
const { v4 } = require("uuid");
const productsPath = require("./productsPath");

async function listProducts() {
  const list = await fs.readFile(productsPath);
  const products = JSON.parse(list);

  return products;
}

async function getProductById(productId) {
  const products = await listProducts();
  const result = products.find((item) => item.id === productId);
  if (!result) {
    return null;
  }
  return result;
}

async function removeProduct(id) {
  const products = await listProducts();
  const idx = products.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  const [remove] = products.splice(idx, 1);
  await update(products);
  return remove;
}

async function addProduct(data) {
  const products = await listProducts();
  const newProduct = { id: v4(), ...data };
  products.push(newProduct);
  await update(products);
  return newProduct;
}
async function updateById(id, data) {
  const products = await listProducts();
  const idx = products.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  products[idx] = { ...data, id };
  await update(products);
  return products[idx];
}

const productsOperations = {
  listProducts,
  addProduct,
  updateById,
  removeProduct,
  getProductById,
};
module.exports = productsOperations;
