import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../Firebase/firebase";
import './ProfileDropDown.css'

class ProfileDropDown extends Component {
  constructor() {
    super();
    
    this.state = {
      showMenu: false,
    };
    
  }
  
  showMenu = () => {

    
    this.setState({ showMenu: true });

  }
  
  closeMenu = () => {
    this.setState({ showMenu: false });
  }

  render() {
    return (
      <div>
        <button onClick={this.showMenu}>
          {<FontAwesomeIcon icon={faCaretDown} />}
        </button>
        
        {
          this.state.showMenu
            ? (
              <div className="dropdown-menu">
                <button onClick={logout}> Logout </button>
                <button> Menu item 3 </button>
                <button onClick={this.closeMenu}>close</button>
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}

export default ProfileDropDown
