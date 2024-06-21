// import React from 'react';

// const PetDetails = () => {
//   return (
//     <div>
//       <h1>Pet Details</h1>
//       <div className="pet-item">
//         <h2>Pet Name 1</h2>
//         <p>Breed: Pet breed</p>
//         <p>Age: Pet age</p>
//         <p>Notes: Pet notes and details...</p>
//       </div>
//       <div className="pet-item">
//         <h2>Pet Name 2</h2>
//         <p>Breed: Pet breed</p>
//         <p>Age: Pet age</p>
//         <p>Notes: Pet notes and details...</p>
//       </div>
//     </div>
//   );
// };


// export default PetDetails;

import React from 'react';

const PetDetails = ({ petDetails, setPetDetails }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPetDetails({ ...petDetails, [name]: value });
  };

  return (
    <div>
      <h2>Pet Details</h2>
      <form>
        <label>
          Pet Name:
          <input
            type="text"
            name="petName"
            value={petDetails.petName}
            onChange={handleChange}
            placeholder="Enter your pet's name"
          />
        </label>
        <label>
          Pet Type:
          <input
            type="text"
            name="petType"
            value={petDetails.petType}
            onChange={handleChange}
            placeholder="Enter your pet's type"
          />
        </label>
      </form>
    </div>
  );
};

export default PetDetails;
