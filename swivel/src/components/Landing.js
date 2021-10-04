/* landing page (defaults to company side) */
import stud1 from "../images/student/landing_header.png"
import comp1 from "../images/company/landing_header.png"
import studBanner from "../images/student/company_banner.png"
import compBanner from "../images/company/uni_banner.png"

import studSec31 from "../images/student/section3_1.png"
import studSec32 from "../images/student/section3_2.png"
import studSec33 from "../images/student/section3_3.png"
import studSec3L from "../images/student/line.png"
import compSec31 from "../images/company/section3_1.png"
import compSec32 from "../images/company/section3_2.png"
import compSec33 from "../images/company/section3_3.png"
import compSec3L from "../images/company/line.png"

import studQuote from "../images/student/quotes.png"
import studEx1 from "../images/student/student1.jpeg"
import studEx2 from "../images/student/student2.jpeg"
import compQuote from "../images/company/quotes.png"
import compEx1 from "../images/company/logo1.png"
import compEx2 from "../images/company/logo2.png"

import computer from "../images/computer_outline.png"

import studSec6 from "../images/student/section6.png"
import compSec6 from "../images/company/section6.png"

import studIcon1 from "../images/student/clock.png"
import studIcon2 from "../images/student/video.png"
import studIcon3 from "../images/student/diamond.png"
import studIcon4 from "../images/student/smile.png"
import studIcon5 from "../images/student/matching.png"
import studIcon6 from "../images/student/noti_bell.png"

import compIcon1 from "../images/company/money.png"
import compIcon2 from "../images/company/incognito.png"
import compIcon3 from "../images/company/smile.png"
import compIcon4 from "../images/company/graph.png"
import compIcon5 from "../images/company/matching.png"
import compIcon6 from "../images/company/noti_bell.png"

import bottom from "../images/bottom.png"

import TopNav from './TopNav'

import {Link} from 'react-router-dom'


