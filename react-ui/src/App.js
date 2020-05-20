import React, {Component} from 'react';
import './App.css';

import Navigation from './components/navigation/Navigation';
import Logo from './components/Logos/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignInForm from './components/SignInForm/SignInForm'
import Register from './components/Register/Register'

import Particles from 'react-particles-js';

const particleOptions = {
      particles: {
        number:{
          value: 100,
          density: {
            enable: true,
            value_area: 1000
          }
        }
}
}

const initialState = {
    input:'',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
  }
} 

class App extends Component{
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
  
  calculateFaceLocation = (data) => {
    const faceBox = data.outputs[0]
                    .data.regions[0]
                    .region_info
                    .bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: (faceBox.left_col) * width,
      topRow: height * (faceBox.top_row),
      rightCol: width - (faceBox.right_col * width),
      bottomRow: height - (faceBox.bottom_row * height) 
    }

  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState( {imageUrl: this.state.input} );
    fetch('https://polar-springs-76114.herokuapp.com/imageurl', {
          method: 'post',
          headers: { 'Content-Type' : 'application/json' },
          body: JSON.stringify({
            input: this.state.input
      })
    }).then(response => response.json())
      .then( response => {
        if(response) {
          fetch('https://polar-springs-76114.herokuapp.com/image', {
          method: 'put',
          headers: { 'Content-Type' : 'application/json' },
          body: JSON.stringify({
            id: this.state.user.id
      })
    }).then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, {entries: count}))
      })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))})
      .catch( err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
this.setState(initialState)
    }
    else if(route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route: route})
  }

  render() {
    const { isSignedIn, imageUrl, box, route } = this.state; 
    return(
        <div className="App">
       <Particles 
          className= 'particles'
          params={particleOptions} />
       <Navigation isSignedIn = {isSignedIn} 
                   onRouteChange = {this.onRouteChange} />
            {
            route === 'home'
              ? <div>
                <Logo />
                <Rank name = {this.state.user.name} 
                      entries = {this.state.user.entries} />
                <ImageLinkForm 
                 onInputChange = {this.onInputChange} 
                 onButtonSubmit = {this.onButtonSubmit} />
                <FaceRecognition 
                 box = {box} 
                 imageUrl = {imageUrl} />
              </div>
              :(
                route === 'signin'
                ?<SignInForm
                  loadUser = {this.loadUser}
                  onRouteChange = {this.onRouteChange} />
                : <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
                )
           }
        </div>
      );
    }
  }

export default App;
   