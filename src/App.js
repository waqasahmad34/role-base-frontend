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
import NotFound from './components/notFound/NotFound';
import RegisterLink from './components/registerLink/RegisterLink';

function App() {
	return (
		<Fragment>
			<Router>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/registration/:userId/:token" component={RegisterLink} />
					<PrivateRoute exact path="/dashboard" component={Dashboard} />
					<PrivateRoute exact path="/dashboard/addMember" component={AddMember} />
					<PrivateRoute exact path="/dashboard/readMember" component={ReadMember} />
					<Route path="*" component={NotFound} />
				</Switch>
			</Router>
		</Fragment>
	);
}

export default App;
