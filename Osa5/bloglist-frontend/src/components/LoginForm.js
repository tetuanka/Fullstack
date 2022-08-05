import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange, }) => {

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
  username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          //onChange={({ target }) => setUsername(target.value)}
          onChange = {handleUsernameChange}
        />
      </div>
      <div>
  password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          //onChange={({ target }) => setPassword(target.value)}
          onChange = {handlePasswordChange}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm