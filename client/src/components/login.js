import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'firstName') {
      setFirstName(value);
    } else if (name === 'lastName') {
      setLastName(value);
    }
  };

 
  const handleSuccess = (token) => {

    localStorage.setItem('jwt', token);
    history.push('/newwork');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.status === 400) {
        const data = await response.json();
        alert(data.message);
      } else if (response.status === 200) {
        const data = await response.json();
        console.log('Success logging in.');
        handleSuccess(data.token); 
      }
    } catch (error) {
      console.log('Error logging in: ', error);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }),
      });

      if (response.status === 400 || response.status === 409) {
        const data = await response.json();
        alert(data.message);
      } else if (response.status === 200) {
        const data = await response.json();
        console.log('Success registering.');
        handleSuccess(data.token); 
      }
    } catch (error) {
      console.log('Error registering in: ', error);
    }
  };

 
  const token = localStorage.getItem('jwt');
  if (token) {
    console.log('Token:', token);
  } else {

    console.log('Token not found');
  }

  return (
    <div>
      <div className="mainContainer">
        <div className="login">
          <h1>Login</h1>
          <form id="loginform" onSubmit={handleLoginSubmit}>
            {/* Input fields for email and password */}
            <input
              value={email}
              name="email"
              onChange={handleInputChange}
              type="email"
              placeholder="Email"
              required
            />
            <input
              value={password}
              name="password"
              onChange={handleInputChange}
              type="password"
              placeholder="Password"
              required
            />
            <button type="submit">Log In</button>
          </form>
        </div>
        <div className="signup">
          <h1>Sign Up</h1>
          <form id="signupform" onSubmit={handleRegisterSubmit}>
            {/* Input fields for first name, last name, email, and password */}
            <input
              value={firstName}
              name="firstName"
              onChange={handleInputChange}
              type="text"
              placeholder="First Name"
              required
            />
            <input
              value={lastName}
              name="lastName"
              onChange={handleInputChange}
              type="text"
              placeholder="Last Name"
              required
            />
            <input
              value={email}
              name="email"
              onChange={handleInputChange}
              type="email"
              placeholder="Email"
              required
            />
            <input
              value={password}
              name="password"
              onChange={handleInputChange}
              type="password"
              placeholder="Password"
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;