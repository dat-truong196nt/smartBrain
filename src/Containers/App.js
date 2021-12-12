import './App.css';
import React, { Component } from 'react';
import Navigation from '../Components/Navigation/Navigation'
import Logo from '../Components/Logo/Logo'
import ImageLinkForm from '../Components/ImageLinkForm/ImageLinkForm'
import Ranking from '../Components/Ranking/Ranking'
import FaceDetection from '../Components/FaceDetection/FaceDetection'
import SignIn from '../Components/SignIn/SignIn'
import Register from '../Components/Register/Register'
import Particles from 'react-tsparticles'
import Clarifai from 'clarifai'

const app = new Clarifai.App({
  apiKey: 'aaf71315bf854f6895f2a76c9a71a794'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      url: '',
      boxs: [],
      route: 'signin',
    }
  }

  calculateFacePosition = (data) => {
    const boxArr = data.rawData.outputs[0].data.regions;
    const image = document.getElementById('imgToDetect');

    return boxArr.map(region => {
        let bounding_box = region.region_info.bounding_box;
        return {
          top: bounding_box.top_row * image.height,
          bottom: (1 - bounding_box.bottom_row) * image.height,
          left: bounding_box.left_col * image.width,
          right: (1 - bounding_box.right_col) * image.width,
        };
      }
    )
  }

  displayBox (boxs) {
    this.setState({boxs});
  }

  updateUrl = (event) => {
    this.setState({input: event.target.value});
  }

  onBtnSubmit = () => {
    this.setState({url: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input,
    )
    .then(response => this.displayBox(this.calculateFacePosition(response)))
    .catch(err => console.log);
  }

  onRouteChange = (route) => {
    this.setState({route});
  }

  routeRendering (route) {
    switch (route) {
      case 'signin':
        return <SignIn onRouteChange={this.onRouteChange}/>
      case 'register':
        return <Register onRouteChange={this.onRouteChange}/>
      case 'home':
      default:
        return (
          <>
            <Logo/>
            <Ranking/>
            <ImageLinkForm updateUrl={this.updateUrl} submitBtn={this.onBtnSubmit}/>
            <FaceDetection boxs= {this.state.boxs} imageUrl={this.state.url}/>
          </>
        )
    }
  }

  render() {
    return (
      <>
        <Particles className='particles'/>
        <Navigation route={this.state.route} onRouteChange={this.onRouteChange}/>
        {this.routeRendering(this.state.route)}
      </>
    );
  }
}

export default App;
