import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginForm extends Component {
  state = {
    pin: '',
    userId: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangePin = e => {
    this.setState({pin: e.target.value})
  }

  onChangeUserId = e => {
    this.setState({userId: e.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async e => {
    e.preventDefault()
    const {pin, userId} = this.state
    const userCredentials = {pin, userId}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    console.log(response)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPinField = () => {
    const {pin} = this.state
    return (
      <>
        <label htmlFor="password">Pin</label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={pin}
          onChange={this.onChangePin}
        />
      </>
    )
  }

  renderUserIdField = () => {
    const {userId} = this.state
    return (
      <>
        <label htmlFor="user_id">User ID</label>
        <input
          type="text"
          id="user_id"
          className="user_id-input-field"
          value={userId}
          onChange={this.onChangeUserId}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <form className="app-container">
        <div className="login-app-container">
          <div className="img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-img"
            />
          </div>
          <form className="form-container">
            <h1>Welcome back!</h1>
            <div className="input-container">{this.renderUserIdField()}</div>
            <div className="input-container">{this.renderPinField()}</div>
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      </form>
    )
  }
}
export default LoginForm
