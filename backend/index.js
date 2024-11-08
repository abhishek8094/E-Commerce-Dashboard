const express = require("express");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (error, token) => {
    if (err) {
      res.send({
        result: "something went wrong, Please trying after sometime",
      });
    }
    res.send({ result, auth: token });
  });
  
});

app.get("/hello", (req, res) => {
  res.send("how are you ji");
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (error, token) => {
        if (err) {
          res.send({
            result: "something went wrong, Please trying after sometime",
          });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "User not found" });
    }
  } else {
    res.send({ result: "No user Found" });
  }
});

app.post("/add-product", async (req, res) => {
  let product = await new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send("result :", "No products Found");
  }
});

app.delete("/product/:id", async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Error deleting product" });
  }
});

app.get("/product/:id", async (req, res) => {
  let result = await Product.find({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No record Found." });
  }
});

app.put("/product/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );

  res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

function verifyToken(req, res, next){
  const token = req.headers["authorization"];
  console.warn("middleware called", token)
  next();
}

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
