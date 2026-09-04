import React, {Component} from 'react';
import './App.css';
import Navigation from './Navigation.js';
import FaceRecognition from './FaceRecognition';
import Logo from './Logo';
import ImageLinkForm from './ImageLinkForm';
import Rank from './Rank';
import Signin from './Signin';
import Register from './Register';

 /*const returnrRequestOptions=(imageURL) =>{
          // This is the API code that I copy pasted
          const PAT = '9a9408b5ad2d4afaacf626f12c1f2c7d';
          // Specify the correct user_id/app_id pairings
          // Since you're making inferences outside your app's scope
          const USER_ID = 'anshulmittal';       
          const APP_ID = 'faceDetectionAPI';
          // Change these to whatever model and image URL you want to use
          const MODEL_ID = '';
          const IMAGE_URL = imageURL;

          // Now we are setting up the json that we are going to send to the clarifai
          const raw = JSON.stringify({
              "user_app_id": {
              "user_id": USER_ID,
              "app_id": APP_ID
              },
              "inputs": [{
                      "data": {
                          "image": {
                          "url": IMAGE_URL
                          } // Image bracket closed
                      } // Data bracket closed 
              }] // Input bracket closed
        }); // Raw bracket closed
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: raw
        };
        return requestOptions
      } // returnrRequestOption*/


class App extends Component{
  constructor(){
    super();
    this.state={
      input:'', // This input will store the value of the url entered by the user
      imageURL:'', // This will be passed on the onclick event so that it can further be passed to the facerecognition component
      box: {}, // This will contain the values that we will receive from the API
      route: 'signin',
      isSignedIn: false,
      user:{
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: new Date()
      }
    }
  } // constructor bracket
  // loadUser is also passed to the register component.
  loadUser = (data) =>{
    this.setState({
      user:{
        id:data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }
  componentDidMount(){
    fetch('http://localhost:3000/')
    .then(response => response.json())
    .then(console.log)
   
  }

  calculateFaceLocation=(data)=>{
      // now here we will use the coordinates that we received from the API 
      console.log("Under App component, calculateFaceLocation function", data);
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      // Now we need some DOM Manipulation
      // We are creating a const here and we are grabbing the image from the facerecognition component.
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      console.log("Under App component, calculateFaceLocation function", width,height);
      return{
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col*width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
  }
  // This function of the class will take the box parameters (the return value from the above function)
    displayFaceBox = (box)=>{
        console.log("Under App component, displayFaceBox function", box);
        this.setState({box: box});
    }
  // we are doing this because we want to change the value of the state as soon as the user enteres something in the text box.
  // We also need to pass this function as a prop to the image link form becuase it is at that location this function will be called.
  onInputChange = (event)=>{
      console.log('------------------------------------------------------');
      console.log('I am being called in the onInputChange function in the App.js');
      this.setState({input: event.target.value});
      console.log(this.state.input);
      console.log('------------------------------------------------------');
  }

  // We are creating this so that this can be passed as props to the imageLinkform component.
  // We are doing this becuase we want to do soemthing on the button click
  onSubmit =() => {
      this.setState ({imageURL: this.state.input})
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log('I am being called in the onSubmit function in the App.js');
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
     console.log("https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs", returnrRequestOptions(this.state.input));
      fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs", returnrRequestOptions(this.state.input))
          .then(response => response.json())
      //.then(result=>console.log(result)) if you want to see the full response.
      //  .then(result=>console.log(result.outputs[0].data.regions[0].region_info.bounding_box))
      // the above will give us the coordinates of the face detected in the image by the API
        .then(result=>{
            if(result){
                fetch('http://localhost:3000/image', {
                    method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
            })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          }
          this.displayFaceBox(this.calculateFaceLocation(result))
          })
        .catch(err => console.log(err))
        }
  onRouteChange = (route) => {
    if(route==='signout'){
      this.setState({isSignedIn: false});
    }else if(route ==='home'){
      this.setState({isSignedIn: true})
    }
  this.setState({route: route});
}
  render(){
    return (
        <div className="App">
          {/*Components that we need to use*/}
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} /> {/* We will place the sign in and sign out button over here*/}
          
          
          
            { // wrapping everything in jsx format becuase we have to use signin condition now
              this.state.route==='home'
              ? <div> 
                  <Logo />  {/* This component will take care of the logo part of the application */}
                  <Rank name = {this.state.user.name} entries = {this.state.user.entries} /> {/* This component will give us the username  and our rank compared to all the other users that have submitted the pictures */}
                  <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} /> {/*This component is needed to enter the image url so that face can be detected */}
                  <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
                </div>

              :(
                  this.state.route==='signin' || this.state.route==='signout' ?
                  <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                  :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
                )
              
               
            }
        </div>
    );
  } //Render bracket closed
} //Class bracket closed

export default App;