const Landing = () => {
  const userType = window.location.pathname;
      if(userType === "/students") {
        const sec1Info = "Many students don’t know their range of " +
                          " options when it comes to internships and full-time positions. "
        const sec1Info1 = "Our networking platform will personally connect you with opportunities " +
                          "at startups to help you reach your full potential."
        const sec1Heading = "Start making real impact now"

        const sec3Heading = "How Swivel can kickstart your career."
        const sec3p1Head = "Create your profile."
        const sec3p1 = "Take 2 minutes to create a personalized profile so we can find the best fit for you."

        const sec3p2Head = "Start matching."
        const sec3p2 = "Behind the scenes, our filtering algorithm will create a curated list of startups that we"+
                        " think are a good fit. Select the ones you are interested in."

        const sec3p3Head = "Unlock career opportunities."
        const sec3p3 = "Have one on one video conversations with startups to grow your network and accelerate your job hunt. "

        const sec4Heading = "What other students are saying."

        const rev1StudName = "Grace Demill, Comm ’20"
        const rev1StudSchool = "Queen's University"
        const rev1 = "Coming out of first year, I was surrounded by classmates who had already locked prestigious internships in"+
                      " Finance or CPG through personal connections. Anxious to find my “perfect fit” as a young professional, I"+
                      " came across the vibrant world of startups. was such a fantastic hands-on experience, and we need companies"+
                      " like Sw!vel to help fill the gap between students and startups."

        const rev2StudName = "Theo Bresolin, Eng ’20"
        const rev2StudSchool = "Queen's University"
        const rev2 = "When looking for full time work as a university student, the well-known, prestigious companies dominate campus"+
                      " events, job boards, LinkedIn, and even conversations with friends. Swivel is a great platform to not only see"+
                      " what other opportunities are out there but also find a true two-way fit."

        const sec5SubHead = "Have one on one video conversations with startups to grow your network and accelerate your job hunt."

        const table1Head = "Quick Onboarding."
        const table1Body = "Sign up and create your free profile within 2 minutes."

        const table2Head = "Instant Video Calls."
        const table2Body = "Connect via video call as soon as you match to create an elevated personal connection."

        const table3Head = "Access to Startups."
        const table3Body = "Get to know students as more than just a standard resume and cover letter. Customizable profiles will spark meaningful, unique conversations."

        const table4Head = "Personalized Profiles."
        const table4Body = "Let employers get to know you as more than just a resume. Customize what and how you want to convey yourself to employers."

        const table5Head = "AI Matching System."
        const table5Body = "Our matching system will continue to learn who you want to match with to produce relevant matches based on your interests, values, and skills."

        const table6Head = "Response System."
        const table6Body = "Our notification system and posted response rates and times ensure timely conversations."

        return[
          Section1(stud1, "stud-info1", sec1Info, sec1Info1, "stud-heading1", sec1Heading, "stud-join-btn"),
          Section2(studBanner),
          Section3(sec3Heading, "studStep", sec3p1Head, sec3p1, sec3p2Head, sec3p2, sec3p3Head, sec3p3, studSec31, studSec32, studSec33, studSec3L),
          Section4(sec4Heading, studQuote, rev1, studEx1, rev2, studEx2, "stud-review-from", rev1StudName, rev1StudSchool, rev2StudName, rev2StudSchool, "stud-quote"),
          Section5(computer, sec5SubHead),
          Section6Stud(studSec6),
          Section7(studIcon1, table1Head, table1Body, studIcon2, table2Head, table2Body,
                    studIcon3, table3Head, table3Body, studIcon4, table4Head, table4Body,
                    studIcon5, table5Head, table5Body, studIcon6, table6Head, table6Body),
          Section8(bottom, "bottom-stud-img", "bottom-stud-head", "stud-join-btn", "bottom-comp-btn", "Join now.")

        ]
      } else {
        const sec1Info = "Startups have a difficult time sourcing top, emerging talent in an efficient manner. "
        const sec1Info1 = "We are a machine learning, networking platform that personally connects you with relevant, "+
                          "high calibre students and recent graduates to help you find culture adds that match your hiring needs."
        const sec1Heading = "Build your team with emerging talent, anywhere, anytime."

        const sec3Heading = "How Swivel can help you source talent."
        const sec3p1Head = "Efficient Onboarding."
        const sec3p1 = "Take 2 minutes to create a personalized company profile so we can find you well suited student talent."

        const sec3p2Head = "Receive matches."
        const sec3p2 = "Behind the scenes, our matching algorithm will create a curated list of students that we think are a "+
                        "good fit for your hiring needs and company culture. Select the ones you are interested in and we will schedule a video call."

        const sec3p3Head = "Build student talent pipeline."
        const sec3p3 = "Have one on one video conversations with students and keep track of all potential hires on your dashboard."

        const sec4Heading = "What other companies are saying."

        const rev1 = "It becomes even more important for recruiters to understand talent beyond the resume to ensure a position is actually a good "+
                    "fit. Recruiters will need more information about talent in advance of making contact. That means they’ll need tools to better"+
                    " understand applicants’ needs and wants, in addition to their qualifications. It’s about seeing people, not candidates."

        const rev2 = "Those numbers reflect a classic tragedy of the commons — fueled by employers who are fishing ever farther into the sea of "+
                      "talent in search of job-ready workers rather than helping incumbents or younger, underserved, and underrepresented groups"+
                      " develop the skills they need to fill tomorrow’s roles."

        const sec5SubHead = "Meet unreachable segments and build your talent pipeline through one on one video conversations."

        const table1Head = "Grant Identification."
        const table1Body = "Knowing what grants student talent, nevertheless and your own company applies for can be difficult and timely to find. "+
                            "Swivel automates the identification and application for these grants."
        const table2Head = "Incognito Mode."
        const table2Body = "Reduce unconscious bias through turning on incognito mode to blindly select who you want to connect with."

        const table3Head = "Personalized Profiles."
        const table3Body = "Get to know students as more than just a standard resume and cover letter. Customizable profiles will spark meaningful, unique conversations."

        const table4Head = "Talent Pipeline Dashboard."
        const table4Body = "Efficiently build a talent pipeline with post call analytics and metrics."

        const table5Head = "AI Matching System."
        const table5Body = "Our matching system will drive long term employee fit through producing relevant matches based on your company’s interests, values, and skill requirements."

        const table6Head = "Response System."
        const table6Body = "Our notification system and posted response rates and times ensure timely conversations and will remind you of well suited talent when new positions open."


        return[
          Section1(comp1, "comp-info1", sec1Info, sec1Info1, "comp-heading1", sec1Heading, "comp-join-btn"),
          Section2(compBanner),
          Section3(sec3Heading, "compStep", sec3p1Head, sec3p1, sec3p2Head, sec3p2, sec3p3Head, sec3p3, compSec31, compSec32, compSec33, compSec3L),
          Section4(sec4Heading, compQuote, rev1, compEx1, rev2, compEx2, "comp-review-from"),
          Section5(computer, sec5SubHead),
          Section6Comp(compSec6),
          Section7(compIcon1, table1Head, table1Body, compIcon2, table2Head, table2Body,
                    compIcon3, table3Head, table3Body, compIcon4, table4Head, table4Body,
                    compIcon5, table5Head, table5Body, compIcon6, table6Head, table6Body),
          Section8(bottom, "bottom-comp-img", "bottom-comp-head", "comp-join-btn", "bottom-comp-btn", "Try it free.")
        ]
      }
}

