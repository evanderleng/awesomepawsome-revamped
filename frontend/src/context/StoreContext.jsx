import { createContext, useEffect, useState } from "react";
import { dog_food_list } from "../assets/assets";


export const StoreContext = createContext(null)


const StoreContextProvider = (props) => {

    const [isLogin, setIsLogin] = useState(true); // state variable to see if user is logged in or not

    const [petIsRegistered, setPetIsRegistered] = useState(false); // state variable to see if user has registered their pets


    const contextValue = {
        dog_food_list,  // so now food_list can be accessed anywhere
        isLogin,
        setIsLogin,
        petIsRegistered,
        setPetIsRegistered
    }
    
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>

    )
}

export default StoreContextProvider
