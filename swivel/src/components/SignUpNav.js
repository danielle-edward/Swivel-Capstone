import {NavLink} from 'react-router-dom'
import logo_full from '../images/Logo_Full.png'

function SignUpNav(){
    return(
      <div className='landing-nav'>
      <NavLink exact to="/" className="nav-btn-logo"><img className="nav-logo" src={logo_full} alt="Swivel_Logo" /></NavLink>
      <NavLink activeStyle={{ fontWeight: "bold" }} exact to="/login" className="nav-btn" id="sign-up"><u>Log In.</u></NavLink>
      <p className="nav-btn" id="sign-up-text">Already have an account?</p>
      </div>
    );
}

export default SignUpNav;
