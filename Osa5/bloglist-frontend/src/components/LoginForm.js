import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";

const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <Form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        <Form.Label>username:</Form.Label>
        <Form.Control
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <Form.Label>password:</Form.Label>
        <Form.Control
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <Button variant="primary" id="login-button" type="submit">
        login
      </Button>
    </Form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
