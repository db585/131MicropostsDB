import { http } from './http'

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts)

function getPosts () {
  http.get('http://localhost:3008/posts')
    .then((data) => {
      console.log(data)
    })
    .catch(err => console.log(err))
}
