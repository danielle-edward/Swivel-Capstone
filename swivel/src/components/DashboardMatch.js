import ZoomLogoComp from "../images/company/zoomlogo.png"
import ZoomLogoStud from "../images/student/zoomlogo.png"

const DashboardMatch = ({ userType, matchType, name, line2, line3, email, meeting }) => {
  return (
    <div className="match-box">
        <p className="match-content" id="match-name"> { name } </p>
        <p className="match-content" id="match-line2"> { line2 } </p>
        <p className="match-content" id="match-line3"> { line3 } </p>
        <p className="match-content" id="match-line4"> { email } </p>

        {
          matchType === "upcoming" && (
            <div className="zoom-meeting">
            {
              userType === false && (
                <img className="meeting-content" id="zoom-logo" src={ZoomLogoStud} alt="zoom_logo" />
              )
            }
              <p className="meeting-content" id="meeting-time"> { meeting } </p>
            </div>
          )
        }
        <div className="match-bottom">

        </div>
    </div>
  )
}

export default DashboardMatch
