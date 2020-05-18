import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Dashboard = ({ history }) => {
	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		history.push('/');
	};
	return (
		<Fragment>
			<h1>Dashboard</h1>

			<Link to="/dashboard/addMember">Add Member</Link>
			<br />
			<br />
			<Link to="/dashboard/readMember">Read Member</Link>
			<br />
			<br />
			<button onClick={handleLogout}>Logout</button>
		</Fragment>
	);
};

export default Dashboard;
