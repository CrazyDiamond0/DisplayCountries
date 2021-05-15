import React, { useEffect, useState } from "react";

export default function Countries(props) {
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

  return <div>{showcountries()}</div>;
}
