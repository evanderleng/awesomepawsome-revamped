import React, { useEffect, useState } from "react";


import { useLocation, useParams } from "react-router-dom";
import GuestBookDisplay from "../../components/GuestBookDisplay/GuestBookDisplay";
import GuestBookForm from '../../components/GuestBookForm/GuestBookForm';
import axiosInstance from "../../../axiosConfig";

const GuestBook = () => {

  const [refresh, setRefresh] = useState([]);



  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div className="guestBook">
      <GuestBookDisplay refresh={refresh}/>

      <GuestBookForm onClick={() => setRefresh(true)}/>

    </div>
  );
};

export default GuestBook;
