import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";

const UpdateProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:3000/product/${params.id}`);
    result = await result.json();
    console.log(result);
    setName(result[0].name);
    setPrice(result[0].price);
    setCategory(result[0].Category);
    setCompany(result[0].company);
  };

  const updateProduct = async(e) => {
    e.preventDefault();
    let result = await fetch(`http://localhost:3000/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company }),
      headers:{
        'Content-Type':"application/json"
      }
    });

    result = await result.json();
    navigate("/")
  };

  return (
    <div className="update-product">
      <h1>Update Product</h1>
      <form onSubmit={updateProduct}>
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
        <button type="submit" className="updateProduct" >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProducts;
