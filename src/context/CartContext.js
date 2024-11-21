import { createContext, useEffect, useState, useReducer } from "react";

export const CartContext = createContext({
    items: [],
    cartCount: 0,
    products: [],
    loading: false,
    error: "",
    addItemToCart: () => {},
    updateItemQuantity: () => {},
    removeItemFromCart: () => {}, // Adicionando a função de remover
});

export default function CartContextProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch(
                "https://dummyjson.com/products/category/smartphones?limit=30&select=id,thumbnail,title,price,description"
            );
            if (response.ok) {
                const result = await response.json();
                setProducts(result.products);
            } else {
                setError("Fetch FAILED!");
            }
            setLoading(false);
        }

        fetchProducts();
    }, []);

    // Shopping cart reducer
    function cartReducer(state, action) {
        if (action.type === "ADD_ITEM") {
            const updatedItems = [...state.items];
            const existingCartItemIndex = updatedItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if (existingCartItemIndex >= 0) {
                const updatedItem = {
                    ...updatedItems[existingCartItemIndex],
                    quantity: updatedItems[existingCartItemIndex].quantity + 1,
                };
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                const product = action.payload.product;
                updatedItems.push({
                    id: action.payload.id,
                    thumbnail: product.thumbnail,
                    price: product.price,
                    title: product.title, // Adicionando o título ao item
                    quantity: 1,
                });
            }
            return { items: updatedItems };
        }

        if (action.type === "REMOVE_ITEM") {
            const updatedItems = state.items.filter(item => item.id !== action.payload.id);
            return { items: updatedItems };
        }

        if (action.type === "UPDATE_ITEM") {
            const updatedItems = [...state.items];
            const updatedItemIndex = updatedItems.findIndex(
                (item) => item.id === action.payload.id
            );
            const updatedItem = {
                ...updatedItems[updatedItemIndex],
                quantity: updatedItems[updatedItemIndex].quantity + action.payload.amount,
            };

            if (updatedItem.quantity < 1) {
                updatedItems.splice(updatedItemIndex, 1);
            } else {
                updatedItems[updatedItemIndex] = updatedItem;
            }
            return { items: updatedItems };
        }

        return state;
    }

    const [cartState, cartDispatch] = useReducer(cartReducer, { items: [] });

    const handleAddItemToCart = (id) => {
        const product = products.find((product) => product.id === id);
        cartDispatch({ type: "ADD_ITEM", payload: { id, product } });
    };

    const handleUpdateItemQuantity = (id, amount) => {
        cartDispatch({ type: "UPDATE_ITEM", payload: { id, amount } });
    };

    const handleRemoveItemFromCart = (id) => {
        cartDispatch({ type: "REMOVE_ITEM", payload: { id } });
    };

    const cartCount = cartState.items.reduce((total, item) => total + item.quantity, 0);

    const ctx = {
        items: cartState.items,
        cartCount,
        products,
        loading,
        error,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateItemQuantity,
        removeItemFromCart: handleRemoveItemFromCart, // Função de remover item
    };

    return <CartContext.Provider value={ctx}>{children}</CartContext.Provider>;
}
