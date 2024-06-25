import { createContext, useEffect, useState } from "react";
import { dog_food_list } from "../assets/assets";


export const StoreContext = createContext(null)


const StoreContextProvider = (props) => {

    const [isLogin, setIsLogin] = useState(false); // state variable to see if user is logged in or not

    const [petIsRegistered, setPetIsRegistered] = useState(false); // state variable to see if user has registered their pets

    const [userId, setUserId] = useState(""); // state variable to store their userId upon logging in

    const [userIsAdmin, setUserIsAdmin] = useState(false) // state variable to indicate if user is admin or not

    const contextValue = {
        dog_food_list,  // so now food_list can be accessed anywhere
        isLogin,
        setIsLogin,
        petIsRegistered,
        setPetIsRegistered,
        userId,
        setUserId,
        userIsAdmin,
        setUserIsAdmin
    }
    
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>

    )
}

export default StoreContextProvider
