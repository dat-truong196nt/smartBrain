import React, { useState } from "react";

const Register = (props) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onRegister = () => {
		if (!password || !name || !email)
			return console.error('Wrong input format');

		fetch('https://dattruong196nt-smartbrain-be.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({email, password, name}),
		})
		.then(resp => resp.json())
		.then((user) => {
			if (user.id) {
				props.loadUser(user);
				props.onRouteChange('home');
			}
		})
		.catch(console.log)
	}

	return (
		<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
			<main className="pa4 black-80">
				<div className="measure">
					<fieldset id="sign_up" className="ba b--transparent ph0 mh0 ">
						<legend className="f1 fw6 ph0 mh0 center">Register</legend>
						<div className="mt3">
							<label className="db fw6 lh-copy f6 center" htmlFor="email-address">Name</label>
							<input onChange={(event) => setName(event.target.value)} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="email-address"  id="email-address"/>
						</div>
						<div className="mt3">
							<label className="db fw6 lh-copy f6 center" htmlFor="email-address">Email</label>
							<input onChange={(event) => setEmail(event.target.value)} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
						</div>
						<div className="mv3">
							<label className="db fw6 lh-copy f6 center" htmlFor="password">Password</label>
							<input onChange={(event) => setPassword(event.target.value)} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
						</div>
					</fieldset>
					<div className="center">
						<input onClick={onRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
					</div>
				</div>
			</main>
		</article>
	);
};

export default Register;
