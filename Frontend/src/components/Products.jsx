import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:3000/products");
    result = await result.json();
    setProducts(result);

    console.log(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:3000/product/${id}`, {
      method: "Delete",
    });

    result = await result.json();
    if (result) {
        getProducts();
    }
  };

  return (
    <div className="products">
      <h1>Products list</h1>
      <ul>
        <li>S. No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {products.map((product, idx) => (
        <ul key={idx}>
          <li>{idx}</li>
          <li>{product.name}</li>
          <li>$ {product.price}</li>
          <li>{product.Category}</li>
          <li>
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Products;
