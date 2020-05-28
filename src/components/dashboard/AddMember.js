import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Switch from 'react-switch';

const AddMember = ({ history }) => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ phoneNumber, setPhoneNumber ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ c, setCreate ] = useState(false);
	const [ r, setRead ] = useState(false);
	const [ d, setDelete ] = useState(false);
	const [ u, setUpdate ] = useState(true);

	const handleAddMember = (e) => {
		e.preventDefault();
		axios
			.post(
				'https://role-base-backend.herokuapp.com/api/users/sendRegistrationLinkEmail',
				{
					//name,
					email,
					// phoneNumber,
					// password,
					c,
					r,
					u,
					d
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
				history.push('/dashboard');
			})
			.catch((error) => {
				toast.error('Some thing wrong!');
				console.log('error is: ', error);
				history.push('/dashboard/addMember');
			});
	};
	return (
		<Fragment>
			<h1>Add Member</h1>
			{localStorage.getItem('create') === 'true' ? (
				<form onSubmit={handleAddMember}>
					<label htmlFor="name">Full name:</label>
					<input disabled required type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
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
						disabled
						required
						type="text"
						name="phoneNumber"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
					<br />
					<label htmlFor="password">Password:</label>
					<input
						disabled
						required
						type="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<br />
					<label htmlFor="create">Create Permission:</label>
					<Switch onChange={(e) => setCreate(!c)} checked={c} />
					<br />
					<label htmlFor="read">Read Permission:</label>
					<Switch onChange={(e) => setRead(!r)} checked={r} />
					<br />
					<label htmlFor="delete">delete Permission:</label>
					<Switch onChange={(e) => setDelete(!d)} checked={d} />
					<br />
					<input type="submit" value="Submit" />
				</form>
			) : (
				<h2>you dont't have permission to add member</h2>
			)}
			<br />
			<br />
			<br />
			<Link to="/dashboard">Back to Dashboard</Link>
		</Fragment>
	);
};

export default AddMember;
