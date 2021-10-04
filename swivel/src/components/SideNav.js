import MatchIcon from "../images/matchingIcon.png"
import ProfileIcon from "../images/profileIcon.png"
import DashIcon from "../images/dashboardIcon.png"
import CalIcon from "../images/calIcon.png"

import {NavLink} from 'react-router-dom'
import { Auth, Hub } from 'aws-amplify'
import React, { useState, useEffect } from 'react'


const SideNav = () => {
  const [userType, setUserType] = useState(true)
  const [redirectToLogin, setRedirectToLogin] = useState(false)


  useEffect(() => {
    let isCancelled = false
    Auth.currentSession()
      .then(currUser => {
        var userID = currUser['idToken']['payload']['sub']
          if(currUser['idToken']['payload']['custom:student'] === '1')
            setUserType(false)
          else
            setUserType(true)
        return () => {
          isCancelled = true
        }
       })
      .catch(err => {
        setRedirectToLogin(true)
      })
  }, [])

  // find userType

  var navId = "comp-nav"
  var navBtnId = "comp-nav-btn"
  var activeColor = "#A5DAD5"

  if(userType === false){
    navId = "stud-nav"
    navBtnId = "stud-nav-btn"
    activeColor = "#ffafaf"
  }


  return (
    // if user is a student id = stud-side else id comp-nav
    <div className="side-nav" id={navId}>
      <NavLink activeStyle={{ backgroundColor: activeColor }} exact to="/matching" className="side-nav-btn" id={navBtnId}><img className="side-nav-icon" src={MatchIcon} alt="matchIcon"/> <p className="side-nav-label">Start Matching</p></NavLink>
      <NavLink activeStyle={{ backgroundColor: activeColor }} exact to="/profile" className="side-nav-btn" id={navBtnId}><img className="side-nav-icon" src={ProfileIcon} alt="profileIcon"/> <p className="side-nav-label">Profile</p></NavLink>
      <NavLink activeStyle={{ backgroundColor: activeColor }} exact to="/dashboard" className="side-nav-btn" id={navBtnId}><img className="side-nav-icon" src={DashIcon} alt="dashIcon"/> <p className="side-nav-label">Connections</p></NavLink>
      <NavLink activeStyle={{ backgroundColor: activeColor }} exact to="/calendar" className="side-nav-btn" id={navBtnId}><img className="side-nav-icon" src={CalIcon} alt="calIcon"/> <p className="side-nav-label">Calendar</p></NavLink>
    </div>
  )
}

export default SideNav
