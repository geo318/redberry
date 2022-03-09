import React, { useState, useEffect } from "react";

function Submit() {
  const [data, setData] = useState([]);

  const getData = () => {
    fetch(
      "https://bootcamp-2022.devtest.ge/api/applications?token=8fe41587-868f-4abc-8c84-8bb375df1cdd"
    )
      .then((response) => response.json())
      .then((Json) => {
        setData(Json);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return <div>wow</div>;
}

export { Submit };
