import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Switch from 'react-switch';

const ReadMember = ({ history }) => {
	const [ users, setUsers ] = useState([]);

	const handleDelete = (user) => {
		const userId = user._id;
		const d = !user.d;
		axios
			.post(
				'http://localhost:5000/api/users/deletePermission',
				{ userId, d },
				{
					headers: {
						'Content-Type': 'application/json',
						authorization: localStorage.getItem('accessToken')
					}
				}
			)
			.then((response) => {
				const { users } = response && response.data;
				setUsers(users);
			})
			.catch((error) => {
				toast.error('Some thing wrong!');
				console.log('error is: ', error);
				history.push('/dashboard');
			});
	};

	const handleRead = (user) => {
		const userId = user._id;
		const r = !user.r;
		axios
			.post(
				'http://localhost:5000/api/users/readPermission',
				{ userId, r },
				{
					headers: {
						'Content-Type': 'application/json',
						authorization: localStorage.getItem('accessToken')
					}
				}
			)
			.then((response) => {
				const { users } = response && response.data;
				setUsers(users);
			})
			.catch((error) => {
				toast.error('Some thing wrong!');
				console.log('error is: ', error);
				history.push('/dashboard');
			});
	};

	const handleCreate = (user) => {
		const userId = user._id;
		const c = !user.c;
		axios
			.post(
				'http://localhost:5000/api/users/createPermission',
				{ userId, c },
				{
					headers: {
						'Content-Type': 'application/json',
						authorization: localStorage.getItem('accessToken')
					}
				}
			)
			.then((response) => {
				const { users } = response && response.data;
				setUsers(users);
			})
			.catch((error) => {
				toast.error('Some thing wrong!');
				console.log('error is: ', error);
				history.push('/dashboard');
			});
	};
	const onDeleteMember = (user) => {
		const userId = user._id;
		axios
			.post(
				'http://localhost:5000/api/users/delete',
				{ userId },
				{
					headers: {
						'Content-Type': 'application/json',
						authorization: localStorage.getItem('accessToken')
					}
				}
			)
			.then((response) => {
				const { users } = response && response.data;
				setUsers(users);
			})
			.catch((error) => {
				toast.error('Some thing wrong!');
				console.log('error is: ', error);
				history.push('/dashboard');
			});
	};
	useEffect(() => {
		axios
			.get('http://localhost:5000/api/users/read', {
				headers: {
					'Content-Type': 'application/json',
					authorization: localStorage.getItem('accessToken')
				}
			})
			.then((response) => {
				const { users } = response && response.data;
				setUsers(users);
			})
			.catch((error) => {
				toast.error('Some thing wrong!');
				console.log('error is: ', error);
				history.push('/dashboard');
			});
	}, []);
	return (
		<Fragment>
			{localStorage.getItem('read') === 'true' ? users.length !== 0 ? (
				<table>
					<tr>
						<th>Name</th>
						<th>email</th>
						<th>Phone Number</th>
						<th>Delete</th>
						<th>Create</th>
						<th>Read</th>
						<th>Delete Member</th>
					</tr>
					{users.map((user) => {
						return (
							<tr key={user._id}>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.phoneNumber}</td>
								<td>
									<Switch onChange={() => handleDelete(user)} checked={user.d} />
								</td>
								<td>
									<Switch onChange={() => handleCreate(user)} checked={user.c} />
								</td>
								<td>
									<Switch onChange={() => handleRead(user)} checked={user.r} />
								</td>

								<td>
									{localStorage.getItem('delete') === 'true' ? (
										<button onClick={() => onDeleteMember(user)}>Delete Member</button>
									) : (
										<p>You don't have permission to delete member</p>
									)}
								</td>
							</tr>
						);
					})}
				</table>
			) : (
				<h1>No Data Found</h1>
			) : (
				<h1>You don't have read permission</h1>
			)}

			<br />
			<br />
			<br />
			<Link to="/dashboard">Back to Dashboard</Link>
		</Fragment>
	);
};

export default ReadMember;
