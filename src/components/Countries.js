import React, { useState } from "react";
import Modal from "react-modal";
import Clock from "./Clock";

export default function Countries(props) {
  Modal.setAppElement("#root");
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
                    (props.countries[`${i}`]["alpha3Code"] !== null &&
                      props.countries[`${i}`]["alpha3Code"].substring(
                        0,
                        props.searchname.length
                      ) === props.searchname) ||
                    props.countries[`${i}`]["capital"]
                      .substring(0, props.searchname.length)
                      .toLowerCase() === props.searchname.toLowerCase()
                  ) {
                    returncountries.push(
                      <a
                        key={props.countries[`${i}`]["name"]}
                        href
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
                            alt=""
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
    }
    if (returncountries.length === 0) {
      returncountries.push(<div className="not-found">No info founded</div>);
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
        //console.log(`${data["region"]}/${data["capital"]}`);
        const neighbourcountries = [];
        const timezones = [];
        const latlng = [];
        const currencies = [];
        const languages = [];
        for (let i = 0; i < data["borders"].length; i++) {
          neighbourcountries.push(
            <a
              className="btn btn-secondary neighbour"
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
          languages.push(
            <label className="languages-modal">
              {" "}
              {data["languages"][i]["name"]}{" "}
            </label>
          );
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

        setTextinfo(
          <div className="container-modal">
            <img className="img-model" src={data["flag"]}></img>
            <div>
              <label className="model-label">Country name: </label>
              {data["name"]}
            </div>
            <div>
              <label className="model-label">Alpha 2 code: </label>
              {data["alpha2Code"]}
            </div>
            <div>
              <label className="model-label">Capital: </label>
              {data["capital"]}
            </div>
            <div>
              <label className="model-label">Region: </label>
              {data["region"]}
            </div>
            <div>
              <label className="model-label">Population: </label>
              {data["population"]}
            </div>
            <div>
              <label className="model-label">LatLng: </label>
              {latlng}
            </div>
            <div>
              <label className="model-label">Area: </label>
              {data["area"]}
            </div>
            <div>
              <label className="model-label">Timezone: </label>
              {timezones}
            </div>
            <div>
              <label className="model-label">Current time: </label>
              <Clock region={data["region"]} capital={data["capital"]}></Clock>
            </div>
            <div>
              <label className="model-label">Neighbour countries: </label>
              {neighbourcountries}
            </div>
            <div>
              <label className="model-label">Currencies: </label>
              {currencies}
            </div>
            <div>
              <label className="model-label">Official languages: </label>
              {languages}
            </div>
          </div>
        );
      });
  }

  const customStyles = {
    content: {
      top: "100px",
      left: "100px",
      right: "100px",
      bottom: "100px",
      border: "1px solid #ccc",
      overflow: "auto",
      borderRadius: "4px",
      paddingBottom: "10px",
      background: "#f8f9fa",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.3)",
    },
  };

  return (
    <div>
      {showcountries()}

      <Modal
        isOpen={showmodel}
        style={customStyles}
        onRequestClose={() => setShowModel(false)}
      >
        <div className="container container-modal">
          <div>{textinfo}</div>
          <button
            className="btn btn-secondary buttom-modal"
            onClick={() => setShowModel(!showmodel)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
