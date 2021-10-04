import MainNav from "./MainNav"
import SideNav from "./SideNav"
import Tabs from "./Tabs"
import Search from "./Search"
import NoMatches from "./NoMatches"
import DashboardMatch from "./DashboardMatch"

import React, { useState, useEffect } from 'react'
import Amplify, { API, Auth, Hub } from 'aws-amplify'
import {Link, Redirect} from 'react-router-dom'
import { getMatch, getUser, listMatchs } from '../graphql/queries'

const matchList = []

const Dashboard = ( ) => {
  const [userID, setUserID] = useState(false)
  const [redirectToLogin, setRedirectToLogin] = useState(false)
  const [matches, setMatches] = useState(matchList)

  // false = student, true = company
  const [userType, setUserType] = useState(true)

//  const userType = false

  useEffect(() => {
    let isCancelled = false
    Auth.currentSession()
      .then(currUser => {
        var userID = currUser['idToken']['payload']['sub']

        if(currUser['idToken']['payload']['custom:student'] === '1'){
          getMatches(userID, false)
          setUserType(false)
        } else {
          getMatches(userID, true)
          setUserType(true)
        }

        return () => {
          isCancelled = true
        }
       })
      .catch(err => {
        setRedirectToLogin(true)
      })
  }, [])

  async function getMatches(userID, type){
    var userid = userID.toString();
    if(type === false){
      // if this works, have to add a thing for company vs student
      await API.graphql({ query: listMatchs, variables: {company: userid}}).then(matchesInfo => {
        var matchInfo = matchesInfo.data.listMatchs.items;
<<<<<<< HEAD
          (async () => {
            try{

          var allMatchesData = []
          for(var key in matchInfo){
            // user is a student and will view company match data
              var matchID = matchInfo[key].company
                var matchDetails = await getMatchInfo(matchID)
                var userData = matchDetails.data.getUser
                var matchData = matchInfo[key]

                var displayData = {
                  name: userData.firstName + " " + userData.lastName,
                  company: userData.organization,
                  position: userData.position,
                  loc: userData.located,
                  upcoming_meeting: matchData.upcoming_meeting,
                  messages: matchData.messages,
                  status_flag: matchData.status_flag
                }
                allMatchesData.push(displayData)
            }
            setMatches(allMatchesData)
        } catch (err){
          console.log(err)
        }

        if(allMatchesData.length === 0){
          setMatches([])
        }
          })()

=======
        (async () => {
        var allMatchesData = []
        console.log(matchInfo)
        for(var key in matchInfo){
          // user is a student and will view company match data
            var matchID = matchInfo[key].company
              var matchDetails = await getMatchInfo(matchID)
              var userData = matchDetails.data.getUser
              var matchData = matchInfo[key]
>>>>>>> bda955206acb94af0ed6143ce2fabbfa81576263

      }).catch(err => {
        console.log(err)
      })
    } else {
      console.log("company")
      await API.graphql({ query: listMatchs, variables: {student: userid}}).then(matchesInfo => {
        var matchInfo = matchesInfo.data.listMatchs.items;
          (async () => {
            try {
          var allMatchesData = []
          for(var key in matchInfo){
            // user is a company and will view student data
              var matchID = matchInfo[key].student
                var matchDetails = await getMatchInfo(matchID)
                var userData = matchDetails.data.getUser
                var matchData = matchInfo[key]

                var displayData = {
                  name: userData.firstName + " " + userData.lastName,
                  school: userData.organization,
                  degree: userData.degree,
                  major: userData.major,
                  upcoming_meeting: matchData.upcoming_meeting,
                  messages: matchData.messages,
                  status_flag: matchData.status_flag,
                  email: matchData.email
                }
                allMatchesData.push(displayData)
            }
            setMatches(allMatchesData)
          } catch(err) {
            console.log(err)
          }

          if(allMatchesData.length === 0){
            setMatches([])
          }
          })()

      }).catch(err => {
        console.log(err)
      })
    }

  }

  async function getMatchInfo(matchID){
    // make a function with a lot less info (not necessary to get whole user here)
    return await API.graphql({ query: getUser, variables: {id: matchID}})
  }

  var upcoming = []
  var pending = []
  var active = []
  var archived = []

// should be in a function with state changes but I really don't wanna do that
//  async function parseMatchType(){
    if(matches.length != 0){
      for(var key in matches){
        console.log(matches[key].status_flag)
        if(matches[key].status_flag == "upcoming"){
          if(userType === false)
            createCompMatchBox("upcoming", upcoming, matches[key])
          else
            createStudMatchBox("upcoming", upcoming, matches[key])
        }
        if(matches[key].status_flag == "pending"){
          if(userType === false)
            createCompMatchBox("pending", pending, matches[key])
          else
            createStudMatchBox("pending", pending, matches[key])
        }
        if(matches[key].status_flag == "active"){
          if(userType === false)
            createCompMatchBox("active", active, matches[key])
          else
            createStudMatchBox("active", active, matches[key])
        }
        if(matches[key].status_flag == "archived"){
          if(userType === false)
            createCompMatchBox("archived", archived, matches[key])
          else
            createStudMatchBox("archived", archived, matches[key])
        }
      }
    }
//  }

  function createCompMatchBox(matchType, matchTypeArr, matchInfo){
    var name = matchInfo.name
    var compPos = matchInfo.position + ", " + matchInfo.company
    var loc = matchInfo.loc
    var meeting = matchInfo.upcoming_meeting
    matchTypeArr.push(
        <DashboardMatch userType={userType} matchType={matchType} name={name} line2={compPos} line3={loc} email={matchInfo.email} meeting={meeting}/>
    )
  }

  function createStudMatchBox(matchType, matchTypeArr, matchInfo){
    var name = matchInfo.name
    var degreeMaj = matchInfo.degree + ", " + matchInfo.major
    var school = matchInfo.school
    var meeting = matchInfo.upcoming_meeting
    matchTypeArr.push(
        <DashboardMatch userType={userType} matchType={matchType} name={name} line2={school} line3={degreeMaj} email={matchInfo.email} meeting={meeting}/>
    )
  }

  return (
    <div className = "dashboard">
    {
      redirectToLogin === true && (
        <Redirect to= '/login' />
      )
    }
    {
      redirectToLogin === false && (
        <div className = "internal-body">
        <MainNav />
        <SideNav />
          <div className="connections-div">
          {
            userType === false && (
              <p className="dashboard-title" id="stud-conn"> Connections </p>
            )
          }
          {
            userType === true && (
              <p className="dashboard-title" id="comp-conn"> Connections </p>
            )
          }
            <div className="connections-elem">
            <Tabs>
              <div label="Upcoming">
              {
                upcoming.length == 0 && (
                  <NoMatches title="upcoming" />
                )
              }
              {
                upcoming.length !== 0 && (
                    <div> { upcoming } </div>
                )
              }
              </div>
              <div label="Pending">
              {
                pending.length == 0 && (
                  <NoMatches title="pending" />
                )
              }
              {
                pending.length !== 0 && (
                  <div> { pending } </div>
                )
              }
              </div>
              <div label="Active">
              {
                active.length == 0 && (
                  <NoMatches title="active" />
                )
              }
              {
                active.length !== 0 && (
                  <div> { active } </div>
                )
              }
              </div>
              <div label="Archived">
              {
                archived.length == 0 && (
                  <NoMatches title="archived" />
                )
              }
              {
                archived.length !== 0 && (
                  <div> { archived } </div>
                )
              }
              </div>
              </Tabs>
              <Search />
            </div>
          </div>
        </div>
      )
    }
    </div>
  )

}

export default Dashboard
