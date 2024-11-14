import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Product({ Id, thumbnail, title, price, description }) {
    const { addItemToCart } = useContext(CartContext);
    return (
        <article className="product">
            <img src={thumbnail} alt={title} />
            <div className="product-content">
                <div>
                    <h3>{title}</h3>
                    <p className="product-price">$ {price}</p>
                    <p className="description-cart">{description}</p>
                </div>
                <p className="product-action">
                    <button className="button-cart" onClick={() => addItemToCart(Id)}><ShoppingCartIcon size="large" /></button>
                </p>
            </div>
        </article>
    );

}