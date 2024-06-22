import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";


export const StoreContext = createContext(null)


const StoreContextProvider = (props) => {

    // this is to manage the cart items , how many to add
const [cartItems, setCartItems] = useState({});

const addToCart = (itemId) => {
    // Check if the cart does not have this item with this itemId
    if (!cartItems[itemId]) {
        // If the item is not in the cart, add it with a quantity of 1
        setCartItems((prev) => ({
            ...prev,         // Spread the previous state to keep existing items in the cart
            [itemId]: 1      // Add the new item with a quantity of 1
        }))
    } else {
        // If the item is already in the cart, increase its quantity by 1
        setCartItems((prev) => ({
            ...prev,                        // Spread the previous state to keep existing items in the cart
            [itemId]: prev[itemId] + 1      // Update the quantity of the existing item
        }))
    }
};


const removeFromCart = (itemId) => {
    setCartItems((prev)=>({...prev, [itemId]: prev[itemId]-1}))  // remove quantity by 1 for that itemId
}

useEffect(()=>{console.log(cartItems);}, [cartItems])


    const contextValue = {
        food_list,  // so now food_list can be accessed anywhere
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
    }
    
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>

    )
}

export default StoreContextProvider
