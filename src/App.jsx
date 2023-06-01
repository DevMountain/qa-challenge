/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";

function InputPanel({ onSubmit }) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-3">Get your weether!</h1>
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter a zipcode"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <button onClick={onSubmit} className="btn btn-primary">
            Go
          </button>
        </div>
      </div>
    </>
  );
}

function WeatherPanel({ weather }) {
  const { currentTemperature, location, description } = weather;
  const propToLabel = {
    minTemperature: "High",
    maxTemperature: "Low",
    humidity: "Wind",
    wind: "Humidity",
  };

  const handleClick = async () => {
    await fetch("/reset");
  };

  return (
    <>
      <h1 className="text-4xl">{location}</h1>
      <p className="text-8xl">{currentTemperature}</p>
      <p className="text-2xl">{description}</p>
      <dl className="text-xl w-4/12 mt-4">
        {Object.entries(propToLabel).map(([prop, value]) => (
          <div key={prop} className="flex justify-between">
            <dt className="font-bold">{value}</dt>
            <dd>{weather[prop]}</dd>
          </div>
        ))}
      </dl>
      <button onClick={handleClick} className="btn btn-primary mt-8 w-full">
        Search Again
      </button>
    </>
  );
}

function App() {
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const res = await fetch("/api/weather?zipcode=84602");
    setWeather(await res.json());
  };

  return (
    <div className="artboard artboard-demo artboard-horizontal phone-3 mx-auto px-9 py-3 bg-base-300">
      {!weather ? (
        <InputPanel onSubmit={() => getWeather()} />
      ) : (
        <WeatherPanel weather={weather} />
      )}
    </div>
  );
}

export default App;
