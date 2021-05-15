import React, { useEffect, useState } from "react";
import Modal from "react-modal";

export default function Countries(props) {
  const [showmodel, setShowModel] = useState(false);
  const [textinfo, setTextinfo] = useState();

  function showcountries() {
    const returncountries = [];
    for (let i = 0; i < props.countries.length; i++) {
      if (props.countries.length !== 0) {
        if (
          props.region === "none" ||
          props.countries[`${i}`]["region"] === props.region
        ) {
          if (
            props.language === "none" ||
            languagecondition(props.countries[`${i}`], props.language)
          ) {
            if (
              props.timezone === "none" ||
              timezonecondition(props.countries[`${i}`], props.timezone)
            ) {
              if (
                props.currency === "none" ||
                currencycondition(props.countries[`${i}`], props.currency)
              ) {
                if (
                  populationcondition(
                    props.countries[`${i}`],
                    props.minpopulation,
                    props.maxpopulation
                  ) ||
                  (props.minpopulation === "" && props.maxpopulation === "")
                )
                  if (
                    props.countries[`${i}`]["name"]
                      .substring(0, props.searchname.length)
                      .toLowerCase() === props.searchname.toLowerCase() ||
                    (props.countries[`${i}`]["numericCode"] !== null &&
                      props.countries[`${i}`]["numericCode"].substring(
                        0,
                        props.searchname.length
                      ) === props.searchname) ||
                    props.countries[`${i}`]["capital"]
                      .substring(0, props.searchname.length)
                      .toLowerCase() === props.searchname.toLowerCase()
                  ) {
                    returncountries.push(
                      <a
                        id={props.countries[`${i}`]["alpha3Code"]}
                        onClick={async (e) => {
                          fetchcountry(e.currentTarget.id);
                          await setShowModel(!showmodel);
                        }}
                      >
                        <div className="card">
                          <img
                            className="card-img-top"
                            src={props.countries[`${i}`]["flag"]}
                            alt="Card image cap"
                          />
                          <div className="card-body">
                            <h5 className="card-title">
                              {props.countries[`${i}`]["name"]}
                            </h5>
                            <p className="card-text">
                              <label>
                                Capital: {props.countries[`${i}`]["capital"]}
                              </label>
                              <label>
                                Region: {props.countries[`${i}`]["region"]}
                              </label>
                              <label>
                                Population:{" "}
                                {props.countries[`${i}`]["population"]}
                              </label>
                            </p>
                          </div>
                        </div>
                      </a>
                    );
                  }
              }
            }
          }
        }
      }
      if (typeof props.countries[`${i}`]["numericCode"] == "object") {
        console.log(props.countries[`${i}`]["numericCode"]);
      }
    }
    if (returncountries.length === 0) {
      returncountries.push(<div>No info founded</div>);
    }

    return <div className="container container-grid">{returncountries}</div>;
  }

  function languagecondition(country, language) {
    for (let i = 0; i < country["languages"].length; i++) {
      if (country["languages"][`${i}`]["name"] === language) {
        return true;
      }
    }
    return false;
  }
  function populationcondition(country, minpopulation, maxpopulation) {
    if (minpopulation !== "" && maxpopulation !== "") {
      if (
        country["population"] >= minpopulation &&
        maxpopulation >= country["population"]
      ) {
        return true;
      }
      return false;
    } else if (minpopulation !== "") {
      if (minpopulation <= country["population"]) {
        return true;
      }
      return false;
    } else if (maxpopulation !== "") {
      if (maxpopulation >= country["population"]) {
        return true;
      }
      return false;
    }
  }

  function currencycondition(country, currency) {
    for (let i = 0; i < country["currencies"].length; i++) {
      if (country["currencies"][`${i}`]["name"] === currency) {
        return true;
      }
    }
    return false;
  }
  function timezonecondition(country, timezone) {
    for (let i = 0; i < country["timezones"].length; i++) {
      if (country["timezones"][`${i}`] === timezone) {
        return true;
      }
    }
    return false;
  }

  async function fetchcountry(country) {
    const fetchcountryvalue = await fetch(
      `https://restcountries.eu/rest/v2/alpha/${country}`
    )
      .then((response) => response.json())
      .then((data) => {
        var currenttime;

        try {
          currenttime = Date().toLocaleString("en-US", {
            timeZone: `${data["region"]}/${data["capital"]}`,
            timeStyle: "long",
            hourCycle: "h24",
          });
        } catch {
          currenttime = "time not found";
        }
        const neighbourcountries = [];
        const timezones = [];
        const latlng = [];
        const currencies = [];
        const languages = [];
        for (let i = 0; i < data["borders"].length; i++) {
          neighbourcountries.push(
            <a
              id={data["borders"][i]}
              onClick={(e) => {
                fetchcountry(e.currentTarget.id);
              }}
            >
              {" "}
              {data["borders"][i]}{" "}
            </a>
          );
        }
        for (let i = 0; i < data["timezones"].length; i++) {
          timezones.push(<label> {data["timezones"][i]} </label>);
        }
        for (let i = 0; i < data["languages"].length; i++) {
          languages.push(<label> {data["languages"][i]["name"]} </label>);
        }
        for (let i = 0; i < data["currencies"].length; i++) {
          currencies.push(<label> {data["currencies"][i]["name"]} </label>);
        }

        latlng.push(
          <label className="latlng"> latitude: {data["latlng"][0]} </label>
        );
        latlng.push(
          <label className="latlng"> longitude: {data["latlng"][1]} </label>
        );

        console.log("dasdsadsa", neighbourcountries);
        setTextinfo(
          <div>
            <img className="img-model" src={data["flag"]}></img>
            <div>Country name: {data["name"]}</div>
            <div>Alpha 2 code: {data["alpha2Code"]}</div>
            <div>Capital: {data["capital"]}</div>
            <div>Region: {data["region"]}</div>
            <div>Population: {data["population"]}</div>
            <div>LatLng: {latlng}</div>
            <div>Area: {data["area"]}</div>
            <div>Timezone: {timezones}</div>
            <div>Current time: {currenttime}</div>
            <div>Neighbour countries: {neighbourcountries}</div>
            <div>Currencies: {currencies}</div>
            <div>Official languages: {languages}</div>
          </div>
        );
      });
  }

  return (
    <div>
      {showcountries()}

      <Modal isOpen={showmodel}>
        <div className="container">
          <h2>Country</h2>
          <div>{textinfo}</div>
          <button onClick={() => setShowModel(!showmodel)}>Close</button>
        </div>
      </Modal>
    </div>
  );
}
