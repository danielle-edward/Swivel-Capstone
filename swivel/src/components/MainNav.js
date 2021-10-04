import LogoFull from "../images/Logo_Full.png"
import DropImg from "../images/dropdown.png"
import DummyImg from "../images/student/student1.jpeg"

import {NavLink, Link, Redirect} from 'react-router-dom'
import { API, Auth, Hub } from 'aws-amplify'
import React, { useState, useEffect } from 'react'
import { getUser } from '../graphql/queries'


const defName = ""

const SideNav = () => {
  const [name, setName] = useState(defName)
  const [redirectToLogin, setRedirectToLogin] = useState(false)

  useEffect(() => {
    let isCancelled = false
    Auth.currentSession()
      .then(currUser => {
        var userID = currUser['idToken']['payload']['sub']
        getName(userID)
        return () => {
          isCancelled = true
        }
       })
      .catch(err => {
        console.log(err)
      })
  })

  async function getName(userID) {
    await API.graphql({ query: getUser, variables: {id: userID.toString() }}).then(response => {
      var name = response.data.getUser.firstName + " " + response.data.getUser.lastName
      setName(name)
    }).catch(err => {
      console.log(err);
    });
  }

  async function signOut() {
    await Auth.signOut()
     .then(data => setRedirectToLogin(true))
     .catch(err => console.log(err));
  }

  return (
    // if user is a student id = stud-side else id comp-nav
    <div className = "main-nav">
      {
        redirectToLogin === true && (
          <Redirect to = '/login' />
        )
      }
      {
        redirectToLogin === false && (
            <div>
              <img className="nav-logo" id="main-nav-logo" src={LogoFull} alt="Swivel_Logo" />
              <img className="nav-info" id="profile-pic" src={DummyImg} alt="profile-pic" />
              <p className="nav-info" id="profile-name"> { name }</p>
              <div className="nav-dropdown">
                <img className="nav-drop-img" src={DropImg} alt="drop"/>
                <div className="nav-dropdown-content">
                  <p className="dropdown-opt" id="status"><b> Status: </b> Online </p>
                  <NavLink exact to="/profile" className="dropdown-opt"><p className="dropdown-opt">Account Settings</p></NavLink>
                  <a href="https://forms.gle/Q1xkfrAP1bjLXDfW9" className="dropdown-opt"><p className="dropdown-opt">Feedback</p></a>
                  <button className="dropdown-opt" id="dropdown-logout" onClick = {() => signOut()}>Log Out</button>
                </div>
              </div>
            </div>
        )
      }
    </div>
  )
}

export default SideNav
