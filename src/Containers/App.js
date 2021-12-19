import './App.css';
import React, { useState } from 'react';
import Navigation from '../Components/Navigation/Navigation'
import Logo from '../Components/Logo/Logo'
import ImageLinkForm from '../Components/ImageLinkForm/ImageLinkForm'
import Ranking from '../Components/Ranking/Ranking'
import FaceDetection from '../Components/FaceDetection/FaceDetection'
import SignIn from '../Components/SignIn/SignIn'
import Register from '../Components/Register/Register'
import Particles from 'react-tsparticles'

const App = () => {
  const [input, setInput] = useState('');
  const [url, setUrl] = useState('');
  const [boxs, setBoxs] = useState([]);
  const [route, setRoute] = useState('signin');
  const [user, setUser] = useState({id: 0, name: '', email: '', entries: 0, joined: ''});

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  }

  const calculateFacePosition = (data) => {
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

  const displayBox = (boxs) => {
    setBoxs(boxs);
  }

  const onBtnSubmit = () => {
    setUrl(input);
    fetch('https://dattruong196nt-smartbrain-be.herokuapp.com/imageUrl', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({url: input}),
    })
    .then(resp => resp.json())
    .then(data => {
      fetch('https://dattruong196nt-smartbrain-be.herokuapp.com/image', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: user.id}),
      })
      .catch(console.log);
      console.log({data});
      const boxArr = data.rawData.outputs[0].data.regions;
      console.log({boxArr});
      displayBox(calculateFacePosition(data));
      // setUser(...Object.assign(user, {entries: user.entries + 1}))
    })
    .catch(console.log);
  }

  const onSignOut = () => {
    setUser({});
  }

  const onRouteChange = (route) => {
    setRoute(route);
  }

  const routeRendering = (route) => {
    switch (route) {
      case 'signin':
        return <SignIn onRouteChange={onRouteChange} loadUser={loadUser}/>
      case 'register':
        return <Register onRouteChange={onRouteChange} loadUser={loadUser}/>
      case 'home':
      default:
        return (
          <>
            <Logo/>
            <Ranking username={user.name} entries={user.entries}/>
            <ImageLinkForm updateUrl={(event) => setInput(event.target.value)} submitBtn={onBtnSubmit}/>
            <FaceDetection boxs={boxs} imageUrl={url}/>
          </>
        )
    }
  }

  return (
    <>
      <Particles className='particles'/>
      <Navigation route={route} onRouteChange={onRouteChange} onSignOut={onSignOut}/>
      {routeRendering(route)}
    </>
  );
}

export default App;
