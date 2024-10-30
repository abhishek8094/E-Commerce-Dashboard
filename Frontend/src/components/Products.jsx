import { useEffect, useState } from "react";

const Products = ()=>{
    const [products, setProducts] = useState([]);

    useEffect(() =>{
        getProducts();
    },[])

    const getProducts = async() =>{
        let result = await fetch("http://localhost:3000/products");
        result = await result.json();
        setProducts(result)

        console.log(result);
    }
    return(
        <div className="products">
        <h1>Products list</h1>
        <ul>
           <li>S. No.</li> 
           <li>Name</li> 
           <li>Price</li> 
           <li>Category</li> 
        </ul>
        {
            products.map((product, idx)=>(
                <ul key={idx}>
                <li>{idx}</li> 
                <li>{product.name}</li> 
                <li>$ {product.price}</li> 
                <li>{product.Category}</li> 
             </ul> 
            ))
        }
        </div>
    )
}

export default Products;