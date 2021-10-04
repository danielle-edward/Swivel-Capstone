import React, { Component } from 'react'
import SearchImg from "../images/searchimg.png"

class Search extends Component {
 state = {
   query: '',
 }

 handleInputChange = () => {
   this.setState({
     query: this.search.value
   })
 }

 render() {
   return (
     <div className="connections-content" id="search-bar-div">
       <form className="search-bar">
       <img className="search-icon" src={SearchImg} alt="search"/>
         <input
           className="search-input"
           placeholder="Search Name..."
           ref={input => this.search = input}
           onChange={this.handleInputChange}
         />
       </form>
     </div>
   )
 }
}

export default Search
