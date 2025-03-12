import axios from 'axios';
import React from 'react';
import './styles.css';  // Import the CSS file
import SkipassList from './SkipassList';
import WeatherReports from './WeatherReports';


class App extends React.Component {
  render() {
    return (
      <>
        <header className="text-white text-center py-3">
          <a href="./">
          <img src={"./ski_logo.png"} />
          </a>
        </header>
        <div className="container">
          <SkipassList />
          {/* <div className="row">
            <div className="col-lg-3 col-md-12 mb-4">
            <WeatherReports />
            </div>
            <div className="col-lg-9 col-md-12 mb-4">
            <SkipassList />
            </div>
          </div> */}
        </div>
        <footer>
          <div>
            Django & React portfolio project.
            <br />
            <a href="https://vectorified.com/mountain-icon">Mountain Icon</a>
            <br />
            <a href="https://github.com/PrzemekSkladowski">Visit me on Github.com</a>
          </div>
        </footer>
      </>
    );
  }
}


export default App;
