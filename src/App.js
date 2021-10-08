import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
initializeAuthentication();
function App() {
  const [user, setUser]= useState({});
  const handlegooglesignin= ()=>{
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
    .then (result =>{
      const {displayName, email, photoURL} = result.user;
      const logedInUser = {
        name: displayName,
        email: email,
        photo:photoURL
      }
      setUser(logedInUser);
    })
  }
    const handlegithubsignin= ()=>{
      const auth = getAuth();
      signInWithPopup(auth, githubProvider)
      .then(result =>{
        const {displayName, email, photoURL}=result.user;
        const logedInUser = {
          name: displayName,
          email: email,
          photo:photoURL
        }
        setUser(logedInUser);
      })
    }
    const handleSignOut=()=>{
      const auth = getAuth();
      signOut(auth)
      .then( ()=>{
        setUser({});
      })
    }
  
  return (
    <div className="App">
     {!user.name ?
       <div>
     <button onClick={handlegooglesignin}>Google sign in</button>
     <button onClick={handlegithubsignin}>Github Sign In</button>
     </div>:
     <button onClick={handleSignOut}>Sign Out</button>}
     <br/>
     {
       user.email && <div>
       <h2>Welcome {user.name}</h2>
       <p>I know your email address: {user.email}</p>
       <img src={user.photo} alt="" />
       </div>
     }
    </div>
  );
}

export default App;
