import {Component} from 'react'
import Cookies from 'js-cookie'

import {withRouter} from 'react-router-dom'

import './index.css'

class Header extends Component {
  render() {
    const onClickLogOut = () => {
      const {history} = this.props
      Cookies.remove('jwt_token')
      history.replace('/ebank/login')
    }
    return (
      <nav className="nav-header">
        <div className="nav-content">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <button type="button" onClick={onClickLogOut}>
            Logout
          </button>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
