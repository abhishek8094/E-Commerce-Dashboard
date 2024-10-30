import { useState } from "react";

const AddProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");

  const addProduct = async (e) => {
    e.preventDefault();
    console.log(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    let result = await fetch("http://localhost:3000/add-product", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, category, company, userId }),
    });
    result = await result.json();
    console.log(result);

    setName("");
    setPrice("");
    setCategory("");
    setCompany("");
  };

  return (
    <div className="Add-Products">
      <h1>Add Products</h1>
      <form onSubmit={addProduct}>
        <input
          type="text"
          placeholder="Enter product name"
          value={name}
          className="inputBox"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter product price"
          value={price}
          className="inputBox"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter product category"
          value={category}
          className="inputBox"
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter product company"
          value={company}
          className="inputBox"
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <button type="submit" className="addProduct">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
