import './App.css';
import {Input, Dots, Welcome, Thankyou} from './components'
import React, {useState,useEffect} from "react";
import {PageOne} from './page1.js'
import {PageTwo} from './page2'
import {PageThree} from './page3'
import {PageFour} from './page4'

function App() {
  const [startPage, setPage] = useState(0);
  const [placeHold, placeFill] = useState("");

  const pageOneVals = {first_name: "",last_name: "",email: "",phone: ""};
  const [oneFormData, setOneFormData] = useState(pageOneVals);
  const [formError1, setFormError1] = useState({});

  const pageTwoVals = {skills: [{}]}
  const [theArray2, setTheArray2] = useState(pageTwoVals);
  const [formError2, setFormError2] = useState("");
  
  const pageThreeVals = {work_preference: "",had_covid: "",had_covid_at: "",vaccinated: "",vaccinated_at: ""};
  const [turnThree, setTurnThree] = useState("0");
  const [threeFormData, setThreeFormData] = useState(pageThreeVals);

  const pageFourVals = {will_organize_devtalk: "",devtalk_topic: "",something_special: ""};
  const [turnFour, setTurnFour] = useState("0");
  const [fourFormData, setFourFormData] = useState(pageFourVals);

  let x = document.getElementsByClassName('input');

  const ComponentArr = [
    <Welcome />,
    <PageOne ObjOne = {oneFormData} setObjOne = {setOneFormData} errors = {formError1}/>,
    <PageTwo errors = {formError2} theArray = {theArray2} setTheArray = {setTheArray2} setError = {setFormError2}/>,
    <PageThree ObjThree={threeFormData} setObjThree={setThreeFormData}/>,
    <PageFour ObjFour={fourFormData} setObjFour={setFourFormData}/>,
    <Thankyou />
  ];
  const handleSubmit1 = (e) => {
    setFormError1(validate(oneFormData));
  }

  const handleSubmit2 = (e) => {
    theArray2['skills'].length < 2
    ? setFormError2(isRequried(""))
    : setFormError2("")
  }

  const submitIf = (e) => {
    switch(startPage){
      case 1:
        handleSubmit1(e);
        break;
      case 2:
        handleSubmit2(e);
        break;
      default:
        e.preventDefault();
    }
  }
  
  const isRequried = (val) => {
      return `* ${val} is required`;
  }

  const validate = (values) => {
    const errors = {};
    const emailRGX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneRGX = /^(\+995)(\s|-)?(5)(\d{2})(-|\s)?(\d{3})(-|\s)?(\d{3})$/;
    if(!values.first_name) {
      errors.first_name = isRequried("first name");
    } else if(values['first_name'].length < 2) {
      errors.first_name = '* first name should include 2 or more characters'
    }
    if(!values.last_name) {
      errors.last_name = isRequried("last name");
    } else if(values['last_name'].length < 2) {
      errors.last_name = '* last name should include 2 or more characters'
    }
    if(!values.email) {
      errors.email = isRequried("email");
    }
    
    if(!emailRGX.test(values.email)) {
      errors.email = '* invalid mail format'
    }
    if(!phoneRGX.test(values.phone) && values.phone !== "") {
      errors.phone = '* invalid phone format'
    }
    return errors;
  }

  const isOkThree = () => {
    return Object.entries(threeFormData).every(i => i[1] !== "")
    ? setTurnThree("1")
    : setTurnThree("0")
  }

  React.useEffect(()=>{
    isOkThree()
  })

  const data1 = localStorage.getItem('page-one');
  const data2 = localStorage.getItem('page-two');
  const data3 = localStorage.getItem('page-three');
  const data4 = localStorage.getItem('page-four');
  console.log({...JSON.parse(data1),...JSON.parse(data2),...JSON.parse(data3),...JSON.parse(data4)})

  function next() {
    setPage(prev => {
        if(prev < ComponentArr.length - 1) {
          switch(prev) {
            case 1:
              return Object.values(validate(oneFormData)).length === 0
              ? prev + 1
              : prev
            case 2:
              return theArray2['skills'].length >= 2
              ? prev + 1
              : prev
            case 3:
              return turnThree === "1"
              ? prev + 1
              : prev
            default:
              return prev + 1
          }
        } else {
          return prev
        }
      }
    )
  }


  function prev() {
    setPage(prev => prev > 0? prev - 1 : prev);
  }
  
  function clickDot(i) {
    if(i < ComponentArr.length)
    switch(i) {
      case 2:
        return Object.values(validate(oneFormData)).length === 0
        ? setPage(i)
        : setPage(i-1)
      case 3:
        return theArray2['skills'].length >= 2
        ? setPage(i)
        : setPage(i-1)
      default:
        return setPage(i)
    }
  }

  return (
    <>
      <div className = "App" >
        <>{ComponentArr[startPage]}</>
      </div>
      <form onSubmit = {(e) => {e.preventDefault()}}>
        <button onClick = {prev} >prev</button>
        <Dots
          f = {i => {clickDot(i);handleSubmit2();handleSubmit1()}} 
          len={ComponentArr.length}
        />
        <button onClick = {(e) => {submitIf(e);next();isOkThree();}} id="next">next</button>
      </form>
    </>
  );
}


// function PageSet(props) {
//   return (
//     <div className = "PageSet">
//       <p>
//         <code>middle page!</code>
//       </p>
//       <Input place = "First Name" check = {2} r = {'required'} set={props.placeFill} val = {props.val}/>
//       <Input place = "Last Name" check = {2} r = {'required'} set={props.placeFill} val = {props.val} />
//       <Input place = "E Mail" check = {emailRGX} r = {'required'} set={props.placeFill} val = {props.val}/>
//       <Input place = "+995 5__ __ __ __" check = {phoneRGX} set={props.placeFill} val = {props.val}/>
//     </div>
//   );
// }

export default App;
