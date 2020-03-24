import React from 'react';

// styles
import './App.css';
import 'react-notifications/lib/notifications.css'

// Libraries
import {Route,Switch} from 'react-router-dom'
import {NotificationContainer, NotificationManager} from 'react-notifications'

import Header from './components/header/header.comp'

// Pages
import Welcome from './pages/welcome/welcome.comp'
import Learn from './pages/learn/learn.comp'
import Login from './pages/login/login.comp'

import {auth} from './firebase/util'

class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       currentUser : null
    }
  
  }
  unSubscribe = null;

  componentDidMount () {
     this.unSubscribe = auth.onAuthStateChanged( async userAuth => {
      if (!userAuth){
          this.setState({currentUser : null})
      }else{
        console.log('User information--> ',userAuth)
        this.setState({currentUser : userAuth})
        NotificationManager.success('Successfully signed in!','Sign in',2000)
      }
      
    })
  }

  componentWillUnmount() {
    this.unSubscribe();
  }

  render(){

    return (
      <div className="App">
        <div className='container'>
          <Header currentUser = {this.state.currentUser}/>
          <NotificationContainer/>
          <Switch>
            
            <Route path='/welcome' component={Welcome} />
            <Route path='/learn' component={Learn} />
            <Route path='/login' component={Login} />
          
          </Switch>
        <Header currentUser = {this.state.currentUser}/>
        </div>
      </div>
    );
  }
  }

export default App;
