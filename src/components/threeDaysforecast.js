import React from 'react';

const ForecastRow = (props) => {
  return (
    <tr>
      <td>
        <p>{props.date}</p>
      </td>
      <td>
        <span><i className={`wi wi-forecast-io-${props.icon}`}></i></span>
      </td>
      <td className="text-right">
        <span>{`${props.tempMax}° / `}</span>
        <span>{`${props.tempMin}°`}</span>
      </td>
    </tr>
  )
}

const ThreeDaysForecast = (props) => {
  let forecast = props.forecast;
  return (
    <div className="row">
      <div className="col-xs-12 col-md-4 col-md-offset-4">
        <div className="table-responsive table-bordered table-striped">
          <table className="table table-hover">
            <tbody>
              {
                forecast.map((obj, i) => {
                  return (
                    <ForecastRow 
                      key={`day-${i+1}`}
                      date={obj.date}
                      icon={obj.icon}
                      tempMax={obj.tempMax}
                      tempMin={obj.tempMin}
                    />
                  )
                })
              }
              <tr>
                <td colSpan="3">
                  <p>{props.summary}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div> 
      </div>
    </div>
  )
}

export default ThreeDaysForecast;