import SignIn from '../views/SignIn';

const SignInContainer = ({setAuth}) => {
	return (
		<div>
			<SignIn setauth={setAuth}/>
		</div>
	);
};

export default SignInContainer;
