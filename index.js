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

const express = require("express");
const products = require("./products");
const app = express();

app.get("/products", (req, res) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      result: products,
    },
  });
  //   res.json(products);
  //   res.send(products);
});

app.listen(3000);
