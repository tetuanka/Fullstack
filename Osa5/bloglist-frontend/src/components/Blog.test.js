import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders content', () => {
  const blog = {
    title: 'Nainen tummissa',
    author: 'Minttu-Maaria'
  }

  render(<Blog blog={blog}/>)

  const element = screen.getAllByText('Nainen tummissa')
  expect(element).toBeDefined()

  const element2 = screen.getAllByText('Minttu-Maaria')
  expect(element2).toBeDefined()
})

test('clicking the view-button show the url and likes are displayed', async () => {
  const blog = {
    title: 'Nainen tummissa',
    author: 'Minttu-Maaria',
    url: 'https://nainentummissa.blogspot.com/',
    likes: 27
  }

  render(<Blog blog={blog}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element = screen.getAllByText('https://nainentummissa.blogspot.com/')
  expect(element).toBeDefined()

  const element2 = screen.getAllByText('likes 27')
  expect(element2).toBeDefined()
})

test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'Nainen tummissa',
    author: 'Minttu-Maaria',
    url: 'https://nainentummissa.blogspot.com/',
    likes: 27
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} addLike={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

test('creating a new blog', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const input = screen.getByPlaceholderText('write title')
  const input2 = screen.getByPlaceholderText('write author')
  const input3 = screen.getByPlaceholderText('write url')
  const sendButton = screen.getByText('create')

  await user.type(input, 'testing a form...')
  await user.type(input2, 'testauthor')
  await user.type(input3, 'testurl')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
  expect(createBlog.mock.calls[0][0].author).toBe('testauthor')
  expect(createBlog.mock.calls[0][0].url).toBe('testurl')
})