import "./App.css";
import { Input, Dots, Welcome, Thankyou } from "./components";
import React, { useState, useEffect } from "react";
import { PageOne } from "./page1.js";
import { PageTwo } from "./page2";
import { PageThree } from "./page3";
import { PageFour } from "./page4";

function App() {
  const [startPage, setPage] = useState(0);
  const [placeHold, placeFill] = useState("");

  const pageOneVals = { first_name: "", last_name: "", email: "", phone: "" };
  const [oneFormData, setOneFormData] = useState(pageOneVals);
  const [formError1, setFormError1] = useState({});

  const pageTwoVals = { skills: [{}] };
  const [theArray2, setTheArray2] = useState(pageTwoVals);
  const [formError2, setFormError2] = useState("");

  const pageThreeVals = {
    work_preference: "",
    had_covid: "",
    had_covid_at: "",
    vaccinated: "",
    vaccinated_at: ""
  };
  const [turnThree, setTurnThree] = useState("0");
  const [threeFormData, setThreeFormData] = useState(pageThreeVals);

  const pageFourVals = {
    will_organize_devtalk: "",
    devtalk_topic: "",
    something_special: ""
  };
  const [turnFour, setTurnFour] = useState("0");
  const [fourFormData, setFourFormData] = useState(pageFourVals);

  let x = document.getElementsByClassName("input");

  const ComponentArr = [
    <Welcome />,
    <PageOne
      ObjOne={oneFormData}
      setObjOne={setOneFormData}
      errors={formError1}
    />,
    <PageTwo
      errors={formError2}
      theArray={theArray2}
      setTheArray={setTheArray2}
      setError={setFormError2}
    />,
    <PageThree ObjThree={threeFormData} setObjThree={setThreeFormData} />,
    <PageFour ObjFour={fourFormData} setObjFour={setFourFormData} />,
    <Thankyou />
  ];
  const handleSubmit1 = (e) => {
    setFormError1(validate(oneFormData));
  };

  const handleSubmit2 = (e) => {
    theArray2["skills"].length < 2
      ? setFormError2(isRequried(""))
      : setFormError2("");
  };

  const submitIf = (e) => {
    switch (startPage) {
      case 1:
        handleSubmit1(e);
        break;
      case 2:
        handleSubmit2(e);
        break;
      default:
        e.preventDefault();
    }
  };

  const isRequried = (val) => {
    return `* ${val} is required`;
  };

  const validate = (values) => {
    const errors = {};
    const emailRGX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneRGX = /^(\+995)(\s|-)?(5)(\d{2})(-|\s)?(\d{3})(-|\s)?(\d{3})$/;
    if (!values.first_name) {
      errors.first_name = isRequried("first name");
    } else if (values["first_name"].length < 2) {
      errors.first_name = "* first name should include 2 or more characters";
    }
    if (!values.last_name) {
      errors.last_name = isRequried("last name");
    } else if (values["last_name"].length < 2) {
      errors.last_name = "* last name should include 2 or more characters";
    }
    if (!values.email) {
      errors.email = isRequried("email");
    }

    if (!emailRGX.test(values.email)) {
      errors.email = "* invalid mail format";
    }
    if (!phoneRGX.test(values.phone) && values.phone !== "") {
      errors.phone = "* invalid phone format";
    }
    return errors;
  };

  const isOkThree = () => {
    return Object.entries(threeFormData).every((i) => i[1] !== "")
      ? setTurnThree("1")
      : setTurnThree("0");
  };

  React.useEffect(() => {
    isOkThree();
  });

  const data1 = localStorage.getItem("page-one");
  const data2 = localStorage.getItem("page-two");
  const data3 = localStorage.getItem("page-three");
  const data4 = localStorage.getItem("page-four");
  console.log({
    ...JSON.parse(data1),
    ...JSON.parse(data2),
    ...JSON.parse(data3),
    ...JSON.parse(data4)
  });

  function next() {
    setPage((prev) => {
      if (prev < ComponentArr.length - 1) {
        switch (prev) {
          case 1:
            return Object.values(validate(oneFormData)).length === 0
              ? prev + 1
              : prev;
          case 2:
            return theArray2["skills"].length >= 2 ? prev + 1 : prev;
          case 3:
            return turnThree === "1" ? prev + 1 : prev;
          default:
            return prev + 1;
        }
      } else {
        return prev;
      }
    });
  }

  function prev() {
    setPage((prev) => (prev > 0 ? prev - 1 : prev));
  }

  function clickDot(i) {
    if (i < ComponentArr.length)
      switch (i) {
        case 2:
          return Object.values(validate(oneFormData)).length === 0
            ? setPage(i)
            : setPage(i - 1);
        case 3:
          return theArray2["skills"].length >= 2 ? setPage(i) : setPage(i - 1);
        default:
          return setPage(i);
      }
  }

  const paginator = () => {
    if (startPage !== ComponentArr.length && startPage !== 0) {
      return (
        <div className="page-wrap">
          <div className="pn" onClick={prev}>
            <svg
              width="19"
              height="19"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.9393 15.0607C11.5251 15.6464 12.4749 15.6464 13.0607 15.0607C13.6464 14.4749 13.6464 13.5251 13.0607 12.9393L10.9393 15.0607ZM9 11L7.93934 9.93934C7.35355 10.5251 7.35355 11.4749 7.93934 12.0607L9 11ZM13.0607 9.06066C13.6464 8.47487 13.6464 7.52513 13.0607 6.93934C12.4749 6.35355 11.5251 6.35355 10.9393 6.93934L13.0607 9.06066ZM3.5 11C3.5 6.85786 6.85786 3.5 11 3.5V0.5C5.20101 0.5 0.5 5.20101 0.5 11H3.5ZM11 3.5C15.1421 3.5 18.5 6.85786 18.5 11H21.5C21.5 5.20101 16.799 0.5 11 0.5V3.5ZM18.5 11C18.5 15.1421 15.1421 18.5 11 18.5V21.5C16.799 21.5 21.5 16.799 21.5 11H18.5ZM11 18.5C6.85786 18.5 3.5 15.1421 3.5 11H0.5C0.5 16.799 5.20101 21.5 11 21.5V18.5ZM13.0607 12.9393L10.0607 9.93934L7.93934 12.0607L10.9393 15.0607L13.0607 12.9393ZM10.0607 12.0607L13.0607 9.06066L10.9393 6.93934L7.93934 9.93934L10.0607 12.0607Z"
                fill="#FE3B1F"
              />
            </svg>
          </div>
          <Dots
            f={(i) => {
              clickDot(i);
              handleSubmit2();
              handleSubmit1();
            }}
            len={ComponentArr.length}
            cur={startPage}
          />
          <div
            onClick={(e) => {
              submitIf(e);
              next();
              isOkThree();
            }}
            className="pn"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.0607 6.93934C10.4749 6.35355 9.52513 6.35355 8.93934 6.93934C8.35355 7.52513 8.35355 8.47487 8.93934 9.06066L11.0607 6.93934ZM13 11L14.0607 12.0607C14.6464 11.4749 14.6464 10.5251 14.0607 9.93934L13 11ZM8.93934 12.9393C8.35355 13.5251 8.35355 14.4749 8.93934 15.0607C9.52513 15.6464 10.4749 15.6464 11.0607 15.0607L8.93934 12.9393ZM18.5 11C18.5 15.1421 15.1421 18.5 11 18.5V21.5C16.799 21.5 21.5 16.799 21.5 11H18.5ZM11 18.5C6.85786 18.5 3.5 15.1421 3.5 11H0.5C0.5 16.799 5.20101 21.5 11 21.5V18.5ZM3.5 11C3.5 6.85786 6.85786 3.5 11 3.5V0.5C5.20101 0.5 0.5 5.20101 0.5 11H3.5ZM11 3.5C15.1421 3.5 18.5 6.85786 18.5 11H21.5C21.5 5.20101 16.799 0.5 11 0.5V3.5ZM8.93934 9.06066L11.9393 12.0607L14.0607 9.93934L11.0607 6.93934L8.93934 9.06066ZM11.9393 9.93934L8.93934 12.9393L11.0607 15.0607L14.0607 12.0607L11.9393 9.93934Z"
                fill="#FE3B1F"
              />
            </svg>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="main">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <>
            <>{ComponentArr[startPage]}</>
            {paginator()}
          </>
        </form>
      </div>
    </div>
  );
}

export default App;
