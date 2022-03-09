import React, {useEffect} from "react";

function PageThree(props) {
    const threeFormData = props.ObjThree;
    const setThreeFormData = props.setObjThree;

    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setThreeFormData({
            ...threeFormData,
            [name] : value
        });
    }

    
    React.useEffect(()=>{
        const data = localStorage.getItem('page-three');
        if(data) {
            setThreeFormData(JSON.parse(data));
        }
    }, []);

    React.useEffect(()=>{
        localStorage.setItem('page-three',JSON.stringify(threeFormData))
    })


//   "first_name": "gela",
//   "last_name": "gelashvili",
//   "email": "gelashvili@gela.ge",
//   "phone": "+995591933382",
//   "skills": [
//     {
//       "id": 1,
//       "experience": 3
//     }
//   ],
//   "work_preference": "from_home",
//   "had_covid": true,
//   "had_covid_at": "2022-02-23",
//   "vaccinated": true,
//   "vaccinated_at": "2022-02-23",
//   "will_organize_devtalk": true,
//   "devtalk_topic": "I would ...",
//   "something_special": "I am special!"


    return (
        <>
            <h2>Covid Stuff</h2>
            <div>
                <p>how would you prefer to work?</p>
                <div>
                    <input type="radio" id="office" name="work_preference" value="From_Sairme_Office" onChange = {handleChange} checked = {threeFormData.work_preference === "From_Sairme_Office"}/>
                    <label htmlFor="office">From Sairme Office</label>
                </div>
                <div>
                    <input type="radio" id="Home" name="work_preference" value="From_Home" onChange = {handleChange} checked = {threeFormData.work_preference === "From_Home"}/>
                    <label htmlFor="home">From Home</label>
                </div>
                <div>
                    <input type="radio" id="Hybrid" name="work_preference" value="Hybrid" onChange = {handleChange} checked = {threeFormData.work_preference ==="Hybrid"}/>
                    <label htmlFor="Hybrid">Hybrid</label>
                </div>
            </div>
            <div>
                <p>Did you contact covid 19? :(</p>
                <div>
                    <input type="radio" id="yes" name="had_covid" value="true" onChange = {handleChange} checked = {threeFormData.had_covid === "true"}/>
                    <label htmlFor="yesC">Yes</label>
                </div>
                <div>
                    <input type="radio" id="no" name="had_covid" value="false" onChange = {handleChange} checked = {threeFormData.had_covid === "false"}/>
                    <label htmlFor="noC">No</label>
                </div>
                <div>
                    <p>When?</p>
                    <input type="date" id="dateC" name="had_covid_at" value = {threeFormData.had_covid_at} onChange = {handleChange}/>
                </div>
            </div>
            <div>
                <p>Have you been vaccinated?</p>
                <div>
                    <input type="radio" id="yesV" name="vaccinated" value="true" onChange = {handleChange} checked = {threeFormData.vaccinated === "true"}/>
                    <label htmlFor="yesV">yes</label>
                </div>
                <div>
                    <input type="radio" id="noV" name="vaccinated" value="false" onChange = {handleChange} checked = {threeFormData.vaccinated === "false"}/>
                    <label htmlFor="noV">no</label>
                </div>
                <div>
                    <p>When did you get your last covid vaccine?</p>
                    <input type="date" id="dateV" name="vaccinated_at" value = {threeFormData.vaccinated_at} onChange = {handleChange}/>
                </div>
            </div>
        </>
    );

}




export {PageThree}