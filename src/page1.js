import React from "react";
import { Input } from "./components.js";

function PageOne(props) {
  const data = props.ObjOne;
  const setData = props.setObjOne;

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setData({
      ...data,
      [name]: value
    });
  };

  React.useEffect(() => {
    const localData = localStorage.getItem("page-one");
    if (localData) {
      setData(JSON.parse(localData));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("page-one", JSON.stringify(data));
  });

  const inpVals = [['text','first_name','First Name'],['text','last_name','Last Name'],['email','email','E Mail'], ['phone','phone','+995 5__ __ __ __']];
  const errors = props.errors;
  const inp_group = inpVals.map((elem,indx) => (
      <Input
        key = {indx}
        type = {elem[0]}
        value = {data[elem[1]]}
        name = {elem[1]}
        place = {elem[2]}
        handle = {e=>{handleChange(e)}}
        error = {errors[elem[1]]}
      />
    )
  );
  return (
    <div className="block-wrap">
      <div className="block-left">
        <h2>Hey, Rocketeer, what are your coordinates?</h2>
        <div className="input-wrap">
          {inp_group}
        </div>
      </div>
      <div className="block-right">
        <h2>Redberry Origins</h2>
        <div className="text-wrap">
          <p>
            You watch “What? Where? When?” Yeah. Our founders used to play it.
            That's where they got a question about a famous American author and
            screenwriter Ray Bradbury. Albeit, our CEO Gaga Darsalia forgot the
            exact name and he answered Ray Redberry. And at that moment, a name
            for a yet to be born company was inspired - Redberry 😇
          </p>
        </div>
      </div>
    </div>
  );
}

export { PageOne };