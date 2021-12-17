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

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      url: '',
      boxs: [],
      route: 'signin',
      user: {
        id: 0,
        name: '',
        email: '',
        entries: 0,
        joined: '',
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    }});
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
    let {user, input} = this.state;

    this.setState({url: input});
    fetch('http://localhost:3000/imageUrl', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({url: input}),
    })
    .then(response => {
      fetch('http://localhost:3000/image', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: user.id}),
      })
      .catch(console.log);
      this.displayBox(this.calculateFacePosition(response));
      this.setState(Object.assign(user, {entries: user.entries + 1}))
    })
    .catch(console.log);
  }

  onSignOut = () => {
    this.setState({user: {}});
  }

  onRouteChange = (route) => {
    this.setState({route});
  }

  routeRendering (route) {
    switch (route) {
      case 'signin':
        return <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
      case 'register':
        return <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
      case 'home':
      default:
        return (
          <>
            <Logo/>
            <Ranking username={this.state.user.name} entries={this.state.user.entries}/>
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
        <Navigation route={this.state.route} onRouteChange={this.onRouteChange} onSignOut={this.onSignOut}/>
        {this.routeRendering(this.state.route)}
      </>
    );
  }
}

export default App;
