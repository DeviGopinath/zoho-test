import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { withStyles } from '@mui/styles';
import { APIService } from '../../service/api.service';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styleclass from '../../style/SignIn.module.css';
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
	username: yup
		.string('Enter your email')
		.email('Enter a valid email')
		.required('Email is required'),
	password: yup
		.string('Enter your password')
		.required('Password is required'),
});

const SignIn = (props) => {
	const navigate = useNavigate();
	const [isLoggedIn, setLoggedIn] = useState(false);

	const login = (data) => {
		console.log(data);
		APIService.authData(data).then((response) => {
			console.log(response)
			if (response.access_token) {
				localStorage.setItem('token', response.access_token);
				props.setauth(true);
				toast.success('Logged in successfully');
			} else {
				props.setauth(false);
				toast.error('Invalid username or password');
			}
		});
	};

	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			const data = JSON.stringify(values);
			login(data);
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
										className={props.classes.textField}
										id='standard-basic'
										label='Username'
										variant='standard'
										type='email'
										name='username'
										autoComplete='off'
										fullWidth
										value={formik.values.email}
										onChange={formik.handleChange}
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
										className={props.classes.textField}
										id='standard-basic'
										label='Password'
										variant='standard'
										type='password'
										name='password'
										fullWidth
										value={formik.values.password}
										onChange={formik.handleChange}
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
							<Row>
								<Col>
									<button
										type='submit'
										className={styleclass.button}
									>
										Sign In
									</button>
								</Col>
							</Row>
							<Row>
								<Col className='d-flex mx-5 my-3'>
									<p>
										<span className={styleclass.span}>
											Don't have an account?
										</span>
										&nbsp; &nbsp;
										<Link
											className={styleclass.signlink}
											to='/signup'
										>
											Sign Up
										</Link>
									</p>
								</Col>
							</Row>
						</form>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default withStyles(styles)(SignIn);
