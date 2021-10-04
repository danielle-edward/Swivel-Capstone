//import ZoomLogoComp from "../images/company/zoomlogo.png"
//import ZoomLogoStud from "../images/student/zoomlogo.png"
import PlaceholderImg from "../images/placeholder.png"

const MatchCard = ({ userType, userInfo, end, index }) => {

  if(userType == false){
    var colorId = "stud-title"
    var tSkillId = "stud-techSkill"
    var sSkillId = "stud-softSkill"
    var benefitId = "stud-ben"
  }
  else {
    var colorId = "comp-title"
    var tSkillId = "comp-techSkill"
    var sSkillId = "comp-softSkill"
    var benefitId = "comp-ben"
  }

  if(index < end){
    var techSkills = userInfo.tech
    var softSkills = userInfo.soft
    var values = userInfo.values
    var benefits = userInfo.benefits

    var techList = techSkills.map(function(tech){
                  return <p className="techSkills" id={tSkillId}> { tech } </p>
                })

    var softList = softSkills.map(function(soft){
                  return <p className="softSkills" id={sSkillId}> { soft } </p>
                })
    var index = 0
    var valueValue = ["Flexibility", "Diversity", "Innovation", "Customers", "Authenticity", "Accountability", "Sustainability", "Purpose", "Quality", "Curiosity", "Generosity", "Collaboration"]

    console.log(values)
    var valueList = values.map(function(val){
                // only show most valued attributes
                if(val > 7){
                  index += 1
                  return <p className="valueClass" id={tSkillId}> { valueValue[index] } </p>
                }
                index += 1
                })

    var benefitList = benefits.map(function(ben){
                  return <p className="benefitsClass" id={benefitId}> { ben } </p>
                })
  }


  return (
    <div className="matchcard-box">
    {
      //index > end && (
        <div className="matching">
        {
          userType === false && (
            <div>
              <div className="matching-one">
                <img className="profile-pic" src={PlaceholderImg} alt="profile_pic" />
                <p className="one-title" id="name"> { userInfo.name } </p>
                <p className="info" id="line1"> { userInfo.position + ", " + userInfo.org }  </p>
                <p className="info" id="line2"> { userInfo.loc } </p>
                <p className="info" id="line3"> { userInfo.bio } </p>
              </div>
              <div className="matching-two">
                <div className="left-two">
                  <p className="two-title" id={colorId}> General Info. </p>
                  <p className="infoTwo"> { userInfo.companySize } </p>
                  <p className="infoTwo"> { userInfo.website } </p>
                </div>
                <div className="right-two">
                  <p className="two-title" id={colorId}> Company Purpose. </p>
                  <p className="infoTwo"> { userInfo.about } </p>
                </div>
              </div>
              <div className="matching-three">
                <div className="left-three">
                  <p className="three-title" id={colorId}> Looking For. </p>
                  <div className="skills">
                    <p className="tech-skills"> { techList } </p>
                    <p className="soft-skills"> { softList } </p>
                  </div>
                </div>
                <div className="right-three">
                  <p className="three-title" id={colorId}> Company Values. </p>
                  <p className="values"> { valueList } </p>
                </div>
              </div>
              <div className="matching-four">
                <div className="left-four">
                  <p className="four-title" id={colorId}> Life At { userInfo.org }. </p>
                  <p className="infoFour"> { userInfo.life } </p>
                </div>
                <div className="right-four">
                  <p className="values"> { benefitList } </p>
                </div>
              </div>
            </div>
          )
        }
        </div>
      //)
    }
    </div>
  )
}

export default MatchCard
