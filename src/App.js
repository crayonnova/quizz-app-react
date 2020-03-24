import React from 'react';
import {Route,Switch} from 'react-router-dom'
import './App.css';

import Header from './components/header/header.comp'

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

        this.setState({currentUser : userAuth})
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
          <Switch>
            
            <Route path='/welcome' component={Welcome} />
            <Route path='/learn' component={Learn} />
            <Route path='/login' component={Login} />
          
          </Switch>
        </div>
      </div>
    );
  }
  }

export default App;
