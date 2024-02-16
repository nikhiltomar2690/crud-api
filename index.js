const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const app = express();

// middlewares
// allow the app to send json in request as it cannot be done directly
app.use(express.json());
// accept other types of data also
app.use(express.urlencoded({ extended: false }));
// we also use nodemon in this server to reflect the changes in server so that we do not need to restart the server each time.

// routes
app.use("/api/products", productRoute);

// when the server starts this happens
app.listen(3000, () => {
  console.log("Hi there, server started on port 3000");
});

// view products
// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// update a product
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const UpdatedProduct = await Product.findById(id);
    res.status(200).json(UpdatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// view selected product with id
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// post products to the mongodb database
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not Found" });
    }

    res.status(200).json({ message: " Product deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// mongodb+srv://freakyhell6:<password>@backend.f9nxyap.mongodb.net/?retryWrites=true&w=majority

// connect to mongodb using mongoose
mongoose
  .connect(
    "mongodb+srv://freakyhell6:RMWplTmkHdbvtYaM@backend.f9nxyap.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    // sends a get request to the server
    app.get("/", (req, res) => {
      res.send("Hi From Node API Server Updated");
    });
  })
  .catch(() => {
    console.log("MongoDB connection failed");
  });
