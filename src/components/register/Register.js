import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = ({ history }) => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ phoneNumber, setPhoneNumber ] = useState('');
	const [ password, setPassword ] = useState('');

	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			history.push('/dashboard');
		} else {
			localStorage.clear();
		}
	}, []);

	const handleRegister = (e) => {
		e.preventDefault();
        axios
        .post(
            'https://role-base-backend.herokuapp.com/api/users/register',
            {
                name,
                email,
                phoneNumber,
                password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then((response) => {
            const { token, id, name, email, create, read, del, update, role } = response && response.data;
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
            history.push('/register');
        });
	};
	return (
		<Fragment>
			<h1>Register</h1>
			<form onSubmit={handleRegister}>
				<label htmlFor="name">Full name:</label>
				<input
					required
					type="text"
					name="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<br />
				<label htmlFor="email">Email:</label>
				<input
					required
					type="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
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
				<input type="submit" value="Submit" />
			</form>

			<Link to="/">Back to Login</Link>
		</Fragment>
	);
};

export default Register;
