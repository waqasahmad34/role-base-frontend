import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard';
import AddMember from './components/dashboard/AddMember';
import ReadMember from './components/dashboard/ReadMember';
import PrivateRoute from './components/privateRoute/PrivateRoute';

function App() {
	return (
		<Fragment>
			<Router>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/register" component={Register} />
					<PrivateRoute exact path="/dashboard" component={Dashboard} />
					<PrivateRoute exact path="/dashboard/addMember" component={AddMember} />
          <PrivateRoute exact path="/dashboard/readMember" component={ReadMember} />
				</Switch>
			</Router>
		</Fragment>
	);
}

export default App;
