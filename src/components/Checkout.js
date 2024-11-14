import { Link } from "react-router-dom";


export default function Checkout() {
    return (
        <section className="checkout">
            <h2>Checkout</h2>


            <Link to="/"className="product-action">
                <button className="button-check">RETURN</button>
            </Link>
        </section>
    );
}