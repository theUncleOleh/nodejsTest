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

// async function removeContact(contactId) {
//   const contacts = await listContacts();
//   const idx = contacts.findIndex((item) => item.id === contactId);
//   if (idx === -1) {
//     return null;
//   }
//   const [remove] = contacts.splice(idx, 1);
//   await update(contacts);
//   return remove;
// }

async function addProduct(name, price) {
  const products = await listProducts();
  const newProduct = { id: v4(), name, price };
  products.push(newProduct);
  await update(products);
  return newProduct;
}

const productsOperations = {
  listProducts,
  addProduct,
  // removeContact,
  getProductById,
};
module.exports = productsOperations;
