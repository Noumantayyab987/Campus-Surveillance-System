import React from "react";
import * as Components from './Components';

function Registration() {

  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const registerUser = async (name, email, password) => {
    try {
      const response = await fetch('https://34.30.143.245/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 201) {
        setSuccessMessage('User created successfully!');
        setErrorMessage('');
        window.location.reload();
      } else {
        setSuccessMessage('');
        setErrorMessage('User already exists!');
      }
    } catch (error) {
      console.error(error);
      setSuccessMessage('');
      setErrorMessage('Error creating user!');
    }
  }

  const loginUser = async (email, password) => {
    try {
      const response = await fetch('https://34.30.143.245/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json',
        },
        body: `grant_type=&username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&scope=&client_id=&client_secret=`,
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        // Set cookies
        document.cookie = `access_token=${data.access_token}`;
        document.cookie = `token_type=${data.token_type}`;
        window.location.href = "http://localhost:3000/dashboard"; // redirect to dashboard
      }
    } catch (error) {
      console.error(error);
      setSuccessMessage('');
      setErrorMessage('Error logging in!');
    }
  }

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    loginUser(email, password);
  };

  const handleRegistration = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    registerUser(name, email, password);
  };

  const [signIn, toggle] = React.useState(true);

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form onSubmit={handleRegistration}>
          <Components.Title>Create Account</Components.Title>
          

          <Components.Input name='name' type='text' placeholder='Name' />
          <Components.Input name='email' type='email' placeholder='Email' />
          <Components.Input name='password' type='password' placeholder='Password' />
          <Components.Button>Sign Up</Components.Button>
          {successMessage && <Components.SuccessMessage>{successMessage}</Components.SuccessMessage>}
          {errorMessage && <Components.ErrorMessage>{errorMessage}</Components.ErrorMessage>}
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form onSubmit={handleLogin}>
          <Components.Title>Sign in</Components.Title>
          <Components.Input name='email' type='email' placeholder='Email' />
          <Components.Input name='password' type='password' placeholder='Password' />
          <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
          <Components.Button>Sigin In</Components.Button>
  </Components.Form>
</Components.SignInContainer>


      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>

          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
              
            </Components.Paragraph>
            <Components.GhostButton>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter Your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sigin Up
            </Components.GhostButton> 
          </Components.RightOverlayPanel>

        </Components.Overlay>
      </Components.OverlayContainer>
      <style>{`
        @import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");
        * {
        box-sizing: border-box;
      }
        body {
          background: #f6f5f7;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-family: "Montserrat", sans-serif;
          height: 100vh;
          margin: -20px 0 50px;
        }
      `}</style>
    </Components.Container>
  );
}

export default Registration;