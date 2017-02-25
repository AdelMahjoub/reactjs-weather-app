import React from 'react';

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-inverse navbar-static-top" role="navigation">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="https://darksky.net/poweredby/" target="_blank">
          Powered by Dark Sky
        </a>
      </div>
      <div className="collapse navbar-collapse navbar-ex1-collapse">   
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a href="/"><span className="glyphicon glyphicon-home"></span></a>
          </li>
          <li>
            <a href="https://github.com/AdelMahjoub/weather-app-expressjs" target="_blank">Github</a>
          </li>
          <li>
            <a href="https://www.freecodecamp.com/adelmahjoub" target="_blank">Freecodecamp</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar;