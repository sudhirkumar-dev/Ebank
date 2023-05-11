import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
