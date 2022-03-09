var url = "https://bootcamp-2022.devtest.ge/api/application";

var xhr = new XMLHttpRequest();
xhr.open("POST", url);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

var data = `{
  "token": "8fe41587-868f-4abc-8c84-8bb375df1cdd",
  "first_name": "gela",
  "last_name": "gelashvili",
  "email": "gelashvili@gela.ge",
  "phone": "+995591933382",
  "skills": [
    {
      "id": 1,
      "experience": 3
    }
  ],
  "work_preference": "from_home",
  "had_covid": true,
  "had_covid_at": "2022-02-23",
  "vaccinated": true,
  "vaccinated_at": "2022-02-23",
  "will_organize_devtalk": true,
  "devtalk_topic": "I would ...",
  "something_special": "I am special!"
}`;


xhr.send(data);