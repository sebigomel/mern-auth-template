import React, { useEffect } from "react";
import server from "../Config/axios";

export default function Brands() {
  useEffect(async () => {
    const response = await server.get("brands");
    console.log(response.data);
  });
  return <div></div>;
}
