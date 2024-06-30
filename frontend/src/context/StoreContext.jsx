import { createContext, useEffect, useState } from "react";
import { dog_food_list } from "../assets/assets";
import Cookies from "js-cookie"; // Import js-cookie for cookie management

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false); // state variable to see if user is logged in or not

  const [petIsRegistered, setPetIsRegistered] = useState(false); // state variable to see if user has registered their pets

  const [userId, setUserId] = useState(""); // state variable to store their userId upon logging in

  const [userIsAdmin, setUserIsAdmin] = useState(); // state variable to indicate if user is admin or not





  // this is consistently check if there is a token stored in the cookie or not, in case of app refreshes
  useEffect(() => {
    // Function to check and set userIsAdmin
    const checkAndSetAdmin = () => {
      // Check if isAdmin is stored in localStorage
      const isAdminStored = localStorage.getItem("isAdmin");
      console.log("Is Admin stored in localStorage? ", isAdminStored);


      if (isAdminStored !== null) {
        setUserIsAdmin(isAdminStored === "true"); // Convert string to boolean
      } else {
        setUserIsAdmin(false); // Default to false if not stored
      }
    };

    // Check if token exists in cookies
    const token = Cookies.get("authToken");
    if (token) {
      setIsLogin(true);
      checkAndSetAdmin(); // Call function to set userIsAdmin immediately
    } else {
      setIsLogin(false);
      setUserIsAdmin(false); // Ensure userIsAdmin is false if not logged in
    }
  }, []); // Empty dependency array ensures this runs only on component mount




  const contextValue = {
    dog_food_list, // so now food_list can be accessed anywhere
    isLogin,
    setIsLogin,
    petIsRegistered,
    setPetIsRegistered,
    userId,
    setUserId,
    userIsAdmin,
    setUserIsAdmin,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
