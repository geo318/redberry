import React, { useState, useEffect } from "react";

function Submitted() {
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

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch("https://bootcamp-2022.devtest.ge/api/skills")
      .then((response) => response.json())
      .then((data) => setData1(data));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  const looper = (x, propToFind, propLookUp, returnProp) => {
    for (let i = 0; i < x.length; i++) {
      if (x[i][propToFind] === propLookUp) {
        return x[i][returnProp];
      }
    }
  };

  return data.map((e, i) => (
    <div>
      {i + 1}
      {console.log(data)}
      <div>
        <div>
          <h3>Personal Information</h3>
          <div>
            <p>
              <div>First Name</div>
              <div>{e.first_name}</div>
            </p>
            <p>
              <div>Last Name</div>
              <div>{e.last_name}</div>
            </p>
            <p>
              <div>E Mail</div>
              <div>{e.email}</div>
            </p>
            <p>
              <div>Phone</div>
              <div>{e.first_name}</div>
            </p>
          </div>
        </div>
        <div>
          <h3>Skillset</h3>
          {e["skills"].map((e, i) => (
            <div>
              <p>
                <div>{looper(data1, "id", e["id"], "title")}</div>
                <div>Years of Experience: {e.experience}</div>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Covid Stuff</h2>
        <div>
          <p>how would you prefer to work?</p>
          <div>
            <input
              type="radio"
              id="office"
              name="work_preference"
              checked={e.work_preference === "From_Sairme_Office"}
            />
            <label htmlFor="office">From Sairme Office</label>
          </div>
          <div>
            <input
              type="radio"
              id="Home"
              name="work_preference"
              checked={e.work_preference === "From_Home"}
            />
            <label htmlFor="home">From Home</label>
          </div>
          <div>
            <input
              type="radio"
              id="Hybrid"
              name="work_preference"
              checked={e.work_preference === "Hybrid"}
            />
            <label htmlFor="Hybrid">Hybrid</label>
          </div>
        </div>
        <div>
          <p>Did you contact covid 19? :(</p>
          <div>
            <input
              type="radio"
              id="yes"
              name="had_covid"
              value="true"
              checked={e.had_covid === "true"}
            />
            <label htmlFor="yesC">Yes</label>
          </div>
          <div>
            <input
              type="radio"
              id="no"
              name="had_covid"
              value={e.had_covid}
              checked={e.had_covid === "false"}
            />
            <label htmlFor="noC">No</label>
          </div>
          <div>
            <p>When?</p>
            <input
              type="date"
              id="dateC"
              name="had_covid_at"
              value={e.had_covid_at}
            />
          </div>
        </div>
        <div>
          <p>Have you been vaccinated?</p>
          <div>
            <input
              type="radio"
              id="yesV"
              name="vaccinated"
              value="true"
              checked={e.vaccinated === "true"}
            />
            <label htmlFor="yesV">yes</label>
          </div>
          <div>
            <input
              type="radio"
              id="noV"
              name="vaccinated"
              value="false"
              checked={e.vaccinated === "false"}
            />
            <label htmlFor="noV">no</label>
          </div>
          <div>
            <p>When did you get your last covid vaccine?</p>
            <input
              type="date"
              id="dateV"
              name="vaccinated_at"
              value={e.vaccinated_at}
            />
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
