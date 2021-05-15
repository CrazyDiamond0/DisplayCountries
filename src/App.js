import React, { useState, useEffect } from "react";
import MainNavbar from "./components/MainNavbar";

export default function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchcountries();
  }, []);
  return <MainNavbar countries={countries}></MainNavbar>;

  async function fetchcountries() {
    await fetch("https://restcountries.eu/rest/v2/all")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }
}
