import MainNav from './MainNav'
import SideNav from './SideNav'
import ScheduleSelector from 'react-schedule-selector'
import React, { useState, useEffect } from 'react'
import Amplify, { API, Auth, Hub } from 'aws-amplify'
import {Link, Redirect} from 'react-router-dom'
import {getUser, getMatch } from '../graphql/queries'
import {updateUser } from '../graphql/mutations'

const CalendarComponent = ( ) => {
  const [availabilities, setAvailabilities] = useState([])
  const [meetings, setMeetings] = useState([])
  const [redirectToLogin, setRedirectToLogin] = useState(false)
  const [viewType, setViewType] = useState('availabilities')
  const [userID, setUserID] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [firstRun, setFirstRun] = useState(true)
  const [grabMeetings, setGrabMeetings] = useState(true)
  const [meetingTimeToDisplay, setMeetingTimeToDisplay] = useState('')
  const [meetingToDisplay, setMeetingToDisplay] = useState('')
  const [displayMeeting, setDisplayMeeting] = useState(false)
  /*
  This is the component for the "calendar" on the side nav
   it should allow them to
    - connect their Google calendar and show their availabilities on a calendar view
              - (shouldn't be that hard look at the documentation for freebusy method)
    - paint over times they are available
    - display any meetings they're going to have

  The calendar is where you populate the "availabilities" field in the user.
   */
  useEffect(() => {
   let isCancelled = false
   Auth.currentSession()
     .then(currUser => {
       var userID = currUser['idToken']['payload']['sub']
       setUserID(userID)
       checkIfChanges(userID)
       grabMeetingTimes(userID)
       if(firstRun === true) {
         grabAvailabilities(userID)
       }
       return () => {
         isCancelled = true
       }
      })
     .catch(err => {
       setRedirectToLogin(true)
     })
  })

  // useEffect(() => {
  //  API.graphql({ query: getUser, variables: {id: userID }}).then(response => {
  //    if(response.data.getUser.availability) {
  //     setAvailabilities(response.data.getUser.availability)
  //   }
  //  })
  // }, []) // this should only run once

  function grabMeetingTimes(userID) {
    if(grabMeetings === true) {
      API.graphql({ query: getUser, variables: {id: userID }}).then(response => {
        if(response.data.getUser.matches) {
          var meetingTimes = []
          for(var i = 0; i < response.data.getUser.matches.length; i++) {
            API.graphql({ query: getMatch, variables: {id: response.data.getUser.matches[i] }}).then(response2 => {
              meetingTimes.push(response2.data.getMatch.upcoming_meeting)
            })
          }
          setMeetings(meetingTimes)
        }
      })
      setGrabMeetings(false)
    }
  }

  function grabAvailabilities(userID) {
    API.graphql({ query: getUser, variables: {id: userID }}).then(response => {
      if(response.data.getUser.availability) {
       setAvailabilities(response.data.getUser.availability)
      }
    })
    setFirstRun(false)
  }

  function onCalDateChange(selectedSlots) {
    setAvailabilities(selectedSlots)
  }

  function onMeetingCalChange(selectedSlots) {
    for(var i = 0; i < meetings.length; i++) {
      if(selectedSlots.indexOf(meetings[i]) === -1) {
        var temp = meetings[i]
        API.graphql({ query: getUser, variables: {id: userID }}).then(response => {
          if(response.data.getUser.matches) {
            for(var j = 0; j < response.data.getUser.matches.length; j++) {
              API.graphql({ query: getMatch, variables: {id: response.data.getUser.matches[j] }}).then(response2 => {
                if(response2.data.getMatch.upcoming_meeting === temp) {
                  var meetingObject = {student: '', company: '', time: response2.data.getMatch.upcoming_meeting}
                  API.graphql({ query: getUser, variables: {id: response2.data.getMatch.student }}).then(response3 => {
                    console.log(response3.data.getUser.firstName)
                    meetingObject['student'] = response3.data.getUser.firstName + ' ' + response3.data.getUser.lastName
                    API.graphql({ query: getUser, variables: {id: response2.data.getMatch.company }}).then(response3 => {
                      meetingObject['company'] = response3.data.getUser.organization
                      setMeetingToDisplay(meetingObject)
                      setDisplayMeeting(true)
                    })
                  })
                }
              })
            }
          }
        })
      }
    }
  }

  function switchView() {
   if(viewType === 'availabilities') {
     setViewType('meetings')
   }
   else {
     setViewType('availabilities')
     setGrabMeetings(true)
   }
  }

  function backToCal() {
    setDisplayMeeting(false)
  }

  async function submitAvailabilities() {
    await API.graphql({ query: updateUser, variables: {input: {id: userID, availability: availabilities }}}).then(response => {
     console.log('updated user availabilities')
    })
    window.location.reload()
  }

  function checkIfChanges() {
    API.graphql({ query: getUser, variables: {id: userID.toString() }}).then(response => {
      if(response.data.getUser.availability) {
        if(availabilities.sort().toString() === response.data.getUser.availability.sort().toString()) { // a hacky way of checking if they are equal
          setBtnDisabled(true)
        }
        else {
          setBtnDisabled(false)
        }
      }
      else if(!response.data.getUser.availability && availabilities.length > 0) {
        setBtnDisabled(false)
      }
      else {
        setBtnDisabled(true)
      }
    })
  }

  return (
    <div>
    {
      redirectToLogin === true && (
        <Redirect to= '/login' />
      )
    }
    {
      redirectToLogin === false && displayMeeting === true && (
        <div>
          <MainNav />
          <SideNav />
          <div id = 'displayedMeetingInfo'>
            <h3>Meeting Information</h3>
            <p><b>Student:</b> {meetingToDisplay.student}</p>
            <p><b>Company:</b> {meetingToDisplay.company}</p>
            <p><b>Time:</b> {meetingToDisplay.time}</p>
            <button onClick = {() => backToCal()}>Back to Calendar</button>
          </div>
        </div>
      )
    }
    {
      redirectToLogin === false && displayMeeting === false && viewType === 'availabilities' && (
        <div>
          <MainNav />
          <SideNav />
          <div id = 'calendarOnScreen'>
            <h2>Select Availabilities</h2>
            <ScheduleSelector
              selection = {availabilities}
              onChange = {onCalDateChange}
              numDays = {14}
              minTime = {9}
              maxTime = {17}
              hourlyChunks = {2}
              timeFormat = 'h:mm'
              unselectedColor = 'rgba(0, 216, 198, 0.3)'
              hoveredColor = 'rgba(0, 216, 198, 0.6)'
              selectedColor = 'rgba(0, 216, 198, 1)'
            />
          </div>
          <div id = 'sectionBesideCal'>
            <button className = "buttonBesideCal" onClick = {() => switchView()}>View Scheduled Meetings</button>
            <button
              className = "buttonBesideCal"
              //disabled = {btnDisabled}
              onClick = {() => submitAvailabilities()}>
              Submit Availabilities
            </button>
          </div>
        </div>
      )
    }
    {
      redirectToLogin === false && displayMeeting === false && viewType === 'meetings' && (
        <div>
          <MainNav />
          <SideNav />
          <div id = 'calendarOnScreen'>
            <h2>Scheduled Meetings</h2>
            <ScheduleSelector
              selection = {meetings}
              onChange = {onMeetingCalChange}
              numDays = {14}
              minTime = {9}
              maxTime = {17}
              hourlyChunks = {2}
              timeFormat = 'h:mm'
              unselectedColor = 'rgba(253, 97, 96, 0.3)'
              hoveredColor = 'rgba(253, 97, 96, 0.3)'
              selectedColor = 'rgba(253, 97, 96, 1)'
            />
          </div>
          <div id = 'sectionBesideCal'>
            <button className = "buttonBesideCal" onClick = {() => switchView()}>View/Set Availabilities</button>
          </div>
        </div>
      )
    }
    </div>
  )
}

export default CalendarComponent
