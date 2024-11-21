// App.js
import { CartProvider } from "./context/CartContext";
import Shop from "./components/Shop";
import Checkout from "./components/Checkout";

function App() {
    return (
        <CartProvider>
            <Shop />
            <Checkout />
        </CartProvider>
    );
}

export default App;
