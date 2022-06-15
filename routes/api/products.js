// const express = require("express");
// const { v4 } = require("uuid");
// const products = require("../../products");

// /*
// получить все товары
// получить один товар по id
// добавит товар обновить  товар по id
// удаллить товар по id
//  */
// /*GET /api/products */
// const productOperations = require("../../model/index");
// const router = express.Router();

// router.get("/", async (req, res) => {
//   res.json({
//     status: "success",
//     code: 200,
//     data: {
//       result: products,
//     },
//   });
// });
// /*GET /api/products/:id */
// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   const result = products.find((item) => item.id === id);
//   if (!result) {
//     res.status(404).json({
//       status: "Error",
//       code: 404,
//       message: `Product with ${id} not found`,
//     });
//   }
//   res.json({
//     status: "success",
//     code: 200,
//     data: {
//       result: result,
//     },
//   });
// });

// /*POST /api/products */

// router.post("/", (req, res) => {
//   const newProduct = { ...req.body, id: v4() };
//   products.push(newProduct);
//   res.status(201).json({
//     status: "success",
//     code: 201,
//     data: {
//       result: newProduct,
//     },
//   });
// });

/*something like homework */

const express = require("express");
const { v4 } = require("uuid");
const products = require("../../products");
const productsOperations = require("../../model/index");
const createError = require("http-errors");
const Joi = require("joi");
const router = express.Router();

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0.01).required(),
});

router.get("/", async (req, res, next) => {
  try {
    const products = await productsOperations.listProducts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: products,
      },
    });
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   status: "error",
    //   code: 500,
    //   message: "Server error",
    // });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productsOperations.getProductById(id);
    if (!result) {
      /*take error with librerires with no hands */
      throw createError(404, `Product with id=${id}not found `);
      /*catch error with hands */
      // const error = new Error(`Product with id=${id}not found `);
      // error.status = 404;
      // throw error;
      // res.status(404).json({
      //   status: "error",
      //   code: 404,
      //   message: `Product with id=${id} not found`,
      // });
      // return;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   status: "error",
    //   code: 500,
    //   message: "Server error",
    // });
  }
});
router.post("/", async (req, res, next) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await productsOperations.addProduct(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
