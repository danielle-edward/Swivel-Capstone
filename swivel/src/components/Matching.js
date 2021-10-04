import MainNav from './MainNav'
import SideNav from './SideNav'
import MatchCard from './MatchCard'
import NewMatch from './NewMatch'

import EndImg from '../images/endlist.png'

import { v1 as uuidv1 } from "uuid"
import React, { useState, useEffect } from 'react'
import Amplify, { API, Auth, Hub, graphqlOperation } from 'aws-amplify'
import {Link, Redirect} from 'react-router-dom'
import { getMatch, getUser, listMatchs } from '../graphql/queries'
import { updateUser, createMatch } from '../graphql/mutations'


const userList = []
const userInfo = []

const Matching = ( ) => {
  const [userID, setUserID] = useState(false)
  const [redirectToLogin, setRedirectToLogin] = useState(false)
  const [prosUsers, setProsUsers] = useState(userList)
  const [index, setIndex] = useState(0)
  const [currUserInfo, setCurrUserInfo] = useState(userInfo)

  //const [userLength, setUserLength] = useState(0)

  // false = student, true = company
  const [userType, setUserType] = useState(true)

  const [newMatchFlag, setNewMatchFlag] = useState(false)
  //const [upcomingMeeting, setUpcomingMeeting] = useState(null)

  const finalizeMatch = (id, company, student, time, type) => {
    if(type === "upcoming"){
      const newMatchData = {
        id: id,
        company: company,
        student: student,
        createdAt: new Date().toISOString(),
        status_flag: type,
        messages: "",
        upcoming_meeting: time
        //updatedAt: new Date().toISOString(),
      };

      // create a new match field in the db
      (async () => {
        await API.graphql(graphqlOperation(createMatch, {input: newMatchData})).then(response => {
          console.log("created new match")
        }).catch(err => {
          console.log(err)
        })
      })()

    } else if(type === "pending"){
        const newMatchData = {
          id: id,
          company: company,
          student: student,
          createdAt: new Date().toISOString(),
          status_flag: type,
          messages: "",
          upcoming_meeting: null
          //updatedAt: new Date().toISOString(),
        };

        // create a new match field in the db
        (async () => {
          await API.graphql(graphqlOperation(createMatch, {input: newMatchData})).then(response => {
            console.log("created new match")
          }).catch(err => {
            console.log(err)
          })
        })()
  } else {
    setIndex(index+1)
  }

    setNewMatchFlag(false)
  }

  useEffect(() => {
    let isCancelled = false
    Auth.currentSession()
      .then(currUser => {
        var userID = currUser['idToken']['payload']['sub']
          if(currUser['idToken']['payload']['custom:student'] === '1'){
            getProsUsers(userID, false)
            setUserType(false)
          } else {
            getProsUsers(userID, true)
            setUserType(true)
          }
          setUserID(userID)
          console.log(index)
        return () => {
          isCancelled = true
        }
       })
      .catch(err => {
        setRedirectToLogin(true)
      })
  }, [])

  async function getProsUsers(userID, type){
    var userid = userID.toString();
    //(async () => {
    var userInfo = await getUserInfo(userid)
    setCurrUserInfo(userInfo)
    var notSeenIds = userInfo.data.getUser.notSeen;
    //setUserLength(notSeenIds.length);
    (async () => {
      var allUserData = []
      // can change this so it only keeps one at a time
      for(var id in notSeenIds){
        await API.graphql({ query: getUser, variables: {id: notSeenIds[id]}}).then(prosUserData => {
          var userData = prosUserData.data.getUser
          console.log(userData.id)
          if(type == false){
            // user is student - will view company
            var displayData = {
              response_rate: userData.response_rate,
              id: userData.id,
              name: userData.firstName + " " + userData.lastName,
              position: userData.position,
              org: userData.organization,
              loc: userData.located,
              bio: userData.bio,
              companySize: userData.company_size,
              website: userData.website,
              about: userData.about,
              tech: userData.tech_skills,
              soft: userData.soft_skills,
              values: userData.values,
              life: userData.life_at,
              benefits: userData.benefits,
              liked: userData.liked,
              skipped: userData.skipped,
              availability: userData.availability,
              email: userData.email
            }
            allUserData.push(displayData)
          } else {
            var displayData = {
              response_rate: userData.response_rate,
              id: userData.id,
              name: userData.firstName + " " + userData.lastName,
              school: userData.organization,
              degMaj: userData.degree + ", " + userData.major,
              loc: userData.location,
              bio: userData.bio,
              experience: userData.highlights,
              tech: userData.tech_skills,
              soft: userData.soft_skills,
              values: userData.values,
              life: userData.life_at,
              benefits: userData.benefits,
              liked: userData.liked,
              skipped: userData.skipped,
              availability: userData.availability,
              email: userData.email
            }
            allUserData.push(displayData)
          }
        })
      }
      setProsUsers(allUserData)
    })()
  }

  // unsure how we're flagging student vs student
  async function getUserType(userID){
    await API.graphql({ query: getUser, variables: {id: userID.toString() }}).then(response => {
      var type = response.data.getUser.typeOfUser;
      if(type == "Company"){
        setUserType(true)
      }
      else {
        console.log("student")
        setUserType(false)
      }
    }).catch(err => {
      console.log(err);
    });

  }

  async function getUserInfo(userID){
    // make a function with a lot less info (not necessary to get whole user here)
    return await API.graphql({ query: getUser, variables: {id: userID}})
  }

  async function passUser(matchInfo){
    var matchID = matchInfo.id;

    var currUserData = currUserInfo.data.getUser

    var notSeenArr = currUserData.notSeen
    var skippedArr = currUserData.skipped

    var i = notSeenArr.indexOf(matchID)
    notSeenArr.splice(i, 1)

    if(skippedArr[0] == " ")
      skippedArr[0] = matchID
    else
      skippedArr.push(matchID)

    //this works, i just don't wanna have to keep updating it manually
    (async () => {
        await API.graphql({ query: updateUser, variables: {input: {id: currUserData.id, notSeen: notSeenArr, skipped: skippedArr}}}).then(response => {
          console.log("updated")
        }).catch(err => {
          console.log(err)
        })
      })()
    setIndex(index+1)
  }

  async function likeUser(matchInfo){
    setNewMatchFlag(true)

    var matchID = matchInfo.id;

    var currUserData = currUserInfo.data.getUser

    var notSeenArr = currUserData.notSeen
    var likedArr = currUserData.liked

    var i = notSeenArr.indexOf(matchID)
    notSeenArr.splice(i, 1)

    if(likedArr[0] == " ")
      likedArr[0] = matchID
    else
      likedArr.push(matchID)

    //this works, i just don't wanna have to keep updating it manually
    (async () => {
        await API.graphql({ query: updateUser, variables: {input: {id: currUserData.id, notSeen: notSeenArr, liked: likedArr}}}).then(response => {
          console.log("updated")
        }).catch(err => {
          console.log(err)
        })
      })()
    setIndex(index+1)
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
        {
          prosUsers.length > index && (
            <div className="matching-div">
            <MatchCard userType={userType} userInfo={prosUsers[index]} end={prosUsers.length} index={index}/>
            <button className="pass" id={userType + "-pass"} onClick={() => passUser(prosUsers[index])} >Not Right Now.</button>
            <button className="connect" id={userType + "-conn"} onClick={() => likeUser(prosUsers[index])} >Connect.</button>
            {
              newMatchFlag === true && (
                <NewMatch userType={userType} userID={currUserInfo.data.getUser.id} userAvail={currUserInfo.data.getUser.availability} matchInfo={prosUsers[index]} finalizeMatch={finalizeMatch} />
              )
            }
            </div>
          )
        }
        {
          prosUsers.length <= index && (
            <div className="end-list">
              <p className="end-message"> You've reached the end! Come back later to see more users </p>
              <img className="end-img" src={EndImg} alt="ending" />
            </div>
          )
        }
        </div>
      )
    }
    </div>
  )

}

export default Matching
