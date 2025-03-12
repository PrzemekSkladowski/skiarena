import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './styles.css';  // Import the CSS file

const WeatherReports = () => {
  const [details, setDetails] = useState([]);
  const [formState, setFormState] = useState({
    location: '',
    description: ''
  });

  useEffect(() => {
    fetchWeatherReports();
  }, []);

  const fetchWeatherReports = () => {
    axios.get('http://localhost:8000/weather-reports/').then(res => {
      setDetails(res.data);
    }).catch(err => { });
  };

  const deleteWeatherReport = (id) => {
    axios.delete(`http://localhost:8000/weather-reports/${id}/`)
      .then(() => {
        fetchWeatherReports();
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/weather-reports/', { location: formState.location, description: formState.description })
      .then(res => {
        fetchWeatherReports();
        setFormState({ location: '', description: '' });  // Reset form
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <>
    <header> Raport pogodowy </header>

    <form onSubmit={handleSubmit} className="form-inline">
        <div className="form-group mx-sm-2 mb-2">
          <label htmlFor="location" className="sr-only">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formState.location}
            onChange={handleInputChange}
            placeholder="Location"
            required
          />
        </div>
        <div className="form-group mx-sm-2 mb-2">
          <label htmlFor="description" className="sr-only">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mb-2">Add Weather Report</button>
      </form>
      <hr></hr>
      {details.map((output) => (
        <div key={output.id} className="card mb-3">
        <div className="card-body">
          <p className="card-text"><strong>Location:</strong> {output.location}</p>
          <p className="card-text"><strong>Description:</strong> {output.description}</p>
          <button onClick={() => deleteWeatherReport(output.id)} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
      ))}
    </>
  );

}

export default WeatherReports;
