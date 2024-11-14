import { useContext, useEffect, useState } from "react";
import Product from "./Product";
import { CircularProgress } from "@mui/material";
import Pesquisar from "./Pesquisar";
import { CartContext } from "../context/CartContext";


export default function Shop() {

    const [products, setProduct] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch("https://dummyjson.com/products/category/smartphones?limit=30&select=id,thumbnail,title,price,description");
            if (response.ok) {
                const result = await response.json();
                setProduct(result.products);
            } else {
                setError("Fetch FAILED!")
            }
            setLoading(false);
        }

        fetchProducts();

    }, [])

    // const {products, loading, error} = useContext(CartContext);


    return (
        <section id="shop">
            <h2>Elegant product for everyone</h2>
            <Pesquisar />
            <ul id="products">
                {error && <p>{error}</p>}
                {!loading && products ? (
                    products.map((product) => (
                        <li key={product.id}>
                            <Product {...product} />
                        </li>
                    ))
                ) : (
                    <div id="loading">
                        <CircularProgress size="10rem" color="inherit"/>
                        <p>loading...</p>
                    </div>
                )}
            </ul>

        </section>
    );
}