import "./App.css";
import { useState } from "react";
import lodinggif from "./images/gif.gif";

function App() {
  let [city, setCity] = useState("");

  let [wDetails, setwDetails] = useState();

  let [loading, setLoading] = useState(false);


  let getData = (event) => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=18bd892de4eb2ec0510b7edf11ca6119&units=metric`
    ).then((response) => response.json())
      .then((data) => {
        if(data.cod == "404"){
          setwDetails(undefined);
        }
        else{
          setwDetails(data);

        }
        setLoading(false);
      });
    event.preventDefault();
    setCity("");
  };

  return (
    <div className="container-fluid headcontainer">
      <div className="maincontainer">
        <h1 className="headding"> Simple Wheather App</h1>

        <form onSubmit={getData} className="formlook">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            className="whetherinput mx-3"
            placeholder="City Name"
          />
          <button className="button"> Submit</button>
        </form>

        <div className="wheatherdisplay">
          <img src={lodinggif} alt="" srcset="" className={`loding-img ${loading ? '' : 'd-none'} `}/>
          {wDetails !== undefined 
          ? 
          <>
          <h3 className="cityname">
            {wDetails.name} <span className="spanclass"> {wDetails.sys.country}</span>
          </h3>
          <h2 className="temp">{wDetails.main.temp}</h2>
          <img
            src={`https://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`}
            alt=""
            srcset=""
          />
          <p>{wDetails.weather[0].description}</p>
          </>
        :
        <>
        <b>
        No Data Found
          </b>
        </>
        }
          
        </div>
      </div>
    </div>
  );
}

export default App;
