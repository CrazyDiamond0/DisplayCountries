import React, { useState } from "react";
import Countries from "./Countries";

export default function MainNavbar(props) {
  const [showfilter, setShowFilter] = useState(false);
  const [searchname, setSearchName] = useState("");
  const [regionselected, setRegionSelected] = useState("none");
  const [minpopulation, setMinPopulation] = useState("");
  const [maxpopulation, setMaxPopulation] = useState("");
  const [languageselected, setLanguageSelected] = useState("none");
  const [timezoneselected, setTimeZoneSelected] = useState("none");
  const [currencyselected, setCurrencySelected] = useState("none");

  const filtermenu = (
    <div className="container filtercontainer" style={filteranimation()}>
      <div className="filter-item">
        <label className="filter-label">Region:</label>
        <select
          className="form-control select-item"
          onChange={(e) => setRegionSelected(e.target.value)}
        >
          <option value={"none"}>none</option>
          {selectorcreator("region")}
        </select>
      </div>
      <div className="filter-item">
        <label className="filter-label">Population:</label>
        <input
          className="form-control me-2 searchinput"
          placeholder="min population"
          aria-label="Search"
          onChange={minpopulationhandleChange}
        />
        <input
          className="form-control me-2 searchinput"
          placeholder="max population"
          aria-label="Search"
          onChange={manpopulationhandleChange}
        />
      </div>
      <div className="filter-item">
        <label className="filter-label">Language:</label>

        <select
          className="form-control select-item"
          onChange={(e) => setLanguageSelected(e.target.value)}
        >
          <option value={"none"}>none</option>
          {selectorcreator2("languages", "name")}
        </select>
      </div>
      <div className="filter-item">
        <label className="filter-label">Time Zone:</label>
        <select
          className="form-control select-item"
          onChange={(e) => setTimeZoneSelected(e.target.value)}
        >
          <option value={"none"}>none</option>
          {selectorcreator3("timezones")}
        </select>
      </div>
      <div className="filter-item">
        <label className="filter-label">Currency:</label>
        <select
          className="form-control select-item"
          onChange={(e) => setCurrencySelected(e.target.value)}
        >
          <option value={"none"}>none</option>
          {selectorcreator2("currencies", "name")}
        </select>
      </div>
    </div>
  );

  function minpopulationhandleChange(e) {
    setMinPopulation(e.target.value);
  }
  function manpopulationhandleChange(e) {
    setMaxPopulation(e.target.value);
  }
  function searchhandleChange(e) {
    setSearchName(e.target.value);
  }

  function selectorcreator(type) {
    const selectorarray = [];
    const finalarray = [];
    for (let i = 0; i < props.countries.length; i++) {
      if (selectorarray.includes(props.countries[`${i}`][type]) === false) {
        selectorarray.push(props.countries[`${i}`][type]);
      }
    }
    selectorarray.sort();
    selectorarray.splice(0, 1);
    for (let i = 0; i < selectorarray.length; i++) {
      finalarray.push(
        <option value={selectorarray[i]}>{selectorarray[i]}</option>
      );
    }

    //console.log("array", selectorarray);
    return finalarray;
  }

  function selectorcreator2(type1, type2) {
    const selectorarray = [];
    const finalarray = [];
    for (let i = 0; i < props.countries.length; i++) {
      for (let j = 0; j < props.countries[`${i}`][type1].length; j++) {
        if (
          selectorarray.includes(
            props.countries[`${i}`][type1][`${j}`][type2]
          ) === false
        ) {
          selectorarray.push(props.countries[`${i}`][type1][`${j}`][type2]);
        }
      }
    }
    selectorarray.sort();
    for (let i = 0; i < selectorarray.length; i++) {
      finalarray.push(
        <option value={selectorarray[i]}>{selectorarray[i]}</option>
      );
    }
    return finalarray;
  }

  function selectorcreator3(type) {
    const selectorarray = [];
    const finalarray = [];
    for (let i = 0; i < props.countries.length; i++) {
      for (let j = 0; j < props.countries[`${i}`][type].length; j++) {
        if (
          selectorarray.includes(props.countries[`${i}`][type][`${j}`]) ===
          false
        ) {
          selectorarray.push(props.countries[`${i}`][type][`${j}`]);
        }
      }
    }
    selectorarray.sort();
    for (let i = 0; i < selectorarray.length; i++) {
      finalarray.push(
        <option value={selectorarray[i]}>{selectorarray[i]}</option>
      );
    }
    return finalarray;
  }

  function filteranimation() {
    if (showfilter === false) {
      return {
        animationName: "animation2",
        animationDuration: "0.5s",
        animationFillMode: "forwards",
      };
    }
    return {
      animationName: "animation1",
      animationDuration: "0.5s",
      animationFillMode: "forwards",
    };
  }

  return (
    <div className="container ">
      <nav className="navbar navbar-light bg-light ">
        <div className="container-fluid">
          <a className="navbar-brand" href>
            Countries
          </a>
          <input
            className="form-control me-2 searchinput"
            placeholder="Search Country by name, capital or code"
            aria-label="Search"
            onChange={searchhandleChange}
          />
          <button
            className="btn btn-secondary"
            onClick={() => setShowFilter(!showfilter)}
          >
            More Filters
          </button>
        </div>
      </nav>
      {filtermenu}
      <Countries
        countries={props.countries}
        searchname={searchname}
        region={regionselected}
        minpopulation={minpopulation}
        maxpopulation={maxpopulation}
        language={languageselected}
        timezone={timezoneselected}
        currency={currencyselected}
      ></Countries>
    </div>
  );
}
