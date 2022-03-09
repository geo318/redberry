import { useState } from "react";

const error_num = "should include 3 or more characters";
const error_mail = "unvalid Email";
const error_number = "unvalid number";

function Input(props) {
    const [placeHold,placeFill] = useState("");
    const [error,errorToggle] = useState("");
    const errors = [error_num,error_num,error_mail,error_number];

    const errorSet = () => {
        return errorToggle((error)=> control(props.check) !== "ok"
        ? error = "error"
        : ""
        )
    }
    const changeControl = (e) => {
      placeFill(e.target.value)
      //localStorage.setItem("inputValue", e.target.value);
    }
    function control(x) {
      let len = placeHold.split("");    
      if(x >= 0) {
        return len.length < x && len.length > 0
        ? "less"
        : len.length === 0 
        ? "empty"
        : "ok"
      } else if(x instanceof RegExp){
          return x.test(placeHold)
          ? "ok"
          : "empty"
      }
    }
    
    document.getElementById('next').addEventListener('click',() => errorSet())
    document.getElementById('1').addEventListener('click',() => errorSet())
    let name = props.place;
    return (
      <div className = "input_group">
        <input 
          placeholder = {name} 
          value = {placeHold}
          name = {name.replace(" ","_")}
          onFocus = {(e) => {errorSet()}}
          onChange = {(e) => {changeControl(e); errorSet()}}
          onBlur = {(e) => {changeControl(e); errorSet()}}
          className = {`input ${control(props.check)}`}
          required = {props.r}
        />
        <div
          className ="error">{error}</div>
      </div>
    );
    
  }

function Dots(props) {
    let dots = [];
    for(let i = 0; i < props.len; i++) {
      dots.push(<button id = {i} key = {i}
         onClick = {() => props.f(i)} >{i + 1}</button>)
    }
    return (
      <div className = "dots">
        {dots}
      </div>
    );
  }
  
  function Welcome() {
    return (
        <>
            <h1>Welcome Rocketeer !</h1>
            <div className = "Welcome">
                <code>Hooray!</code>
            </div>
        </>
    );
  }

  
function Thankyou() {
    return (
        <>
            <h2>Thanks for Joining 😊</h2>
            <div className = "thankyou">
                <p>
                    <code>thanks!</code>
                </p>
            </div>
        </>
    );
  }

export {Dots, Welcome, Thankyou, Input}