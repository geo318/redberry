import React, { useState, useEffect } from "react";
import { Loader } from "./components.js";

let dataSets;
  fetch("https://bootcamp-2022.devtest.ge/api/applications?token=8fe41587-868f-4abc-8c84-8bb375df1cdd")
  .then((response) => response.json())
  .then((data) => dataSets = data)
  .then(() => console.log(dataSets))

function Submitted(props) {
  const [data, setData] = useState(dataSets);
  const [data1, setData1] = useState([]);

  let displaySet = {};
  for (var x = 0; x < dataSets.length; x++) {
    displaySet[x] = {display: 'none'};
  }

  const getSkillSet = async () => {
    await fetch("https://bootcamp-2022.devtest.ge/api/skills")
    .then((response) => response.json())
    .then((data) => setData1(data));
  }

  useEffect(() => {
    getSkillSet();
  }, []);

  const looper = (x, propToFind, propLookUp, returnProp) => {
    for (let i = 0; i < x.length; i++) {
      if (x[i][propToFind] === propLookUp) {
        return x[i][returnProp];
      }
    }
  };

  const [Display, setDisplay] = useState(displaySet);
  const menux = (e) => {
    let val = Display[e.target.name];
    let toggle;
    val.display === 'none' ? toggle = 'block' : toggle = 'none';
    setDisplay({
      ...Display,
      [e.target.name]: {display : toggle}
    })
  };
  const dataSet = data.map((e, i) => (
      <div key={i} className="outer-wrap">
        <div>
          <input className="list" onClick = {e=>menux(e)} name = {i} value={i + 1} readOnly/>
          <div className="content-wrap" style={Display[i]}>
            <div>
              <div>
                <h3>Personal Information</h3>
                <div className='rad'>
                  <p>
                    <span>First Name</span>
                    <span key={`f${i}`}>{e.first_name}</span>
                  </p>
                  <p>
                    <span>Last Name</span>
                    <span key={`l${i}`}>{e.last_name}</span>
                  </p>
                  <p>
                    <span>E Mail</span>
                    <span key={`e${i}`}>{e.email}</span>
                  </p>
                  <p>
                    <span>Phone</span>
                    <span key={`p${i}`}>{e.phone}</span>
                  </p>
                </div>
              </div>
              <div>
                <h3>Skillset</h3>
                {e["skills"].map((e, i) => (
                  <div key={i}>
                    <p>
                      <span key={`t${i}`}>
                        {looper(data1, "id", e["id"], "title")}
                      </span>
                      <span key={`x${i}`}>
                        Years of Experience: {e.experience}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div>
                <h3>Covid Stuff</h3>
                <div className='rad'>
                  <p>how would you prefer to work?</p>
                  <div>
                    <input key={`Of${i}`} type="radio" checked={e.work_preference === "from_sairme_office"} readOnly/>
                    <label>From Sairme Office</label>
                  </div>
                  <div>
                    <input key={`Of${i}`} type="radio" checked={e.work_preference === "from_home"} readOnly/>
                    <label>From Home</label>
                  </div>
                  <div>
                    <input key={`Of${i}`} type="radio" checked={e.work_preference === "hybrid"} readOnly/>
                    <label>Hybrid</label>
                  </div>
                </div>
                <div className='rad'>
                  <p>Did you contact covid 19? :(</p>
                  <div>
                    <input key={`Of${i}`} type="radio" checked={e.had_covid} readOnly/>
                    <label>Yes</label>
                  </div>
                  <div>
                    <input key={`Of${i}`} type="radio" checked={e.had_covid === false} readOnly/>
                    <label>No</label>
                  </div>
                </div>
                <div>
                  <p>When?</p>
                  <input key={`DC${i}`} type="date" value={e.had_covid_at} readOnly/>
                </div>
                <div className='rad'>
                  <p>Have you been vaccinated?</p>
                  <div>
                    <input key={`Vy${i}`} type="radio" checked={e.vaccinated === true} readOnly/>
                    <label>yes</label>
                  </div>
                  <div>
                    <input key={`Vn${i}`} type="radio" checked={e.vaccinated === "false"} readOnly/>
                    <label>no</label>
                  </div>
                </div>
                <div>
                  <p>When did you get your last covid vaccine?</p>
                  <input key={`VD${i}`} type="date" value={e.vaccinated_at} readOnly/>
                </div>
              </div>
              <div>
                <h3>Insights</h3>
                <div className='rad'>
                  <p>Would you attend Devtalks and maybe also organize your own?</p>
                  <div>
                    <input key={`Vyd${i}`} type="radio" checked={e.will_organize_devtalk} readOnly/>
                    <label>yes</label>
                  </div>
                  <div>
                    <input key={`Vnd${i}`} type="radio" checked={e.will_organize_devtalk === false} readOnly/>
                    <label>no</label>
                  </div>
                </div>
                <div>
                  <p>What would you speak about at Devtalk?</p>
                  <textarea key={`VDd${i}`} value={e.devtalk_topic} readOnly/>
                </div>
                <div>
                  <p>Tell us somthing special</p>
                  <textarea key={`VD2d${i}`} value={e.something_special} readOnly/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  return (
    <div className='submits'>
      <h2>Submitted Applications</h2>
      {data.length > 0? dataSet : <Loader/>}
    </div>
  );
}

function Submit(props) {
  return (
    <div>
      <div className="main_back"/>
      <main className="flx">
        <div className="welcome flx">
          <button onClick={props.n}>Submit</button>
          <button onClick={props.p} className="nostyle">
            Go Back
          </button>
        </div>
      </main>
    </div>
  );
}

export { Submit, Submitted };