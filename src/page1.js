import React, {useEffect} from "react";  

function PageOne(props) {

    const oneFormData = props.ObjOne;
    const setOneFormData = props.setObjOne;

    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setOneFormData({
            ...oneFormData,
            [name] : value
        });
    }

    React.useEffect(()=>{
        const data = localStorage.getItem('page-one');
        if(data) {
            setOneFormData(JSON.parse(data));
        }
    }, []);

    React.useEffect(()=>{
        localStorage.setItem('page-one',JSON.stringify(oneFormData))
    })

    const errors = props.errors;
    return (
        <>
            <h2>Hey, Rocketeer, what are your coordinates?</h2>
            <div>
                <div>
                    <>
                    <input type = "text" placeholder="First Name" value = {oneFormData.first_name} name = "first_name" onChange={handleChange}/>
                    <p>{errors.first_name}</p>
                    </>
                </div>
                <div>
                    <>
                    <input type = "text" placeholder="Last Name" value = {oneFormData.last_name} name = "last_name" onChange={handleChange}/>
                    <p>{errors.last_name}</p>
                    </>
                </div>
                <div>
                    <>
                    <input type = "email" placeholder="E Mail" value = {oneFormData.email} name = "email" onChange={handleChange}/>
                    <p>{errors.email}</p>
                    </>
                </div>
                <div>
                    <>
                    <input type = "phone" placeholder="+995 5__ __ __ __" value = {oneFormData.phone} name = "phone" onChange={handleChange}/>
                    <p>{errors.phone}</p>
                    </>
                </div>
            </div>
        </>
    );
  }

  export {PageOne}