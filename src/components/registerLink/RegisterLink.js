import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

const RegisterLink = ({ history, match }) => {
	const [ name, setName ] = useState('');
	const [ phoneNumber, setPhoneNumber ] = useState('');
	const [ password, setPassword ] = useState('');
    
	const userId = match.params.userId;
    const token = match.params.token;
    const email = jwtDecode(token).user.email

    useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			history.push('/dashboard');
		} else {
			localStorage.clear();
		}
	}, []);
    
	const handleRegistrationLink = (e) => {
		e.preventDefault();
		axios
			.post(
				'https://role-base-backend.herokuapp.com/api/users/registerLink',
				{
					userId,
					token,
					name,
					phoneNumber,
					password
				},
				{
					headers: {
						'Content-Type': 'application/json',
						authorization: localStorage.getItem('accessToken')
					}
				}
			)
			.then((response) => {
				//const { token, id, name, email, create, read, del, update, role } = response && response.data;
				// localStorage.setItem('accessToken', token);
				// localStorage.setItem('userId', id);
				// localStorage.setItem('name', name);
				// localStorage.setItem('email', email);
				// localStorage.setItem('role', role);
				// localStorage.setItem('create', create);
				// localStorage.setItem('read', read);
				// localStorage.setItem('update', update);
				// localStorage.setItem('delete', del);
				toast.success('You are logged in successfuly!');
				history.push('/');
			})
			.catch((error) => {
				toast.error('Some thing wrong!');
				console.log('error is: ', error);
				history.push('/');
			});
	};
	return (
		<Fragment>
			<h1>Registration Link</h1>

			<form onSubmit={handleRegistrationLink}>
				<label htmlFor="name">Full name:</label>
				<input required type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
				<br />
				<label htmlFor="email">Email:</label>
				<input
					disabled
					required
					type="email"
					name="email"
					value={email}
				/>
				<br />
				<label htmlFor="phone">Phone Number:</label>
				<input
					required
					type="text"
					name="phoneNumber"
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
				/>
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

				<br />
				<input type="submit" value="Submit" />
			</form>

			<br />
			<br />
			<br />
			<Link to="/">Back to Login</Link>
		</Fragment>
	);
};

export default RegisterLink;
