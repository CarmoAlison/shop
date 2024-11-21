import { Link } from "react-router-dom";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

// Estilizando o Badge para o ícone do carrinho
const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: -10,
        top: 0,
        border: `2px solid #000`,
        padding: "0 4px",
        backgroundColor: "#FF5722", // Cor de fundo do badge
        color: "#fff", // Cor do número
    },
}));

export default function Header() {
    // Obtém os itens do carrinho a partir do contexto
    const { items } = useContext(CartContext);

    // Conta quantos itens estão no carrinho
    const cartQuantity = items.reduce((total, item) => total + item.quantity, 0); // Soma a quantidade de cada item no carrinho

    return (
        <header id="main-header">
            <div id="main-title">
                <h1>Elegant Shop</h1>
            </div>

            <nav>
                <Link to="/" id="home-link">Home</Link>
                <Link to="/checkout" id="checkout-link">
                    <IconButton aria-label="cart" size="large" id="carrinho-fixed">
                        {/* Exibe o ícone do carrinho com a quantidade de itens */}
                        <StyledBadge 
                            badgeContent={cartQuantity > 0 ? cartQuantity : null} // Exibe a quantidade ou nada caso seja 0
                            color="secondary" 
                            id="quantidade-carrinho"
                        >
                            <ShoppingCartIcon size="large" id="button-cart-header"/>
                        </StyledBadge>
                    </IconButton>
                </Link>
            </nav>
        </header>
    );
}
