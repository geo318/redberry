import React, { useState } from "react";
import { Input } from "./components.js";

function PageFour(props) {
  const data = props.ObjFour;
  const setData = props.setObjFour;
  const DisplayVals = {
    devtalk_topic : {display: "none"}
  }
  const [Display, setDisplay] = useState(DisplayVals);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  React.useEffect(() => {
    const localData = localStorage.getItem("page-Four");
    const localData1 = localStorage.getItem("page-Four-1");
    if (localData) {
      setData(JSON.parse(localData));
    }
    if (localData1) {
      setDisplay(JSON.parse(localData1));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("page-Four", JSON.stringify(data));
    localStorage.setItem("page-Four-1", JSON.stringify(Display));
  });

  const menux = (e) => {
    let toggle;
    e.target.value === 'true' ? toggle = 'block' : e.target.value === 'false' ? toggle = 'none' : toggle = null;
    setDisplay({
      devtalk_topic: {display : toggle}
    })
  };

  const inpVals = [
    [['input','radio'],'will_organize_devtalk',[true,false],'Would you attend Devtalks and maybe also organize your own?','lb'],
    [['textarea','func'],'devtalk_topic',['devtalk_topic'],'What would you speak about at Devtalk?','I would...', Display.devtalk_topic],
    [['textarea'],'something_special',['something_special'],'Tell us something special','I...']
  ];

  const inp_group = inpVals.map((elem,indx,arr) => (
    <div key = {indx+'div'}>
      { typeof elem[3] === 'string' ? <p key = {'p' + indx} style = {elem[0] === 'date' ? elem[4] : null}>{elem[3]}</p> : null }
      { elem[2].map((val,i) => {
        return (
          <Input
            render = {elem[0][0]}
            key = {indx + i + 'rend'}
            id = {`${val}`}
            type = {elem[0][1]}
            cls = {elem[0][1]}
            value = {elem[0][1] === 'radio'? val : data[elem[1]]}
            name = {elem[1]}
            place = {elem[4]}
            handle = {(e)=>{elem[2][0] !== true ? handleChange(e) : handleChange(e); menux(e);}}
            label = {elem[4] ? val === true ? 'Yes' : val === false ? 'No' : elem[0] === 'radio' ? `${val}` : null : null}
            checked = {elem[0] === 'radio' ? typeof elem[2][0] === 'boolean' ? JSON.parse(data[elem[1]]) === val : data[elem[1]] === val : null}
            style = {elem[0][1] === 'func' ? elem[5] : null}
            isReadOnly = {false}
          />
        )})
      }
    </div>
  ));

  return (
    <>
      <div className="block-wrap">
        <div className="block-left">
          <h2>What about you?</h2>
          <div className="radio-wrap none">
            {inp_group}
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
