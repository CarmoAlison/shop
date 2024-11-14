import { createContext, useEffect, useState, useReducer } from "react";

export const CartContext = createContext({
    items: [],
    products: [],
    loading: false,
    error: "",
    addItemToCart: () => { },
    updateItemQuantity: () => { },
});

export default function CartContextProvider({ children }) {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch("https://dummyjson.com/products/category/smartphones?limit=30&select=id,thumbnail,title,price,description");
            if (response.ok) {
                const result = await response.json();
                setProducts(result.products);
            } else {
                setError("Fetch FAILED!")
            }
            setLoading(false);
        }

        fetchProducts();

    }, [])

    //shopping cart

    function cartReducer(state, action) {
        if (action.type === "ADD_ITEM") {
            const updatedItems = [...state.items];
            const existingCartItemIndex = updatedItems.findIndex(
                (item) => item.id === action.payload.id
            );

            const existingCartItem = updatedItems[existingCartItemIndex];

            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity + 1,
                }
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                const product = action.payload.products.find(
                    (product) => product.id === action.payload.id
                );
                updatedItems.push({
                    id: action.payload.id,
                    thumbnail: product.thumbnail,
                    price: product.price,
                    quantity: 1,
                });
            }
            return { items: updatedItems };
        }
        if (action.type === "UPDATE_ITEM") {
            const updatedItems = [...state.items];
            const updatedItemIndex = updatedItems.findIndex(
                (item) => item.id === action.payload.id
            );

            const updatedItem = { ...updatedItems[updatedItemIndex] }
            updatedItem.quantity += action.payload.amount;

            if (updatedItem.quantity < 1) {
                updatedItems.splice(updatedItemIndex, 1);
            } else {
                updatedItems[updatedItemIndex] = updatedItem;
            }
            return { ...state, ites: updatedItem };

        }
        return state;
    }
    const [cartState, cartDispatch] = useReducer(
        cartReducer,
        { items: [] }
    );

    function handleAddItemToCart(id) {
        cartDispatch({
            type: "ADD_ITEM",
            payload: { id, products }
        })
    }
    function handleUpdateItemQuantity(id, amount) {
        cartDispatch({
            type: "UPDATE_ITEM",
            payload: { id, amount }
        })
    }

    const ctx = {
        items: cartState.items,
        product: products,
        loading: loading,
        error: error,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateItemQuantity
    };

    return <CartContext.Provider value={ctx}>
        {children}
    </CartContext.Provider>
}