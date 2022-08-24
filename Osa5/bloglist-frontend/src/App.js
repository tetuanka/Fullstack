import { useState, useEffect, useSyncExternalStore } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Error from "./components/Error";
import User from "./components/User";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/users";
import { Table, Button, Alert } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes, Route, useParams, Link
} from "react-router-dom"

const App = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) =>
      setBlogs(
        blogs.sort(function (a, b) {
          return b.likes - a.likes;
        })
      )
    );
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    userService.getAll()
      .then(response => {
         setUserList(response)
      })
  },[])

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setMessage(`welcome ${user.username}`);
      setTimeout(() => {
        setMessage(null);
      }, 10000);

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      blogs.sort(function (a, b) {
        return b.likes - a.likes;
      });
      setBlogs(blogs.concat(returnedBlog));
    });
    setFormVisible(false);

    setNotificationMessage("a new blog " + blogObject.title + " added");
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const addLike = (blogObject) => {
    const newLikes = blogObject.likes + 1;
    const newObject = { ...blogObject, likes: newLikes };
    blogService.update(newObject.id, newObject);
    blogService.getAll().then((blogs) =>
      setBlogs(
        blogs.sort(function (a, b) {
          return b.likes - a.likes;
        })
      )
    );
  };

  const remove = (blogObject) => {
    if (
      blogObject.user === undefined ||
      blogObject.user.username !== user.username
    ) {
      setErrorMessage(`You can not remove blog '${blogObject.title}' `);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }

    if (
      window.confirm(
        "Remove blog " + blogObject.title + " by " + blogObject.author + "?"
      )
    ) {
      blogService.remove(blogObject.id);
      setNotificationMessage("Removed blog " + blogObject.title);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);

      blogService.getAll().then((blogs) =>
        setBlogs(
          blogs.sort(function (a, b) {
            return b.likes - a.likes;
          })
        )
      );
    }
  };

  const loginForm = () => (
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
    ></LoginForm>
  );

  const blogList = () => (
    <div>
      <div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} addLike={addLike} remove={remove} />
          ))}
       </div>
    </div>
  );
  

  const blogForm = () => {
    const hideWhenVisible = { display: formVisible ? "none" : "" };
    const showWhenVisible = { display: formVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <Button onClick={() => setFormVisible(true)}>new blog</Button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm createBlog={addBlog} />
          <Button onClick={() => setFormVisible(false)}>cancel</Button>
        </div>
      </div>
    );
  };

  const title = () => {
    return ( 
  <div>
  <h2>blogs</h2>
    <div>
    {" "}
    {user.name} logged in
    </div><div>
    <Button
      onClick={() => {
        window.localStorage.clear();
        window.location.reload();
      }}
    >
      logout
    </Button>
  </div></div>
  )}

  const loggedInView = () => (
    <div>
       {title()}
      <h2>Create new</h2>
      {blogForm()}
      {blogList()}
    </div>
  );

  const Home = () => (
    <div>
      {message && <Alert variant="success">{message}</Alert>}
      <Error message={errorMessage} />
      <Notification message={notificationMessage} />

      {user === null ? loginForm() : loggedInView()}
    </div>
  )

  const Users = () => (
    <div>
      {user === null ? loginForm() : title()}
      <h2>
        Users
      </h2>
      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {userList.map((usr => <tr key={usr.id} >
            <Link to={`/users/${usr.id}`}><td>{usr.name}</td></Link><td>{usr.blogs.length}</td>
          </tr>))}
        </tbody>
      </Table>
    </div>
  )


  const Userview = () => {
    const id = useParams().id
    console.log(id)
    console.log(userList)
    const userToShow = userList.find(n => n.id === id)
    if (!userToShow) {
      return null
    }
    return (
      <div>
        {title()}
        <h2>{userToShow.name}</h2>
        <h6>added blogs</h6>
        <ul>
        {userToShow.blogs.map((blog) => (
            <li>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<Userview />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
