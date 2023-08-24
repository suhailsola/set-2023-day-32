import React, { useContext, useEffect, useState } from "react";
import { getAllLinks } from "../api";
import { AuthContext } from "../../App";

const useGetAllLink = (deps = []) => {
  const [linkState, setLinkState] = useState("pending");
  const [data, setData] = useState([]);
  const { jwtCookie } = useContext(AuthContext);

  const fetchLinks = async () => {
    try {
      setLinkState("loading");
      const data = await getAllLinks(jwtCookie);
      console.log(data.data.data.rows);
      setLinkState("success");
      setData(data.data.data.rows);
    } catch (error) {
      setLinkState("error");
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [...deps]);
  return { linkState, data };
};

export default useGetAllLink;
