const express = require("express");
const { v4 } = require("uuid");
const products = require("../../products");
const router = express.Router();
/*
получить все товары
получить один товар по id
добавит товар обновить  товар по id
удаллить товар по id
 */
/*GET /api/products */
router.get("/", (req, res) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      result: products,
    },
  });
});
/*GET /api/products/:id */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const result = products.find((item) => item.id === id);
  if (!result) {
    res.status(404).json({
      status: "Error",
      code: 404,
      message: `Product with ${id} not found`,
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: result,
    },
  });
});

/*POST /api/products */

router.post("/", (req, res) => {
  const newProduct = { ...req.body, id: v4() };
  products.push(newProduct);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newProduct,
    },
  });
});

module.exports = router;
