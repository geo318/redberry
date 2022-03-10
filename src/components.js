import React, { useState, useEffect } from "react";
const error_num = "should include 3 or more characters";
const error_mail = "unvalid Email";
const error_number = "unvalid number";

function Input(props) {
  const [placeHold, placeFill] = useState("");
  const [error, errorToggle] = useState("");
  const errors = [error_num, error_num, error_mail, error_number];

  const errorSet = () => {
    return errorToggle((error) =>
      control(props.check) !== "ok" ? (error = "error") : ""
    );
  };
  const changeControl = (e) => {
    placeFill(e.target.value);
    //localStorage.setItem("inputValue", e.target.value);
  };
  function control(x) {
    let len = placeHold.split("");
    if (x >= 0) {
      return len.length < x && len.length > 0
        ? "less"
        : len.length === 0
        ? "empty"
        : "ok";
    } else if (x instanceof RegExp) {
      return x.test(placeHold) ? "ok" : "empty";
    }
  }

  document.getElementById("next").addEventListener("click", () => errorSet());
  document.getElementById("1").addEventListener("click", () => errorSet());
  let name = props.place;
  return (
    <div className="input_group">
      <input
        placeholder={name}
        value={placeHold}
        name={name.replace(" ", "_")}
        onFocus={(e) => {
          errorSet();
        }}
        onChange={(e) => {
          changeControl(e);
          errorSet();
        }}
        onBlur={(e) => {
          changeControl(e);
          errorSet();
        }}
        className={`input ${control(props.check)}`}
        required={props.r}
      />
      <div className="error">{error}</div>
    </div>
  );
}

function Dots(props) {
  let len = props.cur;
  let dots = [];
  for (let i = 0; i < props.len - 4; i++) {
    dots.push(
      <button
        className={`dot ${len > i ? "complete" : ""}`}
        id={i}
        key={i}
        onClick={() => props.f(i)}
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
              backgroundImage: "url(" + require("./rocketman.png") + ")"
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

export { Dots, Welcome, Thankyou, Input };
