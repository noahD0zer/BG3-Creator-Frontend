import React, { useState, Fragment, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import './index.css'

import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert';
import Header from './components/shared/Header';
import RequireAuth from './components/shared/RequireAuth';
import Home from './components/Home';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import SignOut from './components/auth/SignOut';
import Account from './components/auth/Account';
import background from './background.jpg';

// Import the Character components
import CreateCharacter from './components/character/CreateCharacter';
import CharacterList from './components/character/CharacterList';
import CharacterDetail from './components/character/CharacterDetail';

var sectionStyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center', // Center the background image
  // Set the height to 100vh to cover the full viewport height
  height: '100vh',
}

const App = () => {
  const [user, setUser] = useState(null);
  const [msgAlerts, setMsgAlerts] = useState([]);

  useEffect(() => {
		// access localStorage
		const loggedInUser = localStorage.getItem('user')
		// console.log('the loggedInUser', loggedInUser)

		if (loggedInUser) {
			// we need to parse our JSON string
			const foundUser = JSON.parse(loggedInUser)

			setUser(foundUser)
		}
	}, [])

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('user')
  };

  const deleteAlert = (id) => {
    setMsgAlerts((prevState) => {
      return prevState.filter((msg) => msg.id !== id);
    });
  };

  const msgAlert = ({ heading, message, variant }) => {
    const id = uuid();
    setMsgAlerts(() => {
      return [{ heading, message, variant, id }];
    });
  };

  return (
    <Fragment>

      <div style={sectionStyle}>

        <Header user={user} />

        <Routes>
          <Route path="/" element={<CharacterList msgAlert={msgAlert} user={user} />} />
          
          <Route
            path="/sign-up"
            element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
          />
          
          <Route
            path="/sign-in"
            element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
          />
          
          <Route
            path="/sign-out"
            element={
              <RequireAuth user={user}>
                <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
              </RequireAuth>
            }
          />
          
          <Route
            path="/account"
            element={
              <RequireAuth user={user}>
                <Account msgAlert={msgAlert} user={user} />
              </RequireAuth>
            }
          />
          
          <Route
            path="/create-character"
            element={
              <RequireAuth user={user}>
                <CreateCharacter msgAlert={msgAlert} user={user} />
              </RequireAuth>
            }
          />
          
          <Route
            path="/character-list"
            element={
              <RequireAuth user={user}>
                <CharacterList msgAlert={msgAlert} user={user} />
              </RequireAuth>
            }
          />
          
          <Route
            path="/characters/:id"
            element={<CharacterDetail  user={user} msgAlert={msgAlert} />}
          />
          
          <Route
            path="/home"
            element={
              <RequireAuth user={user}>
                <Home msgAlert={msgAlert} user={user} />
              </RequireAuth>
            }
          />
        
        </Routes>
        
        {msgAlerts.map((msgAlert) => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={deleteAlert}
          />
        ))}
      
      </div>
    
    </Fragment>
  );
};

export default App;
