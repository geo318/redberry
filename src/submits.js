import React, { useState, useEffect } from "react";

function Submitted(props) {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch(
      "https://bootcamp-2022.devtest.ge/api/applications?token=8fe41587-868f-4abc-8c84-8bb375df1cdd"
    )
      .then((response) => response.json())
      .then((data) => setData(data));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  window.onload = (event) => {
    props.setPage(0)
  };
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch("https://bootcamp-2022.devtest.ge/api/skills")
      .then((response) => response.json())
      .then((data) => setData1(data));
  }, []);

  const looper = (x, propToFind, propLookUp, returnProp) => {
    for (let i = 0; i < x.length; i++) {
      if (x[i][propToFind] === propLookUp) {
        return x[i][returnProp];
      }
    }
  };

  return data.map((e, i) => (
    <div key={i} className="outer-wrap">
      <div>
        <div className="list">{i + 1}</div>
        <div className="content-wrap">
          <div>
            <div>
              <h3>Personal Information</h3>
              <div>
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
              <div>
                <p>how would you prefer to work?</p>
                <div>
                  <input
                    key={`Of${i}`}
                    type="radio"
                    id="office"
                    name="work_preference"
                    checked={e.work_preference === "from_sairme_office"}
                    readOnly
                  />
                  <label htmlFor="office">From Sairme Office</label>
                </div>
                <div>
                  <input
                    key={`Ho${i}`}
                    type="radio"
                    id="Home"
                    name="work_preference"
                    checked={e.work_preference === "from_home"}
                    readOnly
                  />
                  <label htmlFor="home">From Home</label>
                </div>
                <div>
                  <input
                    key={`Hy${i}`}
                    type="radio"
                    id="Hybrid"
                    name="work_preference"
                    checked={e.work_preference === "hybrid"}
                    readOnly
                  />
                  <label htmlFor="Hybrid">Hybrid</label>
                </div>
              </div>
              <div>
                <p>Did you contact covid 19? :(</p>
                <div>
                  <input
                    key={`CT${i}`}
                    type="radio"
                    id="yes"
                    name="had_covid"
                    checked={e.had_covid}
                    readOnly
                  />
                  <label htmlFor="yesC">Yes</label>
                </div>
                <div>
                  <input
                    key={`CF${i}`}
                    type="radio"
                    id="no"
                    name="had_covid"
                    checked={e.had_covid === false}
                    readOnly
                  />
                  <label htmlFor="noC">No</label>
                </div>
                <div>
                  <p>When?</p>
                  <input
                    key={`DC${i}`}
                    type="date"
                    id="dateC"
                    name="had_covid_at"
                    value={e.had_covid_at}
                    readOnly
                  />
                </div>
              </div>
              <div>
                <p>Have you been vaccinated?</p>
                <div>
                  <input
                    key={`Vy${i}`}
                    type="radio"
                    id="yesV"
                    name="vaccinated"
                    checked={e.vaccinated === true}
                    readOnly
                  />
                  <label htmlFor="yesV">yes</label>
                </div>
                <div>
                  <input
                    key={`Vn${i}`}
                    type="radio"
                    id="noV"
                    name="vaccinated"
                    value="false"
                    checked={e.vaccinated === "false"}
                    readOnly
                  />
                  <label htmlFor="noV">no</label>
                </div>
                <div>
                  <p>When did you get your last covid vaccine?</p>
                  <input
                    key={`VD${i}`}
                    type="date"
                    id="dateV"
                    name="vaccinated_at"
                    value={e.vaccinated_at}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
}

function Submit(props) {
  return (
    <div className="main_back">
      <main>
        <div className="Welcome">
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
