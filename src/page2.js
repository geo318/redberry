import React, { useState, useEffect } from "react";
import { Input } from "./components.js";

const block = { display: "block" };
const none = { display: "none" };
const slct = "select one";

function PageTwo(props) {
  const [data, setData] = useState([]);
  const [Display, setDisplay] = useState(none);
  const [val, setVal] = useState("");
  const [valx, setValx] = useState({ experience: "" });
  const [value, setValue] = useState(slct);

  const theArray = props.theArray;
  const setTheArray = props.setTheArray;
  const skillsAr = theArray.skills;
  let skillsArr = [...theArray["skills"]].splice(0, skillsAr.length - 1);

  React.useEffect(() => {
    const data = localStorage.getItem("page-two");
    if (data) {
      setTheArray(JSON.parse(data));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("page-two", JSON.stringify(theArray));
    if (theArray["skills"].length >= 2) {
      props.setError("");
    }
  });

  const getData = () => {
    fetch("https://bootcamp-2022.devtest.ge/api/skills")
      .then((response) => response.json())
      .then((Json) => {
        setData(Json);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const menux = () => {
    if (Display.display === none.display) {
      return setDisplay((Display) => {
        return (Display = block);
      });
    } else {
      return setDisplay((Display) => {
        return (Display = none);
      });
    }
  };
  const selectIt = (e) => {
    setVal({ id: e.target.id * 1 });
    setValue(e.target.value);
  };

  const closeIt = () => {
    return setDisplay((Display) => {
      return (Display = none);
    });
  };

  const looper = (x, propToFind, propLookUp, returnProp) => {
    for (let i = 0; i < x.length; i++) {
      if (x[i][propToFind] === propLookUp) {
        return x[i][returnProp];
      }
    }
  };

  function setXp() {
    if (
      valx.experience > 0 &&
      value !== slct &&
      skillsAr.every((i) => i["id"] !== val.id)
    ) {
      props.setTheArray((prev) => ({
        skills: [{ ...val, ...valx }, ...prev.skills]
      }));
      setValx({ experience: "" });
      setValue(slct);
    }
  }

  const vals = [
    skillsArr.map((e, i) => (
      <div className="skillsSelected" key={i}>
        <div key={`v${i}`}>{looper(data, "id", e["id"], "title")}</div>
        <div key={`i${i}`}>{"Years of Experience: " + e["experience"]}</div>
        <div
          key={`r${i}`}
          onClick={() => {
            setTheArray({
              skills: [
                ...theArray["skills"]
                  .slice(0, i)
                  .concat(theArray["skills"].slice(i + 1))
              ]
            });
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C19.9939 15.5203 15.5203 19.9939 10 20ZM2 10.172C2.04732 14.5732 5.64111 18.1095 10.0425 18.086C14.444 18.0622 17.9995 14.4875 17.9995 10.086C17.9995 5.68451 14.444 2.10977 10.0425 2.086C5.64111 2.06246 2.04732 5.59876 2 10V10.172ZM15 11H5V9H15V11Z" fill="#EB3535"/></svg>
        </div>
      </div>
    ))
  ];

  const errors = props.errors;
  return (
    <>
      <div className="block-wrap">
        <div className="block-left">
          <h2>Tell us about your skills</h2>
          <div className="skillset">
            <div className="dropIt">
              <input
                type="text"
                name="select"
                value={value}
                readOnly
                onClick={menux}
              />
              <div style={Display} className="drop">
                <div>
                  {data.map((item) => (
                    <div key={item.id}>
                      <input
                        key={`i${item.id}`}
                        id={item.id}
                        onClick={(e) => {selectIt(e); closeIt();}}
                        value={item.title}
                        readOnly
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Input type = {'text'} place = {'experience'} value = {valx.experience} name = {'Experience Duration in Years'} handle = {(e) => setValx({ experience: e.target.value })}/>
            <button onClick={() => {setXp();}}>Add Programming Language</button>
            <p className="error">{errors}</p>
            <>{vals}</>
          </div>
        </div>
        <div className="block-right">
          <h2>A bit about our battles</h2>
          <div className="text-wrap">
            <p>
              As we said, Redberry has been on the field for quite some time
              now, and we have touched and embraced a variety of programming
              languages, technologies, philosophies, and frameworks. We are
              battle-tested in PHP Laravel Stack with Vue.js, refined in React,
              and allies with Serverside technologies like Docker and
              Kubernetes, and now we have set foot in the web3 industry.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export { PageTwo };
