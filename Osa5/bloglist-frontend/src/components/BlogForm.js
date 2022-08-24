import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <div>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <div>
            <Form.Label>title:</Form.Label>
            <Form.Control
              type="text"
              id="title"
              value={newTitle}
              onChange={handleTitleChange}
              placeholder="write title"
            />
          </div>
          <div>
            <Form.Label>author:</Form.Label>
            <Form.Control
              type="text"
              id="author"
              value={newAuthor}
              onChange={handleAuthorChange}
              placeholder="write author"
            />
          </div>
          <div>
            <Form.Label>url:</Form.Label>
            <Form.Control
              type="text"
              id="url"
              value={newUrl}
              onChange={handleUrlChange}
              placeholder="write url"
            />
          </div>
          <Button variant="primary" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
