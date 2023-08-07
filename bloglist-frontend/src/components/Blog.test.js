import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
//import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const blog = {
    title: 'Title for testing',
    author: 'Author for testing'
  }

  //   render(<Note note={note} />)

  //   const element = screen.getByText('Component testing is done with react-testing-library')
  //   expect(element).toBeDefined()
  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Title for testing',
    'Author for testing'
  )

  screen.debug()
})

// test('clicking the button LIKE calls event handler once', async () => {
//   const blog = {
//     title: 'Title for testing',
//     author: 'Author for testing'
//   }

//   const mockHandler = jest.fn()

//   render(
//     <Blog note={blog} handleBlogUpdate={mockHandler} />
//   )

//   const user = userEvent.setup()
//   const button = screen.getByText('like')
//   await user.click(button)

//   expect(mockHandler.mock.calls).toHaveLength(1)

//   screen.debug()

// })
