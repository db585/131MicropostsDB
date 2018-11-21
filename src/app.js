import { http } from './http'
import { ui } from './ui'

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts)

// Listen for Add post
document.querySelector('.post-submit').addEventListener('click', submitPost)

// Get posts into UI func
function getPosts () {
  http.get('http://localhost:3008/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err))
}

// Submit post to db and UI
function submitPost () {
  const title = document.querySelector('#title').value
  const body = document.querySelector('#body').value

  const data = {
    title,
    body
  }

  // Create post
  http.post('http://localhost:3008/posts', data)
    .then(data => {
      // Show alert that post has been added
      ui.showAlert('Post added', 'alert alert-success')

      // Clear input fields
      ui.clearFields()

      // Update ui
      getPosts()
    })
    .catch(err => console.log(err))
}
