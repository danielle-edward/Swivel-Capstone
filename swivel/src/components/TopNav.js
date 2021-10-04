import {NavLink} from 'react-router-dom'
import logo_full from '../images/Logo_Full.png'

function TopNav(){
  return(
    <div className='landing-nav'>
      <NavLink exact to="/" className="nav-btn-logo"><img className="nav-logo" src={logo_full} alt="Swivel_Logo" /></NavLink>
      <NavLink activeStyle={{ fontWeight: "bold" }} exact to="/login" className="nav-btn" id="nav-login">Login</NavLink>
      <NavLink activeStyle={{ fontWeight: "bold" }} exact to="/about" className="nav-btn">About Us</NavLink>
      <NavLink activeStyle={{ fontWeight: "bold" }} exact to="/resources" className="nav-btn">Resources</NavLink>
      <NavLink activeStyle={{ fontWeight: "bold" }} exact to="/" className="nav-btn">Startups</NavLink>
      <NavLink activeStyle={{ fontWeight: "bold" }} exact to="/students" className="nav-btn">Students</NavLink>
    </div>
  );
}

export default TopNav;
