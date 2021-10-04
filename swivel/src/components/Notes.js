import MainNav from './MainNav'
import SideNav from './SideNav'

const Notes = ( ) => {
  /*
  Notes is pretty similar to chat -- it's accessed through the dashboard and it's associted with a particular match.
  It doesn't have to be incredibly detailed (no need for extensive formatting options) but it should let people write
  new notes and see ones they've taken before.

  It's a button off a match in the dashboard, so it could just be a little pop up div that they can edit 
   */
  return (
    <div>
      <MainNav />
      <SideNav />
    </div>
  )
}

export default Notes
