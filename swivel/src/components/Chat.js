import MainNav from './MainNav'
import SideNav from './SideNav'

const Chat = ( ) => {
  /*
  The chat function is accessed from inside the dashboard (it's a button when they click on a persons name)
  This isn't crucial at the moment, but there should be a lot of information on it online, probaby pretty cut and paste 
   */
  return (
    <div>
      <MainNav />
      <SideNav />
    </div>
  )
}

export default Chat
