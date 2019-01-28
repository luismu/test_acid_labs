import React, { Component } from "react";
import logo from "./logo_acid.png"

import "./Login.css";

class Form extends Component {
  state = {
    formValid: false,
    password: '',
    email: '',
    passwordError: '',
    emailError: '',
    passwordValid: false,
    emailValid: false,
    timer: 0
  };

  handleEmail = async (e) => {
    await this.setState({
      email: e.target.value
    });

    if (this.state.timer) clearTimeout(this.state.timer);

    this.setState({
      timer: setTimeout(() => {
        this.validateEmail();
      }, 1000)
    });
  };

  validateEmail = async () => {
    // eslint-disable-next-line
    const regExpEmail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i;

    if (!regExpEmail.test(this.state.email)) {
      await this.setState({
        emailError: "Email not valid",
        emailValid: false
      });
    } else {
      await this.setState({ emailError: "", emailValid: true });
    }
    this.enableSubmit();
  };

  handlePassword = async e => {
    await this.setState({
      password: e.target.value
    });

    if (this.state.timer) clearTimeout(this.state.timer);

    this.setState({
      timer: setTimeout(() => {
        this.validatePassword();
      }, 1000)
    });
  };

  validatePassword = async () => {
    if (this.state.password.length < 4) {
      await this.setState({
        passwordError: 'min 4 characters.',
        passwordValid: false
      });
    } else {
      await this.setState({ passwordError: '',
                            passwordValid: true });
    }
    this.enableSubmit();
  };

  enableSubmit = () => {
    if (this.state.emailValid && this.state.passwordValid) {
      this.setState({ formValid: true });
    } else {
      this.setState({ formValid: false });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    alert("Welcome " + this.state.email);
  };

  render() {
    return (
    <div>

    <div className="form-wrapper">
    <h1>Sign In</h1>
    <img alt='acidLab-logo' src={logo} />
    <form  onSubmit={ev => this.onSubmit(ev)}>
      <div className="form-item">
        <label htmlFor="email"></label>
          <input name='email'  placeholder='Email' onChange={ev => this.handleEmail(ev)} value={this.state.email}
						type='text'
						onBlur={this.validateEmail}
          />
    	</div>
    	<div className="error-inline"><span>{this.state.emailError}</span>
    	</div>

    	<div className="form-item">
    		<label htmlFor="password"></label>
    		<input name='password'  placeholder='Password' onChange={ev => this.handlePassword(ev)} value={this.state.password}
    			type='password'
    			onBlur={this.validatePassword}
    		/>
    	</div>
			<div className="error-inline">
			<span >{this.state.passwordError}</span>
			</div>

    	<div className="button-panel">
    		{this.state.formValid ? (
    			<input type="submit" className="button" title="Sign In" value="Sign In"></input>
    		) : (
    			<input type="submit" disabled  className="button" title="Sign In" value="Sign In"></input>
    		)}
    	</div>
    </form>
    <div className="form-footer">
    	<p><a href="/">Create an account</a></p>
    	<p><a href="/">Forgot password?</a></p>
    </div>
    </div>



    </div>
    );
  }
}

export default Form;