const Section1 = ( image, info1Class, landingInfo1, landingInfo2, heading1Class, landingHeading1, btnClass ) => {
    return(
      <div className="landing-info">
        <TopNav />
        <img className="landing-img1" src={image} alt="heading_image"/>
        <h1 className={heading1Class}> {landingHeading1} </h1>
        <div className={info1Class}>
          <p> {landingInfo1} </p>
          <p> {landingInfo2} </p>
        </div>
        <Link className={btnClass} to="/signup">Join Now</Link>
      </div>
    )
}

const Section2 = ( image ) => {
  return(
    <div className="landing-info">
      <img className="banner-img" src={image} alt="banner"/>
    </div>
  )
}

const Section3 = ( sec3Heading, stepId, sec3p1Head, sec3p1, sec3p2Head, sec3p2, sec3p3Head, sec3p3, sec31Img, sec32Img, sec33Img, sec3L ) => {
  return(
    <div className="landing-info">
      <h1 className="section-header">{sec3Heading}</h1>
      <div className="steps">
        <div className="step"  id="step1">
          <div className="step1-elem step-info">
              <h3 className="step-head" id={stepId} > 1. </h3>
              <h3 className="step-head title"> {sec3p1Head} </h3>
              <p className="step-body"> {sec3p1} </p>
          </div>
          <div className="step1-elem">
            <img className="line" id="step1-line" src={sec3L} alt="line"/>
          </div>
          <div className="step1-elem">
            <img className="screenshot" id="step1-scrn" src={sec31Img} alt="screenshot1"/>
          </div>
        </div>
        <div className="step" id="step2">
          <div className="step2-elem">
            <img className="step2 screenshot" id="step2-scrn" src={sec32Img} alt="screenshot2" />
          </div>
          <div className="step2-elem">
            <img className="step2 line" id="step2-line" src={sec3L} alt="line" />
          </div>
          <div className="step2-elem step-info">
              <h3 className="step-head2" id={stepId} > 2. </h3>
              <h3 className="step-head2 title"> {sec3p2Head} </h3>
              <p id="step2-body"> {sec3p2} </p>
          </div>
        </div>

        <div className="step" id="step3">
          <div className="step3-elem step-info">
              <h3 className="step-head" id={stepId} > 3. </h3>
              <h3 className="step-head title"> {sec3p3Head} </h3>
              <p className="step-body"> {sec3p3} </p>
          </div>
          <div className="step3-elem">
            <img className="line" id="step3-line" src={sec3L} alt="line"/>
          </div>
          <div className="step3-elem">
            <img className="screenshot" id="step3-scrn" src={sec33Img} alt="screenshot3" />
          </div>

        </div>
      </div>
    </div>
  )
}

const Section4 = ( sec4Heading, quoteImg, rev1, rev1From, rev2, rev2From, reviewClass, stud1Head, stud1School, stud2Head, stud2School, quoteId) => {

  return(
    <div className="landing-info" id="section4">
      <img className="top-quote" src={quoteImg} alt="quotes"/>
      <h1 className="section-header" id="sec4-heading"> {sec4Heading} </h1>

      <div className="review" id="rev-div-1">
        <p className="review-content"> {rev1} </p>
        <img className="rev-from" id={reviewClass} src= {rev1From} alt="review_logo" />
        <div className="rev-from" id="stud-info">
          <h4 className="stud-head">{stud1Head}</h4>
          <p className="stud-school">{stud1School}</p>
        </div>
      </div>

      <div className="review" id="rev-div-2">
        <p className="review-content"> {rev2} </p>
        <img id={reviewClass} src= {rev2From} alt="review_logo" />
        <div className="rev-from" id="stud-info">
          <h4 className="stud-head">{stud2Head}</h4>
          <p className="stud-school">{stud2School}</p>
        </div>
      </div>
      <img className="bottom-quote" id={quoteId} src={quoteImg} alt="quotes"/>
    </div>
  )

}

const Section5 = ( computer, sec5SubHead ) => {
  return(
    <div className="landing-info">
      <h1 className="section-header">See Swivel in action.</h1>
      <p className="sub-header">{sec5SubHead}</p>
      <img className="computer-outline" src={computer} alt="mac" />
    </div>
  )
}

