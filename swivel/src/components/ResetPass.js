/* Matching for companies, should be the default page after login */
//import { withAuthenticator } from 'aws-amplify-react';

import { Auth, Hub } from "aws-amplify";
import React, { useState, useEffect } from 'react'
import {Link, Redirect} from 'react-router-dom'
//will only work if verified_email = true


const initialForm = {userEmail: '', password: '', authCode: '', formType: 'enterEmail'}


const ResetPass = ( ) => {
   //let user = await Auth.currentAuthenticatedUser();
   const [form, updateForm] = useState(initialForm)
   const [redirectToLogin, setRedirectToLogin] = useState(false)
   const email = form['userEmail']
   const secret_code = form['authCode']
   const new_password = form['password']

   function onChange(e) {
      e.persist()
      updateForm(() => ({ ...form, [e.target.name]: e.target.value }))
    }



   async function sendReset(){
      Auth.forgotPassword(email)
         .then(data => console.log(data))
         .catch(err => console.log(err));
      updateForm(() => ({ ...form, formType: 'confirmReset' }))
   }

   async function confirmReset(){
      Auth.forgotPasswordSubmit(email,secret_code,new_password)
         .then(data => setRedirectToLogin(true))
         .catch(err => alert(err.message));
   }
      const { formType } = form
  return (

    <div className="reset-info">
    {
      redirectToLogin === true && (
        <Redirect to= '/login' />
      )
    }
    {
      formType === 'enterEmail' && (
        <div className="email-div">
          <h1 className="comp-heading1">Enter your email</h1>
          <input className = "login-box" type = "text" id = "email" name = 'userEmail' onChange = {onChange} type = "text" placeholder = "Email"/>
          <button className="reset-btn" id = "submit-btn" onClick = {() => sendReset()}>Send Email.</button>
        </div>
      )
    }
    {
      formType === 'confirmReset' && (
        <div className="pass-code">
          <h1 className="comp-heading1" id="verify-heading"> Enter code and new password. </h1>
          <div className="secret-code-input">
            <input className = "authCode-box" name = 'authCode' onChange = {onChange} type="text"/>
            <input className = "newPass-box" name = "password" onChange = {onChange} type = "text"/>
            <button className="verifysave-btn" id = "submit-btn" onClick = {() => confirmReset()}>Submit</button>
          </div>
          <p className="para-body" id="resend-para"> It may take a minute to receive your code. <br></br> Didn't receive a code. <a><u>Resend Mail</u></a></p>
        </div>
      )
    }

    </div>
  )
}

export default ResetPass
