import { useState } from 'react'
import { Table, Button, Alert } from 'react-bootstrap'

const Blog = ({ blog, addLike, remove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [blogVisible, setBlogVisible] = useState(false)
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }


  return (
    <div>
      <div style={hideWhenVisible}>
        <div style={blogStyle}>
          {blog.title}
          <Button className="view" onClick={() => setBlogVisible(true)}>view</Button>
        </div> </div>
      <div style={showWhenVisible}>
        <div style={blogStyle} className="blog">
          <div>{blog.title} <Button onClick={() => setBlogVisible(false)}>hide</Button></div>
          <div>{blog.url}</div>
          <div id="likes">likes {blog.likes} <Button className="like" onClick={() => addLike(blog) }>like</Button></div>
          <div>{blog.author}</div>
          <div><Button onClick={() => remove(blog) }>remove</Button></div>
        </div>
      </div>
    </div>

  )}


export default Blog





