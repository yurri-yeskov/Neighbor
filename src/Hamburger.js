import React, { Component } from 'react'
import {DebounceInput} from 'react-debounce-input'

class Hamburger extends Component {

 state = {
    hamburger: false
  }

  hamburger = () => {
    console.log(this.state.hamburger)
    if (this.state.hamburger){
      this.props.hamburger(false)
      this.setState({hamburger: false})
    }else{
      this.setState({hamburger: true})
      this.props.hamburger(true)
    }
    console.log(this.state.hamburger)
  }

  render() {
    return (
      <div className="hamburger" onClick={this.hamburger}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    )
  }
}

export default Hamburger