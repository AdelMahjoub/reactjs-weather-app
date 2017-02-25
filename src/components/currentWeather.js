import React from 'react';

const CurrentWeather = (props) => {
  return (
    <div className="row">
      <div className="col-xs-12 col-md-4 col-md-offset-4 text-center">
        <div className="panel panel-default">
            <div className="panel-body">
              <h1>
                <i className={`wi wi-forecast-io-${props.icon}`}></i>
                <span>{props.temperature}</span>
              </h1>
            </div>
            <div className="panel-footer">
              <h4>{props.summary}</h4>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather;