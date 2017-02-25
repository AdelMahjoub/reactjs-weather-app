import React from 'react';

const LoadingIndicator = (props) => {
  let hidden = "";
  if(props.hide) {
    hidden = "hidden";
  }
  return (
    <div className={`row text-center ${hidden}`}>
      <div className="col-xs-12 col-md-4 col-md-offset-4 text-center">
        <div className="page-header">
          <h1>Loding ...</h1>
        </div>
      </div>
    </div>
  )
}

export default LoadingIndicator;
