import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
// import Signin from './components/Signin/Signin';
// import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const app = new Clarifai.App({
  apiKey: '563cc83db8b24ec5b69fc4444a662d53'
});

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}



class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      ImageUrl: '',
      // box: {},
      // route: 'signin',
      // isSignedIn: false,
      // user: {
      //   id: '',
      //   name: '',
      //   email: '',
      //   entries: 0,
      //   joined: ''
      // }
    }
  }
///
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
  // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
  // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
  // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
  // is to use a different version of their model that works like: `c0c0ac362b03416da06ab3fa36fb58e3`
  // so you would change from:
  // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  // to:
  // .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].regions_info.bounding_box);
      },
      function(err) {
        //
      }
    );
  }
      

  render() {
    return (
      <div className="App"> 
        <Particles className='particles'
          params={{particlesOptions}} 
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={this.state.ImageUrl} />
      </div>
    );
  }
}

export default App;
