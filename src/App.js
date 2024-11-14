import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Shop from "./components/Shop";
import { CheckBox } from "@mui/icons-material";
import Checkout from "./components/Checkout";
import CartContextProvider from "./context/CartContext";

export default function App() {
  return (
    <CartContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

    </CartContextProvider>
  );
}


