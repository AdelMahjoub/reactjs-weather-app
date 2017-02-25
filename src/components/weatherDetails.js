import React from 'react';

const WeatherDetails = (props) => {
  return (
    <div className="row">
      <div className="col-xs-12 col-md-4 col-md-offset-4">
        <div className="table-responsive table-bordered">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="text-center"><i className="wi wi-umbrella"></i></th>
                <th className="text-center"><i className="wi wi-sunrise"></i></th>
                <th className="text-center"><i className="wi wi-sunset"></i></th>
                <th className="text-center"><i className="wi wi-strong-wind"></i></th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>{props.precipIntensity}</td>
                <td>{props.sunriseTime}</td>
                <td>{props.sunsetTime}</td>
                <td>{props.windSpeed}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default WeatherDetails;