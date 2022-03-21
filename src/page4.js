import React, { useState } from "react";

const block = { display: "block" };
const none = { display: "none" };

function PageFour(props) {
  const [Display, setDisplay] = useState(none);

  const fourFormData = props.ObjFour;
  const setFourFormData = props.setObjFour;

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setFourFormData({
      ...fourFormData,
      [name]: value
    });
  };

  React.useEffect(() => {
    console.log(fourFormData);
    const data4 = localStorage.getItem("page-Four");
    const data = localStorage.getItem("page-Four-1");
    if (data4) {
      setFourFormData(JSON.parse(data4));
    }
    if (data4) {
      setDisplay(JSON.parse(data));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("page-Four", JSON.stringify(fourFormData));
    localStorage.setItem("page-Four-1", JSON.stringify(Display));
  });

  const menux = (e) => {
    return e.target.value === "true" ? setDisplay(block) : setDisplay(none);
  };

  return (
    <>
      <div className="block-wrap">
        <div className="block-left">
          <h2>What about you?</h2>
          <div className="radio-wrap none">
            <p>Would you attend Devtalks and maybe also organize your own?</p>
            <div className="radio">
              <input
                type="radio"
                id="yes"
                name="will_organize_devtalk"
                value="true"
                onChange={(e) => {
                  handleChange(e);
                  menux(e);
                }}
                checked={fourFormData.will_organize_devtalk === "true"}
              />
              <label htmlFor="yes">Yes</label>
            </div>
            <div className="radio">
              <input
                type="radio"
                id="no"
                name="will_organize_devtalk"
                value="false"
                onChange={(e) => {
                  handleChange(e);
                  menux(e);
                }}
                checked={fourFormData.will_organize_devtalk === "false"}
              />
              <label htmlFor="no">No</label>
            </div>
          </div>
          <div>
            <div className="radio-wrap none" style={Display}>
              <p>What would you speak about at Devtalk?</p>
              <textarea
                placeholder="I would..."
                name="devtalk_topic"
                value={fourFormData.devtalk_topic}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div className="radio-wrap none">
              <p>Tell us something special</p>
              <textarea
                placeholder="I..."
                name="something_special"
                value={fourFormData.something_special}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="block-right">
          <h2>Redberrian Insights</h2>
          <div className="text-wrap">
            <p>
              We were soo much fun before the pandemic started! Parties almost
              every weekend and lavish employee birthday celebrations!
              Unfortunately, covid ruined that fun like it did almost everything
              else in the world. But we try our best to zhuzh it up a bit. For
              example, we host biweekly Devtalks where our senior and lead
              developers talk about topics they are passionate about. Previous
              topics have included Web3, NFT, Laravel 9, Kubernetes, etc. We
              hold these talks in the office but you can join our Zoom broadcast
              as well. Feel free to join either as an attendee or a speaker!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export { PageFour };
