const productsPath = require("./productsPath");
const fs = require("fs/promises");
const update = async (products) => {
  await fs.writeFile(productsPath, JSON.stringify(products));
};

module.exports = update;
