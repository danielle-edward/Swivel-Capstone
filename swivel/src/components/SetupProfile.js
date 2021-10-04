import {NavLink, Link, Redirect} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
//import {NavLink} from 'react-router-dom'
import logo_full from '../images/Logo_Full.png'

import Amplify, { API, Auth, Hub, graphqlOperation } from 'aws-amplify'
import { updateUser } from '../graphql/mutations'
import { listUsers } from '../graphql/queries'


const initialForm = {position: '', company_size: '', located: '', website: '', alumn: '', about: '', life_at:'', bio: '', tech_skills: '', soft_skills: '', benefits: '', employment_type: ''}

const SetupProfile = () => {
  const [selection, updateSelection] = useState('')
  const [value1, onChange1] = useState(0);
  const [value2, onChange2] = useState(0);
  const [value3, onChange3] = useState(0);
  const [value4, onChange4] = useState(0);
  const [value5, onChange5] = useState(0);
  const [value6, onChange6] = useState(0);
  const [value7, onChange7] = useState(0);
  const [value8, onChange8] = useState(0);
  const [value9, onChange9] = useState(0);
  const [value10, onChange10] = useState(0);
  const [value11, onChange11] = useState(0);
  const [value12, onChange12] = useState(0);
  const a = [value1, value2, value3, value4, value5, value6, value7, value8, value9, value10, value11, value12];

  const [form, updateForm] = useState(initialForm)
  const [userID, setUserID] = useState(false)
  const [userType, setUserType] = useState(false)

  const techList = []
  const softList = []
  const benList = []
  const empList = []
  const highList = []


  function onChange(e) {
    if(e === "benefits"){
      updateForm(() => ({ ...form, benefits: benList }))
    } else if(e === "skills"){
      updateForm(() => ({ ...form, tech_skills: techList, soft_skills: softList, employment_type: empList }))
      console.log(form.tech_skills)

    } else {
      try{
      e.persist()
      //if(e.target.name === "")
      updateForm(() => ({ ...form, [e.target.name]: e.target.value }))
    } catch(err){
      console.log(err)
    }
    }

  }


  useEffect(()=>{
    let isCancelled = false
    Auth.currentSession()
      .then(currUser => {
        var userID = currUser['idToken']['payload']['sub']
        setUserID(userID)
        if(currUser['idToken']['payload']['custom:student'] === '1'){
          setUserType(false)
        } else {
          setUserType(true)
        }
        const ele = document.querySelectorAll(".slider-bubble");
        if (ele){
          var c = 0;
          ele.forEach(function(h){
            h.style.marginLeft = a[c] * 51.5 + 130 + 'px';
            c ++;
          });
        }
        const eles = document.querySelectorAll(".slider");
        var total = 0;
        eles.forEach(function(i){
          total += parseInt(i.value);
        });
        const points = document.querySelector("#slide-points");
        if (points){
          if (80 - total >= 0){
            points.style.color = "black";
          } else {
            points.style.color = "red";
          }
          points.innerHTML = 80 - total;
        }
        }).catch(err => {
        //(true)
        console.log(err)
      })
  }, [a])

  function OnClickStep1(e) {
    updateSelection('step1')
  }

  function OnClickStep2(e) {
    updateSelection('step2')
  }

  function OnClickStep3(e) {
    updateSelection('step3')
    onChange(e) // benefits

  }

  function OnClickStep4(e) {
    updateSelection('step4')
    onChange(e)
  }

  function toggleButtonState(e){

  }

  function backToSelection(e) {
    updateSelection('')
  }

  function updateList(listType, listVal){
      if(listType === "benefits")
        benList.push(listVal)
      else if(listType === "techSkills"){
        techList.push(listVal)
        console.log(techList)
      }
      else if(listType === "softSkills")
        softList.push(listVal)
      else if(listType === "employmentType")
        empList.push(listVal)
      else
        highList.push(listVal)


  }

  async function createInfo(){
    if(userType === true){
      console.log(userType)
      await API.graphql({ query: listUsers, variables: {typeOfUser: "Student"}}).then(usersInfo => {
        var usersData = usersInfo.data.listUsers.items;
        (async () => {
          var allUsersIDs = []
          for(var key in usersData){
            if(usersData[key].typeOfUser === "Student")
              allUsersIDs.push(usersData[key].id)
          }
          console.log(techList)
          await API.graphql({ query: updateUser, variables: {input: {id: userID,
                                                                      position: form.position,
                                                                      company_size: form.company_size,
                                                                      located: form.located,
                                                                      website: form.website,
                                                                      alumn: form.alumn,
                                                                      values: a,
                                                                      about: form.about,
                                                                      life_at: form.life_at,
                                                                      bio: form.bio,
                                                                      benefits: form.benefits,
                                                                      tech_skills: form.tech_skills,
                                                                      soft_skills: form.soft_skills,
                                                                      employment_type: form.employment_type,
                                                                      liked: [""],
                                                                      skipped: [""],
                                                                      notSeen: allUsersIDs,
                                                                      initialSetupDone: true
                                                                      }}}).then(response => {
            console.log("updated")
          }).catch(err => {
            console.log("update err", err)
          })
        })()
      }).catch(err => {
        console.log("listUsers", err)
      })
    } else {
      await API.graphql({ query: listUsers, variables: {typeOfUser: "Company"}}).then(usersInfo => {
        var usersData = usersInfo.data.listUsers.items;
        (async () => {
          var allUsersIDs = []
          for(var key in usersData){
            if(usersData[key].typeOfUser === "Company")
              allUsersIDs.push(usersData[key].id)
          }

          await API.graphql({ query: updateUser, variables: {input: {id: userID,
                                                                      degree: form.degree,
                                                                      major: form.major,
                                                                      location: form.location,
                                                                      grad_year: form.grad_year,
                                                                      values: a,
                                                                      benefits: form.benefits,
                                                                      tech_skills: form.tech_skills,
                                                                      soft_skills: form.soft_skills,
                                                                      employment_type: form.employment_type,
                                                                      highlights: highList,
                                                                      special: form.special,
                                                                      liked: [""],
                                                                      skipped: [""],
                                                                      notSeen: allUsersIDs,
                                                                      initialSetupDone: true
                                                                      }}}).then(response => {
            console.log("updated")
          }).catch(err => {
            console.log(err)
          })
        })()
      }).catch(err => {
        console.log(err)
      })
    }

  }

  return (
    <div className = "body">
      <div className='landing-nav'>
        <NavLink exact to="/" className="nav-btn-logo"><img className="nav-logo" src={logo_full} alt="Swivel_Logo" /></NavLink>
        <NavLink activeStyle={{ fontWeight: "bold" }} exact to="/login" className="nav-btn" id="setup-save">Save and exit.</NavLink>
        <NavLink activeStyle={{ fontWeight: "bold" }} exact to="/dashboard" className="nav-btn"><u>skip</u></NavLink>
      </div>
      <div>
        {
          (selection == "step1" || selection == "") && (
          <div className = "setup-content" id = "step_1">
            <div className="setup-nav" id="setup-nav">
              <button className="setup-nav-btn active" onClick = {() => OnClickStep1()}> <div className = "setup-nav-nbr active"> 1 </div> General information</button>
              <button className="setup-nav-btn" onClick = {() => OnClickStep2()}> <div className = "setup-nav-nbr"> 2 </div> About your company</button>
              <button className="setup-nav-btn" onClick = {() => OnClickStep3()}> <div className = "setup-nav-nbr"> 3 </div> What you're looking for</button>
              <button className="setup-nav-btn" onClick = {() => OnClickStep4()}> <div className = "setup-nav-nbr"> 4 </div> About you</button>
            </div>
            <h1 className = "setup-h1">Step 1</h1>
            <h2 className = "setup-h2">Getting Started</h2>

            {
              userType === true && (
                <div>
                  <p className = "setup-sub">What is your position?</p>
                  <input className ="step1-box" id = "position-box" name="position" onChange={onChange} type = "text" placeholder = "Position"/>
                  <p className = "setup-sub">What is your company size?</p>
                  <select id = "size-box" name="company_size" onChange={onChange}>
                      <option>11-50</option>
                      <option>51-200</option>
                      <option>201-500</option>
                      <option>501-1000</option>
                      <option>1001-5000</option>
                  </select>
                  <p className = "setup-sub" id = "location-text">Where are you located? </p>
                  <input className ="step1-box" name="located" onChange={onChange} id = "location-box" type = "text" placeholder = "Location"/>
                  <p className = "setup-sub">What is your company's website? </p>
                  <input className ="step1-box" name="website" onChange={onChange} id = "website-box" type = "text" placeholder = "Website"/>
                  <p className = "setup-sub">What post secondary/graduate school did you attend?</p>
                  <input className ="step1-box" name="alumn" onChange={onChange} id = "school-box" type = "text" placeholder = "Education"/>
                  <label>
                    <p></p>
                    <input type = "checkbox" id = "no-school-check"/>
                    Prefers not to say
                  </label>
                  <hr />
                </div>
              )
            }
            {
              userType === false && (
                <div>
                  <p className = "setup-sub">What is your degree?</p>
                  <input className ="step1-box" id = "position-box" name="degree" onChange={onChange} type = "text" placeholder = "Bachelor of Applied Sciences"/>
                  <p className = "setup-sub">What is your major / specification </p>
                  <input className ="step1-box" name="major" onChange={onChange} id = "website-box" type = "text" placeholder = "Mechanical Engineering"/>
                  <p className = "setup-sub" id = "location-text">Where are you located? </p>
                  <input className ="step1-box" name="location" onChange={onChange} id = "location-box" type = "text" placeholder = "Toronto, ON"/>
                  <p className = "setup-sub">What is your graduation year? </p>
                  <select id = "size-box" name="grad_year" onChange={onChange}>
                      <option>2021</option>
                      <option>2022</option>
                      <option>2023</option>
                      <option>2024</option>
                      <option>2025</option>
                  </select>
                  <hr />
                </div>
              )
            }
            <button className="setup-next" onClick = {() => OnClickStep2()}>→</button>
          </div>
          )
        }
        {
          selection == "step2" && (
            <div className = "setup-content" id = "step_2">
            <div className="setup-nav" id="setup-nav">
              <button className="setup-nav-btn" onClick = {() => OnClickStep1()}> <div className = "setup-nav-nbr"> 1 </div> General information</button>
              <button className="setup-nav-btn" onClick = {() => OnClickStep2()}> <div className = "setup-nav-nbr active"> 2 </div> About your company</button>
              <button className="setup-nav-btn" onClick = {() => OnClickStep3()}> <div className = "setup-nav-nbr"> 3 </div> What you're looking for</button>
              <button className="setup-nav-btn" onClick = {() => OnClickStep4()}> <div className = "setup-nav-nbr"> 4 </div> About you</button>
            </div>

              <h1 className = "setup-h1">Step 2</h1>
              <h2 className = "setup-h2">Getting There</h2>
              {
                userType === true &&(
                  <p className = "setup-sub">What are your company's values?</p>
                )
              }
              {
                userType === false &&(
                  <p className = "setup-sub">What are your personal values?</p>
                )
              }
              <p id = "slidertop">Please distribute <b>80 points</b> to what your company values most. Hover over value of description of value.</p>

              <div className = "slidercounter">
                <p>Points Left:</p>
                <p id = "slide-points">80</p>
              </div>
              <div className = "slidecontainer">
                <p className = "sliderfront">Flexibility </p>  <p className ="slider-zero">0 </p>
                <input type="range" min="0" max="10" defaultValue="0" className="slider" value  = {value1} onChange = {({target:{value:radius}}) => {onChange1(radius)}} id="flexibility"/>
                <div className="slider-bubble"> {value1} </div>
                <p className = "sliderback">10</p>
              </div>
              <div className = "slidecontainer">
                <p className = "sliderfront">Diversity</p>
                <p className ="slider-zero">0</p>
                <input type="range" min="0" max="10" defaultValue="0" className = "slider" value  = {value2} onChange = {({target:{value:radius}}) => {onChange2(radius)}} id="diversity-slider"/>
                <div className="slider-bubble"> {value2} </div>
                <p className = "sliderback">10</p>
              </div>
              <div className = "slidecontainer">
                <p className = "sliderfront">Innovation</p>  <p className ="slider-zero">0 </p>
                <input type="range" min="0" max="10" defaultValue="0" className = "slider" value  = {value3} onChange = {({target:{value:radius}}) => {onChange3(radius)}} id="Innovation-slider"/>
                <div className="slider-bubble"> {value3} </div>
                <p className = "sliderback">10</p>
              </div>
              <div className = "slidecontainer">
                <p className = "sliderfront">Customers</p>  <p className ="slider-zero">0 </p>
                <input type="range" min="0" max="10" defaultValue="0" className = "slider" value  = {value4} onChange = {({target:{value:radius}}) => {onChange4(radius)}} id="Customers-slider"/>
                <div className="slider-bubble"> {value4} </div>
                <p className = "sliderback">10</p>
              </div>
              <div className = "slidecontainer">
                <p className = "sliderfront">Authenticity</p>  <p className ="slider-zero">0 </p>
                <input type="range" min="0" max="10" defaultValue="0" className = "slider" value  = {value5} onChange = {({target:{value:radius}}) => {onChange5(radius)}} id="Authenticity-slider"/>
                <div className="slider-bubble"> {value5} </div>
                <p className = "sliderback">10</p>
              </div>
              <div className = "slidecontainer">
                <p className = "sliderfront">Accountability</p>  <p className ="slider-zero">0 </p>
                <input type="range" min="0" max="10" defaultValue="0" className = "slider" value = {value6} onChange = {({target:{value:radius}}) => {onChange6(radius)}}  id="Accountability-slider"/>
                <div className="slider-bubble"> {value6} </div>
                <p className = "sliderback">10</p>
              </div>
              <div className = "slidecontainer">
                <p className = "sliderfront">Sustainability</p>  <p className ="slider-zero">0 </p>
                <input type="range" min="0" max="10" defaultValue="0" className = "slider" value = {value7} onChange = {({target:{value:radius}}) => {onChange7(radius)}} id="Sustainability-slider"/>
                <div className="slider-bubble"> {value7} </div>
                <p className = "sliderback">10</p>
              </div>
              <div className = "slidecontainer">
                <p className = "sliderfront">Purpose</p>  <p className ="slider-zero">0 </p>
                <input type="range" min="0" max="10" defaultValue="0" className = "slider" value = {value8} onChange = {({target:{value:radius}}) => {onChange8(radius)}} id="Purpose-slider"/>
                <div className="slider-bubble"> {value8} </div>
                <p className = "sliderback">10</p>
              </div>
              <div className = "slidecontainer">
                <p className = "sliderfront">Quality</p>  <p className ="slider-zero">0 </p>
                <input type="range" min="0" max="10" defaultValue="0" className = "slider" value = {value9} onChange = {({target:{value:radius}}) => {onChange9(radius)}} id="Quality-slider"/>
                <div className="slider-bubble"> {value9} </div>
                <p className = "sliderback">10</p>
              </div>
              <div className = "slidecontainer">
                <p className = "sliderfront">Curiousity</p>  <p className ="slider-zero">0 </p>
                <input type="range" min="0" max="10" defaultValue="0" className = "slider" value = {value10} onChange = {({target:{value:radius}}) => {onChange10(radius)}} id="Curiousity-slider"/>
                <div className="slider-bubble"> {value10} </div>
                <p className = "sliderback">10</p>
              </div>
              <div className = "slidecontainer">
                <p className = "sliderfront">Generosity</p>  <p className ="slider-zero">0 </p>
                <input type="range" min="0" max="10" defaultValue="0" className = "slider" value = {value11} onChange = {({target:{value:radius}}) => {onChange11(radius)}} id="Generosity-slider"/>
                <div className="slider-bubble"> {value11} </div>
                <p className = "sliderback">10</p>
              </div>
              <div className = "slidecontainer">
                <p className = "sliderfront">Collaboration</p>  <p className ="slider-zero">0 </p>
                <input type="range" min="0" max="10" defaultValue="0" className = "slider" value = {value12} onChange = {({target:{value:radius}}) => {onChange12(radius)}} id="Collaboration-slider"/>
                <div className="slider-bubble"> {value12} </div>
                <p className = "sliderback">10</p>
              </div>
              <hr />
              {
                userType === false && (
                  <div>
                    <h3 className = "setup-h3">What employee benefits and perks are you looking for?</h3>
                    <p>What are the additional benefits and perks that you think make a company unique and a desirable to work at?</p>
                  </div>
                )
              }
              {
                userType === true && (
                  <div>
                    <h3 className = "setup-h3">Do you offer any employee benefits and perks?</h3>
                    <p>What are the additional benefits and perks that make your company unique and a desirable company to work at?</p>
                  </div>
                )
              }

              <p>Please select all that apply</p>
              <table className = "setup-table">
                <tr className = "setup-table-header">
                  <th>
                    Health, Wellness, Inclusion
                  </th>
                  <th>
                    Pay & Vacation
                  </th>
                  <th>
                    Giving Back, Growth, Schedule, Tech
                  </th>
                  <th>
                    Office & Culture
                  </th>
                </tr>
                <tr>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Wellness & Mental Health Programs")} type = "checkbox" id = ""/>
                    Wellness & Mental Health Programs
                    </label>
                  </td>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Vacation/Paid Time Off")} type = "checkbox" id = ""/>
                    Vacation/Paid Time Off
                    </label>
                  </td>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "CSR Initiatives")} type = "checkbox" id = ""/>
                      CSR Initiatives
                      </label>
                  </td>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Recreational Clubs")} type = "checkbox" id = ""/>
                      Recreational Clubs
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Diversity Programs")} type = "checkbox" id = ""/>
                      Diversity Programs
                    </label>
                  </td>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Tuition Reimbursement")} type = "checkbox" id = ""/>
                      Tuition Reimbursement
                    </label>
                  </td>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Volunteer Time")} type = "checkbox" id = ""/>
                      Volunteer Time
                    </label>
                  </td>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Company Outings")} type = "checkbox" id = ""/>
                    Company Outings
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Health, Dental and Vision Package")} type = "checkbox" id = ""/>
                    Health, Dental, Vision Package
                    </label>
                  </td>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Corporate Discounts")} type = "checkbox" id = ""/>
                    Corporate Discounts
                    </label>
                  </td>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Employee Growth Programs")} type = "checkbox" id = ""/>
                    Employee Training & Growth Programs
                    </label>
                  </td>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Happy Hours")} type = "checkbox" id = ""/>
                    Happy Hours
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Disability Insurance")} type = "checkbox" id = ""/>
                    Disability Insurance
                    </label>
                  </td>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Performance Bonus")} type = "checkbox" id = ""/>
                    Performance Bonus
                    </label>
                  </td>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Remote")} type = "checkbox" id = ""/>
                    Remote Work Opportunities
                    </label>
                  </td>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Pet-friendly")} type = "checkbox" id = ""/>
                    Pet-friendly Environment
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Gym Memberships")} type = "checkbox" id = ""/>
                    Gym Memberships/Fitness Stipend
                    </label>
                  </td>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Stock Purchase Plan")} type = "checkbox" id = ""/>
                    Employee Stock Purchase Plan
                    </label>
                  </td>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Flexible Hours")} type = "checkbox" id = ""/>
                    Flexible Schedule/Hours
                    </label>
                  </td>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Snacks and Drinks")} type = "checkbox" id = ""/>
                    Stocked Kitchen (Snacks & Drinks)
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Meditation Rooms")} type = "checkbox" id = ""/>
                    Onsite Gym/Meditation Rooms
                    </label>
                  </td>
                  <td>
                    <label>
                    </label>
                  </td>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "State-of-the-art Technology")} type = "checkbox" id = ""/>
                    State-of-the-art Technology
                    </label>
                  </td>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Casual Dress")} type = "checkbox" id = ""/>
                    Casual Dress
                    </label>
                  </td>
                </tr>
                 <tr>
                  <td>
                    <label>
                    </label>
                  </td>
                  <td>
                    <label>
                    </label>
                  </td>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Technology Stipends")} type = "checkbox" id = ""/>
                    Technology Stipends
                    </label>
                  </td>
                  <td>
                    <label>
                    <input onChange= {() => updateList("benefits", "Location")} type = "checkbox" id = ""/>
                    Location (Accessible by Public Transit)
                    </label>
                  </td>
                </tr>
              </table>
              <hr />
              <button className="setup-last" onClick = {() => OnClickStep1()}>←</button>
              <button className="setup-next" onClick = {() => OnClickStep3("benefits")}>→</button>
            </div>
          )
        }
        {
          selection == "step3" && (
            <div className = "setup-content" id = "step_3">
              <div className="setup-nav" id="setup-nav">
                <button className="setup-nav-btn" onClick = {() => OnClickStep1()}> <div className = "setup-nav-nbr"> 1 </div> General information</button>
                <button className="setup-nav-btn" onClick = {() => OnClickStep2()}> <div className = "setup-nav-nbr"> 2 </div> About your company</button>
                <button className="setup-nav-btn active" onClick = {() => OnClickStep3()}> <div className = "setup-nav-nbr active"> 3 </div> What you're looking for</button>
                <button className="setup-nav-btn" onClick = {() => OnClickStep4()}> <div className = "setup-nav-nbr"> 4 </div> About you</button>
              </div>
              <h1 className = "setup-h1">Step 3</h1>
              <h2 className = "setup-h2">Almost Done</h2>
              {
                userType === true && (
                  <p className = "setup-sub">What technical skills are you looking for?</p>
                )
              }
              {
                userType === false && (
                  <p className = "setup-sub">What technical skills do you have?</p>
                )
              }
              <p className = "setup-h3">Computer Science</p>
              <table className = "setup-table">
                <tr>
                  <td>
                    <button className="skill-btn" onClick= {() => updateList("techSkills", "Web Dev")} id = "web-skill">Web Dev</button>
                  </td>
                  <td>
                    <button className="skill-btn" onClick= {() => updateList("techSkills", "Mobile Dev")} id = "mobile-skill">Mobile Dev</button>
                  </td>
                  <td>
                    <button className="skill-btn" onClick= {() => updateList("techSkills", "AI")} id = "ai-skill">AI</button>
                  </td>
                  <td>
                    <button className="skill-btn" onClick= {() => updateList("techSkills", "Front End")} id = "front-skill">Front End</button>
                  </td>
                  <td>
                    <button className="skill-btn" onClick= {() => updateList("techSkills", "Back End")} id = "back-skill">Back End</button>
                  </td>
                  <td>
                    <button className="skill-btn" onClick= {() => updateList("techSkills", "Cloud Computing")} id = "cloud-computing">Cloud Computing</button>
                  </td>
                </tr>
                <tr>
                <td>
                    <button className="skill-btn" onClick= {() => updateList("techSkills", "Data Science")} id = "data-sci">Data Science</button>
                  </td>
                  <td>
                    <button className="skill-btn" onClick= {() => updateList("techSkills", "DevOps")} id = "dev-op">DevOps</button>
                  </td>
                  <td>
                    <button className="skill-btn" onClick= {() => updateList("techSkills", "Virtualization")} id = "virtual">Virtualization</button>
                  </td>
                  <td>
                    <button className="skill-btn" onClick= {() => updateList("techSkills", "Blockchain")} id = "blockchain">Blockchain</button>
                  </td>
                  <td>
                    <button className="skill-btn" onClick= {() => updateList("techSkills", "Software Architecture")} id = "softarc">Software Architecture</button>
                  </td>
                  <td>
                    <button className="skill-btn" onClick= {() => updateList("techSkills", "Unit Testing")} id = "unit-test">Unit Testing</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button className="skill-btn" onClick= {() => updateList("techSkills", "Operating Systems")} id = "oper-skill">Operating Systems</button>
                  </td>
                  <td>
                    <button className="skill-btn" onClick= {() => updateList("techSkills", "Network Security")} id = "network-skill">Network Security</button>
                  </td>
                  <td>
                    <button className="skill-btn" onClick= {() => updateList("techSkills", "IoT")} id = "IOT-skill">IOT</button>
                  </td>
                  <td>
                    <button className="skill-btn" onClick= {() => updateList("techSkills", "AR/VR")} id = "AR-skill">AR/VR</button>
                  </td>
                  <td>
                    <button className="skill-btn" onClick= {() => updateList("techSkills", "Quality Assurance")} id = "quality-skill">Quality Assurance</button>
                  </td>
                  <td>
                    <button className="skill-btn" onClick= {() => updateList("techSkills", "Command Line")} id = "command-skill">Command Line</button>
                  </td>
                </tr>
                </table>
                <p className = "setup-h3"> Engineering </p>
                <table className = "setup-table">
                  <tr>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Electronic Eng")} id = "Electronic-skill">Electronic Eng</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Electric Eng")} id = "Electric-skill">Electric Eng</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Linear Algebra")} id = "linear-skill">Linear Algebra</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Mathematics")} id = "math-skill">Mathematics</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Robotics")} id = "Robot-skill">Robotics</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "CAD")} id = "CAD-skill">CAD</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Circuitry")} id = "Circuit-skill">Circuitry</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "CNC")} id = "CNC-skill">CNC</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Machining")} id = "Machine-skill">Machining</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Fluid Modelling")} id = "Fluid-skill">Fluid Modelling</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Sensoring")} id = "Sensor-skill">Sensoring</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "MATLAB")} id = "MATLAB-skill">MATLAB</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Advanced Physics")} id = "advance-skill">Advanced Physics</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Nanotechnology")} id = "nano-skill">Nanotechnology</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Infrastructural Design")} id = "infra-skill">Infrastructural Design</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Inventory Management")} id = "Inventory-skill">Inventory Management</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Equipment Diagnostics")} id = "equipment-skill">Equipment Diagnostics</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Troubleshooting")} id = "trouble-skill">Troubleshooting</button>
                    </td>
                  </tr>
                </table>

                <p className = "setup-h3"> Commerce </p>
                <table className = "setup-table">
                  <tr>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "AI")} id = "sales-skill">Salesforce/CRMs</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Online Accounting")} id = "online-skill">Online Accounting</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Statistics")} id = "stat-skill">Statistics</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "eCommerce")} id = "ecomm-skill">eCommerce</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Analytical Reasoning")} id = "anal-skill">Analytical Reasoning</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Social Media")} id = "Social-skill">Social Media</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Sales")} id = "Sales-skill">Sales</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "AI")} id = "AB-skill">A/B Testing</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Mind Mapping")} id = "Mind-skill">Mind Mapping</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Survey Software")} id = "Survey-skill">Survey Software</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Data Analysis")} id = "Data-skill">Data Analysis</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Project Management")} id = "Project-skill">Project Management</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "SEO/SEM")} id = "SEO-skill">SEO/SEM</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Business Analyst")} id = "business-skill">Business Analysis</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "CMS")} id = "CMS-skill">CMS</button>
                    </td>
                  </tr>
                </table>

                <p className = "setup-h3"> Design </p>
                <table className = "setup-table">
                  <tr>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "UI")} id = "UI-skill">UI</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "UX")} id = "UX-skill">UX</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Photoshop")} id = "photoshop-skill">Photoshop</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "InDesign")} id = "Indesign-skill">InDesign</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Wireframing")} id = "wire-skill">Wireframing</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Video Production")} id = "video-skill">Video Production</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Brand Development")} id = "brand-skill">Brand Development</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "Illustrator")} id = "illus-skill">Illustrator</button>
                    </td>
                  </tr>
                </table>
              <hr />
              {
                userType === true && (
                  <p className = "setup-sub">What soft skills are you looking for in an employee?</p>
                )
              }
              {
                userType === false && (
                  <p className = "setup-sub">What soft skills do you have?</p>
                )
              }

                <table className = "setup-table">
                  <tr>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("techSkills", "AI")} id = "leader-skill">Leadership</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("softSkills", "Adaptability")} id = "adapt-skill">Adaptability</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("softSkills", "Creativity")} id = "create-skill">Creativity</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("softSkills", "Communication")} id = "comm-skill">Communication</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("softSkills", "Execution")} id = "execution-skill">Execution</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("softSkills", "Detail Oriented")} id = "detail-skill">Detail Oriented</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("softSkills", "Critical Thinking")} id = "critical-skill">Critical Thinking</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("softSkills", "Decision Making")} id = "decision-skill">Decision Making</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("softSkills", "Persuasion")} id = "persua-skill">Persuasion</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("softSkills", "Collaboration")} id = "collab-skill">Collaboration</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("softSkills", "Organization")} id = "organ-skill">Organization</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("softSkills", "Conflict Resolution")} id = "conflict-skill">Conflict Resolution</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("softSkills", "Emotional Intelligence")} id = "emotional-skill">Emotional Intelligence</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("softSkills", "Open-mindedness")} id = "open-skill">Open-mindedness</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("softSkills", "Self-starter")} id = "self-skill">Self-starter</button>
                    </td>
                  </tr>
                </table>
                <hr />
                <p className = "setup-sub">Employment Type?</p>
                <p>What position length are you looking for? Please select all that apply.</p>
                <table className = "setup-table">
                  <tr>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("employmentType", "Full Time")} id = "full-time">Full Time</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("employmentType", "Internship/Co-op")} id = "intern">Internship/Co-op</button>
                    </td>
                    <td>
                      <button className="skill-btn" onClick= {() => updateList("employmentType", "Contract Work")} id = "contract">Contract Work</button>
                    </td>
                  </tr>
                </table>
                <hr />
              <button className="setup-last" onClick = {() => OnClickStep2()}>←</button>
              <button className="setup-next" onClick = {() => OnClickStep4("skills")}>→</button>
            </div>
          )
        }
        {
          selection == "step4" && (
            <div className = "setup-content" id = "step_4">
              <div className="setup-nav" id="setup-nav">
                <button className="setup-nav-btn" onClick = {() => OnClickStep1()}> <div className = "setup-nav-nbr"> 1 </div> General information</button>
                <button className="setup-nav-btn" onClick = {() => OnClickStep2()}> <div className = "setup-nav-nbr"> 2 </div> About your company</button>
                <button className="setup-nav-btn" onClick = {() => OnClickStep3()}> <div className = "setup-nav-nbr"> 3 </div> What you're looking for</button>
                <button className="setup-nav-btn active" onClick = {() => OnClickStep4()}> <div className = "setup-nav-nbr active"> 4 </div> About you</button>
              </div>
              <h1 className = "setup-h1">Step 4</h1>
              <h2 className = "setup-h2">Last step.</h2>
              {
                userType === true && (
                  <div>
                    <p className = "setup-sub">Tell us about your company.</p>
                    <p>In 100 words or less</p>
                    <textarea className ="setup-textarea" name="about" onChange={onChange} id = "company_intro" type = "text" maxLength = "100"/>
                    <p className = "setup-sub">What is life like at your company.</p>
                    <p>In 100 words or less</p>
                    <textarea className ="setup-textarea" name="life_at" onChange={onChange} id = "company_life" type = "text" maxLength = "100"/>
                    <p className = "setup-sub">Tell us about yourself.</p>
                    <p>In 100 words or less</p>
                    <textarea className ="setup-textarea" name="bio" onChange={onChange} id = "company_about" type = "text" maxLength = "100"/>
                    <hr />
                  </div>
                )
              }
              {
                userType === false && (
                  <div>
                    <p className = "setup-sub">What are your top 3 resume highlights?</p>
                    <p>In 100 words or less</p>
                    <textarea className ="setup-textarea" name="highlight0" onChange= {() => updateList("highlights", onChange)} id = "company_intro" type = "text" maxLength = "100"/>
                    <textarea className ="setup-textarea" name="highlight1" onChange= {() => updateList("highlights", onChange)} id = "company_life" type = "text" maxLength = "100"/>
                    <textarea className ="setup-textarea" name="highlight2" onChange= {() => updateList("highlights", onChange)} id = "company_about" type = "text" maxLength = "100"/>
                    <p className = "setup-sub">Tell us something that isn't on your resume.</p>
                    <p>This is your space to wow! What is something unexpected about you.</p>
                    <textarea className ="setup-textarea" name="special" onChange= {onChange} id = "company_intro" type = "text" maxLength = "100"/>
                    <hr />
                  </div>
                )
              }
              <button className="setup-last" onClick = {() => OnClickStep3()}>←</button>
              {
                //<Link to="/dashboard" id = "finish-setup" onClick = {() => createInfo()} className="setup-next">→</Link>
              }
              <button id = "finish-setup" onClick = {() => createInfo()} className="setup-next">→</button>


            </div>
          )
        }
      </div>
    </div>
  )
}

export default SetupProfile
