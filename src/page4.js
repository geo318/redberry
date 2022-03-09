import React, {useEffect} from "react";

function PageFour(props) {
    const fourFormData = props.ObjFour;
    const setFourFormData = props.setObjFour;
    
    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setFourFormData({
            ...fourFormData,
            [name] : value
        });
    }
    
    React.useEffect(()=>{
        console.log(fourFormData)
        const data4 = localStorage.getItem('page-Four');
        if(data4) {
            setFourFormData(JSON.parse(data4));
        }
    }, []);

    React.useEffect(()=>{
        localStorage.setItem('page-Four',JSON.stringify(fourFormData))
    })


    return (
        <>  
            <h2>What about you?</h2>
            <div>
                <p>Would you attend Devtalks and maybe also organize your own?</p>
                <div>
                    <input type="radio" id="yes" name="will_organize_devtalk" value="True" onChange = {handleChange} checked = {fourFormData.will_organize_devtalk === "True"}/>
                    <label htmlFor="yes">Yes</label>
                </div>
                <div>
                    <input type="radio" id="no" name="will_organize_devtalk" value="False" onChange = {handleChange} checked = {fourFormData.will_organize_devtalk === "False"}/>
                    <label htmlFor="no">No</label>
                </div>
            </div>
            <div>
                <p>What would you speak about at Devtalk?</p>
                <textarea placeholder="I would..." name = "devtalk_topic" value = {fourFormData.devtalk_topic} onChange = {handleChange}/>
            </div>
            <div>
                <p>Tell us something special</p>
                <textarea placeholder="I..." name = "something_special" value = {fourFormData.something_special} onChange = {handleChange}/>
            </div>
        </>
    );

}




export {PageFour}