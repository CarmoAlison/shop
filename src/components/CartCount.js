// Navbar.js
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Navbar() {
    const { cartCount } = useContext(CartContext);

    return (
        <nav>
            <h1>Minha Loja</h1>
            <div className="cart-icon">
                <ShoppingCartIcon />
                <span>{cartCount}</span>
            </div>
        </nav>
    );
}
