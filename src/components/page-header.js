import React from 'react';

const PageHeader = (props) => {
  return (
    <div className="row text-center">
      <div className="col-xs-12 col-md-4 col-md-offset-4 text-center">
        <div className="page-header">
          <h1>{props.cityName}</h1>
        </div>
      </div>
    </div>
  )
}

export default PageHeader;