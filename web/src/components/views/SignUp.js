import TextField from '@mui/material/TextField';
import { Row, Col } from 'react-bootstrap';
import { withStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import styleclass from '../../style/SignIn.module.css';
import React from 'react';
import { useState } from 'react';
import { APIService } from '../../service/api.service';
import { useNavigate } from 'react-router-dom';
import { useFormik, Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';

const styles = (theme) => ({
	textField: {
		'& .MuiInput-input': { color: '#FFFFFF' },
		multilineColor: {
			color: '#FFFFFF',
		},
		'& label.Mui-focused': {
			color: '#FFFFFF',
		},
		'& label': {
			color: '#FFFFFF',
		},
		'&& .MuiInput-root:hover::before': {
			borderColor: 'white',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#FFFFFF',
		},
		'& .MuiInput-underline:hover': {
			borderBottomColor: '#FFFFFF',
		},
		'& .MuiInput-underline:before': {
			borderBottomColor: '#FFFFFF',
		},
		'& .MuiInput-underline': {
			'&&&&:hover:before': {
				borderBottomColor: '#FFFFFF',
			},
		},
	},
});

const validationSchema = yup.object({
	email: yup
		.string()
		.email('Enter a valid email')
		.required('Email is required'),
	password: yup
		.string()
		.min(8, 'Password should be of minimum 8 characters length')
		.required('Password is required'),
	// confirmpassword: yup

	// 	.string()
	// 	.min(8, 'Password should be of minimum 8 characters length')
	// 	.required('Confirmation is required')
	// 	.oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const SignUp = (props) => {
	const navigate = useNavigate();

	const signup = (data) => {
		console.log(data);
		APIService.signup(data).then((response) => {
			if (response.access_token) {
				console.log(response.access_token);

				localStorage.setItem('token', response.access_token);
				props.setauth(true);
				toast.success('Registered successfully');
			} else {
				props.setauth(false);
				toast.error(response);
			}
		});
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			secretcode: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			const data = JSON.stringify(values);
			signup(data);
		},
	});

	return (
		<div>
			<Row className={styleclass.SignIn}>
				<Col
					md={4}
					style={{ padding: '0' }}
					className={styleclass.homerhs}
				>
					<div className={styleclass.signinDiv}>
						<form onSubmit={formik.handleSubmit}>
							<Row className={styleclass.input}>
								<Col style={{ padding: '0' }} md={9}>
									<TextField
										value={formik.values.email}
										onChange={formik.handleChange}
										className={props.classes.textField}
										id='standard-basic'
										label='Email'
										variant='standard'
										type='email'
										name='email'
										autoComplete='off'
										fullWidth
										error={
											formik.touched.email &&
											Boolean(formik.errors.email)
										}
										helperText={
											formik.touched.email &&
											formik.errors.email
										}
									/>
								</Col>
							</Row>
							<Row className={styleclass.input}>
								<Col style={{ padding: '0' }} md={9}>
									<TextField
										value={formik.values.password}
										onChange={formik.handleChange}
										className={props.classes.textField}
										id='standard-basic'
										label='Password'
										variant='standard'
										type='password'
										name='password'
										fullWidth
										error={
											formik.touched.password &&
											Boolean(formik.errors.password)
										}
										helperText={
											formik.touched.password &&
											formik.errors.password
										}
									/>
								</Col>
							</Row>
							<Row className={styleclass.input}>
								<Col style={{ padding: '0' }} md={9}>
									<TextField
										value={formik.values.secretcode}
										onChange={formik.handleChange}
										className={props.classes.textField}
										id='standard-basic'
										label='Secret code'
										variant='standard'
										type='password'
										name='secretcode'
										fullWidth
										// error={
										// 	formik.touched.confirmpassword &&
										// 	Boolean(
										// 		formik.errors.confirmpassword
										// 	)
										// }
										// helperText={
										// 	formik.touched.confirmpassword &&
										// 	formik.errors.confirmpassword
										// }
									/>
								</Col>
							</Row>
							<Row>
								<Col>
									<button
										type='submit'
										className={styleclass.button}
									>
										Sign Up
									</button>
								</Col>
							</Row>
							<Row>
								<Col>
									<div className='d-flex mx-5 my-3'>
										<p>
											<span className={styleclass.span}>
												Already have an account?
											</span>
											&nbsp; &nbsp;
											<Link
												className={styleclass.signlink}
												to='/'
											>
												Sign In
											</Link>
										</p>
									</div>
								</Col>
							</Row>
						</form>
					</div>
				</Col>
			</Row>
		</div>
	);
};
export default withStyles(styles)(SignUp);
