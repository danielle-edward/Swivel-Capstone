import insta from "../images/insta.png"
import facebook from "../images/facebook.png"
import linkedin from "../images/linkedin.png"


import {Link} from 'react-router-dom'

const Footer = ( ) => {
  return (
    <div className="landing-footer">
      <div className="footer-div" id="company-info-div">
        <p className="company-info"> Kingston, ON </p>
        <p className="company-info"> swivelnetwork@gmail.com </p>
        <p className="company-info"> 647-203-1343 </p>
        <p className="company-info copyright"> <b> Swivel 2020. </b></p>
      </div>
      <div className="footer-div" id="footer-links-div">
        <Link className="footer-links" to="/about">About Us</Link>
        <Link className="footer-links" to="/resources">Resources</Link>
        <Link className="footer-links" to="/">Terms & Conditions</Link>
      </div>
      <div className="footer-div" id="socials-div">
        <a className="footer-socials" href="https://www.instagram.com/swivelnetwork/"><img className="socials-icon" src={insta} alt="insta_logo"/> Instagram</a>
        <a className="footer-socials" href="https://www.facebook.com/Swivel-101509394999422"><img className="socials-icon" src={facebook} alt="facebook_logo"/> Facebook</a>
        <a className="footer-socials" href="https://www.linkedin.com/company/swivelnetwork/"><img className="socials-icon" src={linkedin} alt="linkedin_logo"/> LinkedIn</a>
      </div>
    </div>
  )
}

export default Footer
