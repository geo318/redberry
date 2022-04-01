import React, { useState } from "react";
import { Input } from "./components.js";

function PageThree(props) {
  const threeFormData = props.ObjThree;
  const setThreeFormData = props.setObjThree;

  const DisplayVals = {
    had_covid : {display: "none"},
    vaccinated : {display: "none"}
  }

  const [Display, setDisplay] = useState(DisplayVals);

  const menux = (e) => {
    let show;
    e.target.value === 'true' ? show = 'block' : show = 'none';
    setDisplay({
      ...Display,
      [e.target.name]: {display : show}
    })
  };

  const handleChange = (e) => {
    setThreeFormData({
      ...threeFormData,
      [e.target.name]: e.target.value
    });
  };

  React.useEffect(() => {
    const data = localStorage.getItem("page-three");
    const data1 = localStorage.getItem("page-three-1");
    if (data) {
      setThreeFormData(JSON.parse(data));
      console.log(JSON.parse(data));
    }
    if (data1) {
      setDisplay(JSON.parse(data1));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("page-three", JSON.stringify(threeFormData));
    localStorage.setItem("page-three-1", JSON.stringify(Display));
  });

  const inpVals = [
    ['radio','work_preference',['From_Sairme_Office','From_Home','Hybrid'],'how would you prefer to work?','lb'],
    ['radio','had_covid',['true','false'],'Did you contact covid 19? :(','lb'],
    ['date','had_covid_at',['had_covid_at'],'When?',Display.had_covid],
    ['radio','vaccinated',['true','false'],'Have you been vaccinated?','lb'],
    ['date','vaccinated_at',['vaccinated_at'],'When did you get your last covid vaccine?',Display.vaccinated]
  ];

  const inp_group = inpVals.map((elem,indx) => (
    <div>
      {typeof elem[3] === 'string' ? <p>{elem[3]}</p> : null}
      {
        elem[2].map((val,i) => {
          return (
            <Input 
              keys = {indx + i}
              id = {`${val}`}
              type = {elem[0]}
              cls = {elem[0]}
              value = {elem[0] === 'radio'? val : threeFormData[elem[1]]}
              name = {elem[1]}
              handle = {(e)=>{elem[2][0] === 'true' ? handleChange(e) : handleChange(e); menux(e);}}
              label = {elem[4] ? val === 'true' ? 'Yes' : val === 'false' ? 'No' : elem[0] === 'radio' ? `${val}` : null : null}
              checked = {elem[0] === 'radio' ? threeFormData[elem[1]] === val : null}
              style = {elem[0] === 'date' ? elem[4] : null}
            />
          )
        })
      }
    </div>
  ));

  return (
    <>
      <div className="block-wrap">
        <div className="block-left">
          <div className="radio-wrap">
            <h2>Covid Stuff</h2>
            {inp_group}
          </div>
        </div>
        <div className="block-right">
          <h2>Redberry Covid Policies</h2>
          <div className="text-wrap">
            <p>
              As this infamous pandemic took over the world, we adjusted our
              working practices so that our employees can be as safe and
              comfortable as possible. We have a hybrid work environment, so you
              can either work from home or visit our lovely office on Sairme
              Street. If it was up to us, we would love you to see us in the
              office because we think face-to-face communications > Zoom
              meetings. Both on the fun and productivity scales.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export { PageThree };
