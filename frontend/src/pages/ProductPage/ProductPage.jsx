import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import FilterBreed from "../../components/FilterBreed/FilterBreed";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";

const ProductPage = () => {
  //breedSize is the state, setbreedSize is the function that sets the state
  const [breedSize, setBreedSize] = useState("All");

  //state to store searched prodcuct
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="place-order">
      <div className="search-bar-container">
        <form action="" className="search-bar-form">
          <input
            type="text"
            className="search-input"
            placeholder="Search Your Products Here..."
            value={searchQuery} // bind input to value to state
            onChange={(e) => setSearchQuery(e.target.value)}  // update state with the new value on change.
          />
        </form>
      </div>

      {/* you are passing both the state and the setter to FilterBreed */}
      <FilterBreed breedSize={breedSize} setBreedSize={setBreedSize} />

      {/*you are passing state of breedSize to FoodDisplay component*/}
      <FoodDisplay breedSize={breedSize} searchQuery={searchQuery}/>
    </div>
  );
};

export default ProductPage;
