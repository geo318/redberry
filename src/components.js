import React, { useState } from "react";
import stars from "./stars.png";
import rocket from "./rocketman.png";

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
  return <div className="dots flx">{dots}</div>;
}

function Welcome(props) {
  return (
    <>
      <div>
        <div className="main_back"/>
        <main className='flx'>
          <div className="back_ground" style={{ backgroundImage: `url(${stars})`}}/>
          <div className='welcome_wrap'>
            <h1>Welcome Rocketeer !</h1>
            <div className="welcome flx">
              <button onClick={props.f}>Start Questionnaire</button>
              <button onClick={props.s} className="nostyle">
                Submitted Applications
              </button>
            </div>
            <div className="rock_wrap">
              <div
                className="rocket"
                style={{
                  backgroundImage: `url(${rocket})`
                }}
              />
            </div>
          </div>
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
        <main className='flx'>
          <div className="welcome flx">
            <h1>Thanks for Joining 😊</h1>
          </div>
        </main>
      </div>
    </>
  );
}

function Input(props) {
  return (
    <div className = {props.cls} style = {props.style}>
      <>
        <input
          id = {props.id}
          type = {props.type}
          placeholder = {props.place}
          value = {props.value}
          name = {props.name}
          onChange = {props.handle}
          checked = {props.checked}
        />
        { props.label? <label htmlFor = {props.id}>{props.label}</label> : null }
        { props.error? <p className="error">{props.error}</p> : null }
      </>
    </div>
  );
}

function Loader() {
  return(
    <div className = 'load_wrap'>
      <svg className = 'loading' viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46"/>
      </svg>
    </div>
  );
}

export { Input, Dots, Welcome, Thankyou, Loader };
