import React, { useState, useEffect} from "react";

const block = {display:'block'}
const none = {display:'none'}
const slct = 'select one';

function PageTwo(props) {
    const [data, setData] = useState([]);
    const [Display, setDisplay] = useState(none);
    const [val, setVal] = useState('');
    const [valx,setValx] = useState({experience:""});
    const [value,setValue] = useState(slct);

    const theArray = props.theArray;
    const setTheArray = props.setTheArray;
    const skillsAr = theArray.skills;
    let skillsArr = [...theArray['skills']].splice(0,skillsAr.length-1);

    React.useEffect(()=>{
        const data = localStorage.getItem('page-two');
        if(data) {
            setTheArray(JSON.parse(data));
        }
    }, []);

    React.useEffect(()=>{
        localStorage.setItem('page-two',JSON.stringify(theArray));
        if(theArray['skills'].length >= 2) {
            props.setError("");
        }
    })

    const getData = () => {
       fetch('https://bootcamp-2022.devtest.ge/api/skills')
       .then((response) => response.json())
       .then((Json) => {
            setData(Json)
        });
    }
    useEffect(()=>{
        getData()
    },[])
    
    const menux = () => {
        if(Display.display === none.display){
            return setDisplay((Display) => {
                return Display = block
            })
        } else {
            return setDisplay((Display) => {
                return Display = none
            })
        }
    }
    const selectIt = (e) => {
        setVal({id: e.target.id*1});
        setValue(e.target.value);
    }

    const closeIt = () => {
        return setDisplay((Display) => {
            return Display = none
        })
    }

    function setXp() {
        if(valx.experience > 0 && value !== slct && skillsAr.every(i => i['id'] !== val.id)) {
            props.setTheArray((prev) => ({
                skills: [{...val,...valx}, ...prev.skills]
            }));
            setValx({experience:""});
            setValue(slct);
        }
    }

    const vals = [skillsArr.map((e,i) =>
        <div key = {i}>
            <div key = {`v${i}`}>{e['id']}</div>
            <div key = {`i${i}`}>{e['experience']}</div>
            <div key = {`r${i}`} onClick={() => {setTheArray({skills: [...theArray['skills'].slice(0, i).concat(theArray['skills'].slice(i + 1))]
                })}}>x</div>
        </div>
      )];
    
    const errors = props.errors;
    return (
        <>
            <h2>Tell us about your skills</h2>
            <input type="text" name="select" value = {value} readOnly onClick={menux}/>
            <div style = {Display}>
                {data.map((item) => (
                    <div key = {item.id}>
                        <input key = {`i${item.id}`} id = {item.id} onClick = {(e) => {selectIt(e); closeIt()}} value = {item.title} readOnly/>
                    </div>
                ))}
            </div>
            <input type="text" name="experience" value = {valx.experience} placeholder = "Experience Duration in Years" onChange = {e => setValx({experience: e.target.value})}/>
            <button onClick={() => {setXp()}}>select</button>
            <p>{errors}</p>
            <>
                {vals}
            </>
        </>
    );
}


export {PageTwo}