const Section6Comp = ( compSec6 ) => {
  return(
    <div className="landing-info">
      <img className="background" src={compSec6} alt="blob" />
      <div className="section6-para">
        <div className="para-div">
          <h2 className="para-head">Build your brand in the student community.</h2>
          <p className="para-body">
            Swivel provides an equal opportunity for firms of all sizes to
            get in direct contact with students, increasing your company’s brand recognition among the
            student population.
          </p>
        </div>
        <div className="para-div" id="para2">
          <h2 className="para-head">Find talent that are culture enhancers.</h2>
          <p className="para-body">
            A resume can be a difficult indicator as to whether or not a student will mesh well with your
            company. Swivel allows you to get to know students on a personal level, ensuring that your hire
            is a culture add, leading to long-term retention.
          </p>
        </div>
        <div className="para-div" id="para3">
          <h2 className="para-head">Convenient access to students from a wide range of universities.</h2>
          <p className="para-body">
            Swivel provides you with consolidated access to students from __ universities across Canada,
             saving you time and money from having partner with or attend career fairs at each university.
          </p>
        </div>
        <div className="para-div" id="para4">
          <h2 className="para-head">Enable diverse & equitable hiring.</h2>
          <p className="para-body">
            Unconscious biases can be hard to avoid. Whether you choose to use incognito mode or not,
             profile matching algorithm provides you with a wide range of diverse candidates.
          </p>
        </div>
      </div>
    </div>
  )
}

const Section6Stud = ( studSec6 ) => {
  return(
    <div className="landing-info">
      <img className="background" src={studSec6} alt="blob" />
      <h1 className="section-header" id="sec6-header">Connecting you with new opportunities.</h1>
      <div className="section6-para stud-para">
        <div className="para-div">
          <p className="para-head stud-head">We have observed.</p>
          <p className="para-body stud-body">
            Many students don’t know their range of options when it comes to internships and full-time
            positions. Your school’s career support can’t help with what you want, networks are hard
            with limited connections, and job boards, well they’re job boards.
          </p>
          <p className="para-body stud-body">
          ​ Building out your own network is the key the expanding your employment options.
          </p>
        </div>
        <div className="para-div" id="para2">
          <p className="para-head stud-head">We want to help.</p>
          <p className="para-body stud-body">
            Our networking platform will personally connect you with opportunities at startups
             to help you reach your full potential and kickstart your career.
          </p>
          <ul className="checkmarks">
            <li className="check-item"> Create two-way fit through personal conversations. </li>
            <li className="check-item"> Differentiate yourself as more than just a resume. </li>
            <li className="check-item"> Match with employers that have the same values as you. </li>
            <li className="check-item"> Receive timely responses from employers. </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const Section7 = (icon1, table1Head, table1Body, icon2, table2Head, table2Body,
                  icon3, table3Head, table3Body, icon4, table4Head, table4Body,
                  icon5, table5Head, table5Body, icon6, table6Head, table6Body) => {
  return(
    <div className="landing-info">
      <h1 className="section-header">Key Features</h1>
      <table className="features-table">
        <tr>
          <td>
            <img className="table-icon" src={icon1} alt="icon1" />
            <h5 className="table-head"> {table1Head} </h5>
            <p className="table-body"> {table1Body} </p>
          </td>
          <td>
            <img className="table-icon" src={icon2} alt="icon2" />
            <h5 className="table-head"> {table2Head} </h5>
            <p className="table-body"> {table2Body} </p>
          </td>
          <td>
            <img className="table-icon" src={icon3} alt="icon3" />
            <h5 className="table-head"> {table3Head} </h5>
            <p className="table-body"> {table3Body} </p>
          </td>
        </tr>
        <tr>
          <td>
            <img className="table-icon" src={icon4} alt="icon4" />
            <h5 className="table-head"> {table4Head} </h5>
            <p className="table-body"> {table4Body} </p>
          </td>
          <td>
            <img className="table-icon" src={icon5} alt="icon5" />
            <h5 className="table-head"> {table5Head} </h5>
            <p className="table-body"> {table5Body} </p>
          </td>
          <td>
            <img className="table-icon" src={icon6} alt="icon6" />
            <h5 className="table-head"> {table6Head} </h5>
            <p className="table-body"> {table6Body} </p>
          </td>
        </tr>

      </table>
    </div>
  )
}

const Section8 = (bottomImage, bottomImgId, bottomHeadId, bottomBtnClass, bottomBtnId, btnContent) => {
  return(
    <div className="landing-info">
      <img className="bottom-background" id={bottomImgId} src={bottomImage} alt="bottom"/>
      <h1 className="bottom-head" id={bottomHeadId}>Start Swiveling today.</h1>
      <Link className={bottomBtnClass} id={bottomBtnId} to="/signup">{btnContent}</Link>
    </div>
  )
}


export default Landing
