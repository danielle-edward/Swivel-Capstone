import {NavLink} from 'react-router-dom'
import logo_full from '../images/Logo_Full.png'

function LoginNav(){
  return(
    <div className='landing-nav'>
      <NavLink exact to="/" className="nav-btn-logo"><img className="nav-logo" src={logo_full} alt="Swivel_Logo" /></NavLink>
      <NavLink activeStyle={{ fontWeight: "bold" }} exact to="/signup" className="nav-btn" id="sign-up"><u>Join here.</u></NavLink>
      <p className="nav-btn" id="sign-up-text">Don't have an account?</p>
    </div>
  );
}

export default LoginNav;
