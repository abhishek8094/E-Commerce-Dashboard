import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  const searchHandler = async (event) => {
    let key = event.target.value;

    if(key){
      let result = await fetch(`http://localhost:3000/search/${key}`);
      result = await result.json();
      console.log(result);
  
      if (result) {
        setProducts(result);
      }
    }else{
      getProducts();
    }
    
  };

  return (
    <div className="products">
      <h1>Products list</h1>
      <input
        type="text"
        placeholder="search the product"
        className="search-box"
        onChange={searchHandler}
      />
      <ul>
        <li>S. No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((product, idx) => (
          <ul key={idx}>
            <li>{idx + 1}</li>
            <li>{product.name}</li>
            <li>$ {product.price}</li>
            <li>{product.Category}</li>
            <li>
              <Link to={"/update/" + product._id}>
                <button>Update</button>
              </Link>
              <button
                onClick={() => deleteProduct(product._id)}
                style={{ marginLeft: "4px" }}
              >
                Delete
              </button>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result found</h1>
      )}
    </div>
  );
};

export default Products;
