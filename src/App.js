import React, { useState } from 'react';
import './App.css';
import NavBar from './NavBar';
import Routes from './Routes';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
  	const [userLoggedIn, setUserLoggedIn] = useState(null);
	return (
		<div className="App">
			<NavBar
				loggedIn={loggedIn}
				userLoggedIn={userLoggedIn}
			/>
      		<Routes
				setLoggedIn={setLoggedIn}
				userLoggedIn={userLoggedIn}
				setUserLoggedIn={setUserLoggedIn}
			/>
		</div>
	);
}

export default App;
