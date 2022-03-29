import React, { useState } from "react";
import stars from "./stars.png";

function Dots(props) {
  let len = props.cur;
  let dots = [];
  for (let i = 0; i < props.len - 4; i++) {
    dots.push(
      <button
        className={`dot ${len > i ? "complete" : ""}`}
        id={i}
        key={i}
        onClick={() => props.f(i + 1)}
      ></button>
    );
  }
  return <div className="dots">{dots}</div>;
}

function Welcome(props) {
  return (
    <>
      <div className="main_back">
        <main
          style={{ backgroundImage: "url(" + require("./stars.png") + ")" }}
        >
          <h1>Welcome Rocketeer !</h1>
          <div className="Welcome">
            <button onClick={props.f}>Start Questionnaire</button>
            <button onClick={props.s} className="nostyle">
              Submitted Applications
            </button>
          </div>
          <div
            className="rocket"
            style={{
              backgroundImage: "url(./rocketman.png)"
            }}
          ></div>
        </main>
      </div>
    </>
  );
}

function Thankyou(props) {
  const [state, setState] = useState("");
  setTimeout(props.s, 3000);

  const data1 = localStorage.getItem("page-one");
  const data2 = localStorage.getItem("page-two");
  const data3 = localStorage.getItem("page-three");
  const data4 = localStorage.getItem("page-four");
  const dataSet = {
    ...JSON.parse(data1),
    ...JSON.parse(data2),
    ...JSON.parse(data3),
    ...JSON.parse(data4)
  };

  React.useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify(dataSet)
    };

    fetch("https://bootcamp-2022.devtest.ge/api/application", requestOptions)
      .then((response) => response.json())
      .then((data) => setState({ postId: data.id }));
  });
  return (
    <>
      <div className="main_back">
        <main>
          <div className="Welcome">
            <h1>Thanks for Joining 😊</h1>
          </div>
        </main>
      </div>
    </>
  );
}

export { Dots, Welcome, Thankyou };
