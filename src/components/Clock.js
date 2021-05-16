import React, { useEffect, useState } from "react";

export default function Clock(props) {
  const [clock, setClock] = useState();

  useEffect(() => {
    setTimeout(() => {
      try {
        setClock(
          new Date().toLocaleString("en-US", {
            timeZone: `${props.region}/${props.capital}`,
            timeStyle: "long",
            hourCycle: "h24",
          })
        );
      } catch {
        setClock("time not found");
      }
    }, 1000);
  });

  return <label>{clock}</label>;
}
