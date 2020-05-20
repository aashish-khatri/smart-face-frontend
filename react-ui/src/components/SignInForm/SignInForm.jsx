import React from 'react';

 class SignInForm extends React.Component{
 	constructor(props) {
 		super(props);
 		this.state = {
 			signInEmail: '',
 			signInPass: ''
 		}
 	}

 	onEmailChange = (event) => {
 		this.setState({signInEmail : event.target.value})
 	}

 	onPasswordChange = (event) => {
 		this.setState({signInPass : event.target.value})
 	}

 	onSubmitSign = () => {
 		fetch('https://polar-springs-76114.herokuapp.com/signin', {
 			method: 'post',
 			headers: { 'Content-Type' : 'application/json' },
 			body: JSON.stringify({
 				email: this.state.signInEmail,
 				password: this.state.signInPass
 			})
 		}).then(response => response.json())
 		.then(user => 
 		{
 			if(user.id){
 				this.props.loadUser(user);
 				this.props.onRouteChange('home');
 			}
 		})

 	}

 	render() {	
 		const {onRouteChange} = this.props;
		return (
			<article className="br3	ba dark-gray b--black-10 mv4 w-100 w-50-m w-50-l mw6 shadow-5 center">
			  <main className="pa4 black-80">
			  <div className="measure ">
			    <fieldset id="sign_up" 
			    		  className="ba b--transparent ph0 mh0">
			      <legend className=" center f2 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" 
			        htmlFor="email-address">Email</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="email"
			     	onChange = {this.onEmailChange}
			        name="email-address"  
			        id="email-address" />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" 
			        htmlFor="password">Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password" 
			        name="password"  
			        id="password"
			        onChange = {this.onPasswordChange} />
			      </div>		
			    <div>
			      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      type="submit" 
			      value="Sign in" 
			      onClick= {this.onSubmitSign} />
			    </div>
			    <div className="lh-copy mt3">
			      <p href="#0" 
			      className=" center f6 link dim black db pointer" 	
			      onClick = {() => onRouteChange('Register')}>Register</p>
			    </div>
			    </fieldset>
	  </div>
	  </main>
	  </article>
		); 
}

 	}

export default SignInForm;