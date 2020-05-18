import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({ history }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ msg, setMsg ] = useState('');
	console.log('history: 0-', history);
	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			history.push('/dashboard');
		} else {
			localStorage.clear();
		}
	}, []);

	const handleLogin = (e) => {
		e.preventDefault();
		axios
			.post(
				'http://localhost:5000/api/users/login',
				{
					email,
					password
				},
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			.then((response) => {
				const { token, id, name, email,create, read, del, update, role } = response && response.data;
                localStorage.setItem('accessToken', token);
                localStorage.setItem('userId', id);
                localStorage.setItem('name', name);
                localStorage.setItem('email', email);
                localStorage.setItem('role', role);
                localStorage.setItem('create', create);
                localStorage.setItem('read', read);
                localStorage.setItem('update', update);
                localStorage.setItem('delete', del);
				toast.success('You are logged in successfuly!');
				history.push('/dashboard');
			})
			.catch((error) => {
				toast.error('Some thing wrong!');
				console.log('error is: ', error);
				history.push('/');
			});
	};
	return (
		<Fragment>
			<h1>Login</h1>
			<h1>{msg}</h1>
			<form onSubmit={handleLogin}>
				<label htmlFor="email">Email:</label>
				<input required type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<br />
				<label htmlFor="password">Password:</label>
				<input
					required
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />
				<input type="submit" value="Submit" />
			</form>

			<Link to="/register">Go To Register</Link>
		</Fragment>
	);
};

export default Login;
