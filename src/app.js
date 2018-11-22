import { http } from './http'
import { ui } from './ui'

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts)

// Listen for Add post
document.querySelector('.post-submit').addEventListener('click', submitPost)

// Listen for delete small button
document.querySelector('#posts').addEventListener('click', deletePost)

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit)

// Listen for cancel of edit state
document.querySelector('.card-form').addEventListener('click', disableEditState)

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
  const hiddId = document.querySelector('#id').value

  // Validate input fileds
  if (title === '' || body === '') {
    ui.showAlert('Please fill in all fields', 'alert alert-danger')
  } else {
    const data = {
      title,
      body
    }

    // Check if hidden #id elem is not null than it is an update else it's new post
    if (hiddId === '') {
      // Create  new post
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
    } else {
      // Update post
      http.put(`http://localhost:3008/posts/${hiddId}`, data)
        .then(data => {
          // Show alert that post has been added
          ui.showAlert('Post updated', 'alert alert-success')

          // Clear input fields

          // Set Add state. Clear input fields [inside changeFormState func]
          ui.changeFormState('add')

          // Update ui
          getPosts()
        })
        .catch(err => console.log(err))
    }
  }
}

// Delete post func
function deletePost (e) {
  if (e.target.parentElement.classList.contains('delete')) {
    // console.log(e.target.parentElement.dataset)
    const id = e.target.parentElement.dataset.id
    if (window.confirm('Are You sure')) {
      http.delete(`http://localhost:3008/posts/${id}`)
        .then(data => {
          ui.showAlert('Post Removed', 'alert alert-info')
          getPosts()
        })
        .catch(err => console.log(err))
    }
  }
  e.preventDefault()
}

// Enable esit post state
function enableEdit (e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent
    const body = e.target.parentElement.previousElementSibling.textContent

    const data = {
      id,
      title,
      body
    }

    // Fill the form with current post
    ui.fillForm(data)
  }
  e.preventDefault()
}

// Enable add state
function disableEditState (e) {
  // console.log('before change state to add    ', ui.formState)
  // console.log(e.target)
  // Check for btnCancel click
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add')
    // console.log('after change state to add    ', ui.formState)
  }
  e.preventDefault()
}
