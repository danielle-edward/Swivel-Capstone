import NoMatImg from "../images/nomatches.png"

const NoMatches = ({ title }) => {
  return (
    <div className="tab-content">
      <p className="no-matches"> You currently have no {title} matches. Get swiping! </p>
      <img className="no-matches-img" src={NoMatImg} alt="no_matches"/>
    </div>
  )
}

export default NoMatches
