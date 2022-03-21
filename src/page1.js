import React from "react";

function PageOne(props) {
  const oneFormData = props.ObjOne;
  const setOneFormData = props.setObjOne;

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setOneFormData({
      ...oneFormData,
      [name]: value
    });
  };

  React.useEffect(() => {
    const data = localStorage.getItem("page-one");
    if (data) {
      setOneFormData(JSON.parse(data));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("page-one", JSON.stringify(oneFormData));
  });

  const errors = props.errors;
  return (
    <div className="block-wrap">
      <div className="block-left">
        <h2>Hey, Rocketeer, what are your coordinates?</h2>
        <div className="input-wrap">
          <div>
            <>
              <input
                type="text"
                placeholder="First Name"
                value={oneFormData.first_name}
                name="first_name"
                onChange={handleChange}
              />
              <p className="error">{errors.first_name}</p>
            </>
          </div>
          <div>
            <>
              <input
                type="text"
                placeholder="Last Name"
                value={oneFormData.last_name}
                name="last_name"
                onChange={handleChange}
              />
              <p className="error">{errors.last_name}</p>
            </>
          </div>
          <div>
            <>
              <input
                type="email"
                placeholder="E Mail"
                value={oneFormData.email}
                name="email"
                onChange={handleChange}
              />
              <p className="error">{errors.email}</p>
            </>
          </div>
          <div>
            <>
              <input
                type="phone"
                placeholder="+995 5__ __ __ __"
                value={oneFormData.phone}
                name="phone"
                onChange={handleChange}
              />
              <p className="error">{errors.phone}</p>
            </>
          </div>
        </div>
      </div>
      <div className="block-right">
        <h2>Redberry Origins</h2>
        <div className="text-wrap">
          <p>
            You watch “What? Where? When?” Yeah. Our founders used to play it.
            That’s where they got a question about a famous American author and
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
