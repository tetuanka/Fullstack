import { useState } from 'react'

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
          <button className="view" onClick={() => setBlogVisible(true)}>view</button>
        </div> </div>
      <div style={showWhenVisible}>
        <div style={blogStyle} className="blog">
          <div>{blog.title} <button onClick={() => setBlogVisible(false)}>hide</button></div>
          <div>{blog.url}</div>
          <div id="likes">likes {blog.likes} <button className="like" onClick={() => addLike(blog) }>like</button></div>
          <div>{blog.author}</div>
          <div><button onClick={() => remove(blog) }>remove</button></div>
        </div>
      </div>
    </div>

  )}


export default Blog





