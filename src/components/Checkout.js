import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";


export default function Checkout() {
    const { items, updateItemQuantity, removeItemFromCart } = useContext(CartContext);

    const handleUpdateQuantity = (id, amount) => {
        updateItemQuantity(id, amount);
    };

    const handleRemoveItem = (id) => {
        removeItemFromCart(id);
    };

    // Calcula o preço total do carrinho
    // const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const cartPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <section className="checkout">
            <h2>Meu Carrinho</h2>
            {items.length === 0 ? (
                <p>Seu carrinho está vazio</p>
            ) : (
                <>
                    <ul className="checkout-items">
                        {items.map(item => (
                            <li key={item.id} className="checkout-item">
                                <div className="checkout-item-info" id="checkout-main">
                                    <img src={item.thumbnail} alt={item.title} className="checkout-item-img" />
                                    <div id="checkout-inf">
                                        <p className="checkout-item-title" id="title-checkout">{item.title}</p>
                                        <p className="checkout-item-price" id="price-checkout">${cartPrice.toFixed(2)}</p>
                                    </div>
                                    <div className="checkout-item-quantity">
                                        <button
                                            onClick={() => handleUpdateQuantity(item.id, -1)}
                                            disabled={item.quantity === 1}
                                            className="quantity-btn"
                                        >
                                            -
                                        </button>
                                        <span className="quantity-display">{item.quantity}</span>
                                        <button
                                            onClick={() => handleUpdateQuantity(item.id, 1)}
                                            className="quantity-btn"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="remove-btn"
                                    >
                                        Remover
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {/* <div className="checkout-total">
                        <h3>Total: ${totalPrice.toFixed(2)}</h3>
                    </div> */}
                </>
            )}
            <div className="checkout-actions">
                <Link to="/" className="product-action">
                    <button className="button-check">Voltar</button>
                </Link>
            </div>
        </section>
    );
}
