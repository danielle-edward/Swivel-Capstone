// this is what will get rendered when there's a new upcoming match
import PlaceholderImg from "../images/placeholder.png"

import { v1 as uuidv1 } from "uuid"
import React, { useState, useEffect } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { updateUser, createMatch } from '../graphql/mutations'

const NewMatches = ({ userType, userID, userAvail, matchInfo, finalizeMatch }) => {

  var matchNotSeenArr = matchInfo.notSeen
  var matchLikedArr = matchInfo.liked

  const newMatchID = uuidv1();

  if(matchLikedArr.includes(userID)){
    // mutual like, show new match and create upcoming match
    const matchAvail = matchInfo.availability

    const mutualAvail = userAvail.filter(value => matchAvail.includes(value))

    // only keep the first three times
    mutualAvail.splice(3, mutualAvail.length)

    /*if(userType === false){
      var matchColorId = "new-stud-match"
    } else {
      var matchColorId = "new-comp-match"
    }*/

    if(userType === false){
      var companyUser = matchInfo.id
      var studentUser = userID
    } else {
      var companyUser = userID
      var studentUser = matchInfo.id
    }

    var availableTimes = mutualAvail.map(function(time){
                  return <button className="suggested-time" onClick={() => finalizeMatch(newMatchID, companyUser, studentUser, time, "upcoming")}> { time } </button>
                })

    return (
      <div className="new-match">
        {
          // user type is student
          userType === false && (
            <div className="new-match-div" id="new-stud-match">
              <img className="match-pic" src={PlaceholderImg} alt="profile_pic" />
              <p className="name"> { matchInfo.name } </p>
              <p className="line1"> { matchInfo.position + ", " + matchInfo.org }  </p>
              <p className="line2"> { matchInfo.loc } </p>
              <h1 className="match-title"> You've Connected! </h1>
              {
                // no mutual times, send something that says the upcoming meeting is right now
                mutualAvail.length === 0 && (
                  <div className="no-mutual">
                    <p className="no-mutual-info">
                     You and {matchInfo.name} don't have any mutually available times :( Send them an email at {matchInfo.email} to schedule a meeting.
                    </p>
                    <button className="continue-matching" onClick={() => finalizeMatch(newMatchID, companyUser, studentUser, new Date().toISOString(), "upcoming")}></button>
                  </div>
                )
              }
              {
                // only do the first 3 suggested
                mutualAvail.length !== 0 && (
                  <div className="suggested">
                  <p calssName="suggested-info"> Choose a time based on your mutal availability </p>
                    { availableTimes }
                  </div>
                )
              }
            </div>
          )
        }
        {
        userType === true && (
          <div className="new-match-div" id="new-comp-match">
            <img className="match-pic" src={PlaceholderImg} alt="profile_pic" />
            <p className="name"> { matchInfo.name } </p>
            <p className="line1"> { matchInfo.degree + ", " + matchInfo.major }  </p>
            <p className="line2"> { matchInfo.loc } </p>
            <h1 className="match-title"> You've Connected! </h1>
            {
              // no mutual times, send something that says the upcoming meeting is right now
              mutualAvail.length === 0 && (
                <div className="no-mutual">
                  <p className="no-mutual-info">
                   You and {matchInfo.name} don't have any mutually available times :( Send them an email at {matchInfo.email} to schedule a meeting.
                  </p>
                  <button className="continue-matching" onClick={() => finalizeMatch(newMatchID, companyUser, studentUser, new Date().toISOString(), "upcoming")}></button>
                </div>
              )
            }
            {
              // only do the first 3 suggested
              mutualAvail.length !== 0 && (
                <div className="suggested">
                <p calssName="suggested-info"> Choose a time based on your mutal availability </p>
                  { availableTimes }
                </div>
              )
            }
          </div>
        )
      }
      </div>
    )
  }
  else if(matchNotSeenArr.includes(userID)){
    return finalizeMatch(newMatchID, companyUser, studentUser, new Date().toISOString(), "pending")
  } else {
    return finalizeMatch("", "", "", "", "noMatch")
  }
}

export default NewMatches
