import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Error from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [formVisible, setFormVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(
        blogs.sort(function(a,b){
          return b.likes - a.likes
        })
      )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        blogs.sort(function(a,b){
          return b.likes - a.likes
        })
        setBlogs(blogs.concat(returnedBlog))
      })
    setFormVisible(false)

    setNotificationMessage('a new blog ' + blogObject.title + ' added')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)

  }

  const addLike = (blogObject) => {
    const newLikes = blogObject.likes+1
    const newObject = { ...blogObject, likes : newLikes }
    blogService
      .update(newObject.id, newObject)
    blogService
      .getAll().then(blogs =>
        setBlogs( blogs.sort(function(a,b){
          return b.likes - a.likes
        }) ))
  }

  const remove = (blogObject) => {
    if(blogObject.user === undefined || blogObject.user.username !== user.username)  {
      setErrorMessage(
        `You can not remove blog '${blogObject.title}' `
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }

    if (window.confirm('Remove blog ' + blogObject.title + ' by ' + blogObject.author + '?')){
      blogService
        .remove(blogObject.id)
      setNotificationMessage('Removed blog ' + blogObject.title)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)


      blogService
        .getAll().then(blogs =>
          setBlogs( blogs.sort(function(a,b){
            return b.likes - a.likes
          }) ))
    }

  }



  const loginForm = () => (
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
    ></LoginForm>

  )

  const blogList = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} remove={remove} />
      )}
    </div>
  )

  const blogForm = () => {
    const hideWhenVisible = { display: formVisible ? 'none' : '' }
    const showWhenVisible = { display: formVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setFormVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm createBlog={addBlog}/>
          <button onClick={() => setFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }


  const loggedInView = () => (
    <div>
      <h2>blogs</h2>
      <div> {user.name} logged in
        <button onClick={() => {window.localStorage.clear()
          window.location.reload()} }>logout</button></div>
      <h2>Create new</h2>
      {blogForm()}
      {blogList()}
    </div>
  )

  return (
    <div>
      <Error message={errorMessage} />
      <Notification message={notificationMessage} />

      {user === null ?
        loginForm() :
        loggedInView()
      }
    </div>
  )
}

export default App
