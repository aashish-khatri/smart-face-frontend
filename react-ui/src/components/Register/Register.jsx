import React from 'react';

class Register extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			registerName: '',
			registerEmail: '',
			registerPass: ''
		}
	}

	onNameChange = (event) => {
		this.setState({registerName: event.target.value})
	}

	onEmailChange = (event) => {
		this.setState({registerEmail: event.target.value})
	}

	onPassChange = (event) => {
		this.setState({registerPass: event.target.value})
	}

	onSubmitRegister = () => {
		fetch('https://polar-springs-76114.herokuapp.com/register', {
			method: 'post',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.registerName,
				email: this.state.registerEmail,
				password: this.state.registerPass
			})
		}).then(response => response.json())
		.then(user => {
			if(user === 'unable to join' || user === 'incorrect form submission'){
				console.log(user);                       
				this.props.onRouteChange('Register');
			}
			else{
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
			      <legend className=" center f2 fw6 ph0 mh0">Register</legend>
			       <div className="mt3">
			        <label className="db fw6 lh-copy f6" 
			        htmlFor="email-address">Name</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="text" 
			        name="name"  
			        id="name"
			        onChange = {this.onNameChange}
			        required />
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" 
			        htmlFor="email-address">Email</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="email" 
			        name="email-address"  
			        id="email-address"
			        onChange = {this.onEmailChange}
			        required />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" 
			        htmlFor="password">Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password" 
			        name="password"  
			        id="password"
			        onChange = {this.onPassChange}
			        required />
			      </div>		
			    <div>
			      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      type="submit" 
			      value="Register" 
			      onClick= {this.onSubmitRegister} />
			    </div>
			    </fieldset>
	  </div>
	  </main>
	  </article>
			); 
	}
}

export default Register;