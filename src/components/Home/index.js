import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <h1>Your Flexibility, Our Excellence</h1>
        <div className="image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
          />
        </div>
      </div>
    </>
  )
}
export default Home
