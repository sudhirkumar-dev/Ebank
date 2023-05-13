import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginForm extends Component {
  state = {
    userPin: '',
    userId: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangePin = e => {
    this.setState({userPin: e.target.value})
  }

  onChangeUserId = e => {
    this.setState({userId: e.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async e => {
    e.preventDefault()
    const {userPin, userId} = this.state
    const userCredentials = {userPin, userId}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      mode: 'cors',
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
    const {userPin} = this.state
    return (
      <>
        <label htmlFor="userPin">Pin</label>
        <input
          type="password"
          id="userPin"
          className="password-input-field"
          value={userPin}
          onChange={this.onChangePin}
          placeholder="Enter PIN"
        />
      </>
    )
  }

  renderUserIdField = () => {
    const {userId} = this.state
    return (
      <>
        <label htmlFor="userId">User ID</label>
        <input
          type="text"
          id="userId"
          className="user_id-input-field"
          value={userId}
          onChange={this.onChangeUserId}
          placeholder="Enter User ID"
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
      <div className="app-container">
        <div className="login-app-container">
          <div className="img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-img"
            />
          </div>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <h1>Welcome back!</h1>
            <div className="input-container">{this.renderUserIdField()}</div>
            <div className="input-container">{this.renderPinField()}</div>
            <button type="submit">Login</button>
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
