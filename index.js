// first example
// const express = require("express");

// const app = express();
// /*якщо прийде get запит на адрессу / */
// app.get("/", (request, response) => {
//   //   console.log(request.url);
//   //   console.log(request.method);
//   //   console.log(request.headers);

//   response.send("<h2>Contacts page</h2>");
// });
// app.listen(3000, () => console.log("Serverg running"));

/*second example */

// const express = require("express");
// const products = require("./products");
// const app = express();

// app.get("/products", (req, res) => {
//   res.json({
//     status: "success",
//     code: 200,
//     data: {
//       result: products,
//     },
//   });
//   //   res.json(products);
//   //   res.send(products);
// });

// app.listen(3000);

/*example with middlewar */

// const express = require("express");
// const products = require("./products");
// const app = express("moment");
// const fs = require("fs/promises");
// const moment = require("moment")
// const cors = require("cors");
// /*add aprove cors request */
// app.use(cors());
// /*add request to server.log */
// // app.use(async(req, res, next)=> {
// // const {method, url} = req;
// // const date = moment().format("DD-MM-YYYY_hh:mm:ss");
// // await fs.appendFile("server.log", `\n${method} ${url} ${date}`)
// // next();
// // })
// // app.use((req, res, next) => {
// //   console.log("first middlewar");
// //   next();
// // })
// // app.use((req, res, next) => {
// //   console.log("second middlewar");
// //   next();
// // })


// app.get("/products",(req, res) => {
//   res.json({status: "success",
// code:200,
// data: {
//   results: products,
// },})
// })


// app.listen(3000)

/*trying to do ajax  */
const express = require("express");
const products = require("./products");

const fs = require("fs/promises");
const moment = require("moment")
const cors = require("cors");
const productsRouter = require("./routes/api/products");
const app = express();
app.use(cors());
/*when you send a POST req you need to use that */
app.use(express.json())

app.use("/api/products", productsRouter);

app.listen(3000);


