import { Component } from 'react';
import Particles from 'react-particles-js';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import WelcomeMsg from './components/WelcomeMsg/WelcomeMsg';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const particlesOptions = {
  "particles": {
      "number": {
          "value": 160,
          "density": {
              "enable": false
          }
      },
      "size": {
          "value": 3,
          "random": true,
          "anim": {
              "speed": 4,
              "size_min": 0.3
          }
      },
      "line_linked": {
          "enable": false
      },
      "move": {
          "random": true,
          "speed": 1,
          "direction": "top",
          "out_mode": "out"
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "bubble"
          },
          "onclick": {
              "enable": true,
              "mode": "repulse"
          }
      },
      "modes": {
          "bubble": {
              "distance": 250,
              "duration": 2,
              "size": 0,
              "opacity": 0
          },
          "repulse": {
              "distance": 200,
              "duration": 2
          }
      }
  }
};

 const initialState = {
  route: 'login',
  isLoggedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joiningDate: ''
  },
  input: '',
  imageURL: '',
  faceBoxes: [],
  isFaceDetected: null,
  hasError: false,
  errorMsg: null
 }

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  /*componentDidMount(){
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then(console.log)
      .catch(error => console.error('Error encountered: ', error));
  }*/

  onRouteChange = (route) => {
      if(route === 'home')
        this.setState({isLoggedIn: true});
      else
        this.setState(initialState);
      this.setState({route: route});

  }
  
  loadUser = (data) => {
    this.setState({user : {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joiningDate: data.joiningDate
    }})
  }
  
  calculateFaceBox = (regions) => {
    let boxes = [];
    const image = document.getElementById('inputImage');
    const width = image.width;
    const height = image.height;
    regions.forEach(region => {
      const celeb = region.data.concepts[0];
      const clarifaiFaceBox = region.region_info.bounding_box;
      boxes.push({
        topRow: clarifaiFaceBox.top_row * height,
        leftCol: clarifaiFaceBox.left_col * width,
        bottomRow: height - (clarifaiFaceBox.bottom_row * height),
        rightCol: width - (clarifaiFaceBox.right_col * width),
        celebName: celeb.name,
        celebPrecision: celeb.value
      });
    });
    this.setState({faceBoxes : boxes});
  }

  onInputChange= (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    fetch('http://localhost:3000/imageURL', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                imageURL: this.state.input
            })
    })
    .then(response => response.json())
    .then(response => {
      if(typeof(response)=== "string" && response.includes('Error')){
        this.setState({hasError:true, errorMsg: 'Oops something went wrong.. Try again!'});
        console.error("Error encountered:",response);
      }
      else if(response.outputs && response.outputs[0].data.regions){
        this.setState({errorMsg: null});
        const regions = response.outputs[0].data.regions;
        fetch('http://localhost:3000/imageEntry', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user: this.state.user,
                faces_detected: regions.length
            })
            })
            .then(response => response.json())
            .then(count => {
                this.setState(Object.assign(this.state.user,{entries: count}))      
            })
            .catch(error => {
              console.error('Error encountered: ', error);
              this.setState({hasError:true, errorMsg: 'Oops something went wrong.. Try again!'});
            });
        this.setState({isFaceDetected: true});
        this.calculateFaceBox(regions);
      } 
      else{
        this.setState({errorMsg: null});
        this.setState({faceBoxes: [], isFaceDetected: false});
      }
      })
      .catch(error => {
        console.error('Error encountered: ', error);
        this.setState({hasError:true, errorMsg: 'Oops something went wrong.. Try again!'});
      });
  }

  render(){
    const { imageURL, faceBoxes, isFaceDetected, route, isLoggedIn} = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions}/>
        <Navigation isLoggedIn={isLoggedIn} onRouteChange={this.onRouteChange}/>
        <Logo/>
        <ErrorBoundary hasError={this.state.hasError} errorMsg={this.state.errorMsg}>
        { 
          route === 'home' ? 
          <div>
            <WelcomeMsg name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition imageURL={imageURL} faceBoxes={faceBoxes} isFaceDetected={isFaceDetected}/>
          </div>
          : ( route === 'login' ? 
              <Login onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            : <Registration onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )
        }
        </ErrorBoundary>
        </div>
        
    );
  }
}

export default App;
