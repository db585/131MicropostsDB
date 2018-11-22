class UI {
  constructor () {
    this.post = document.querySelector('#posts')
    this.titleInput = document.querySelector('#title')
    this.bodyInput = document.querySelector('#body')
    this.idInput = document.querySelector('#id')
    this.postSubmit = document.querySelector('.post-submit')
    this.formState = 'add'
  }

  // Show all posts
  showPosts (posts) {
    let output = ''

    posts.forEach(post => {
      output += `
      <div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text">${post.body}</p>
          <a href="#" class="edit card-link" data-id="${post.id}">
            <i class="fas fa-pencil-alt"></i>
          </a>
          <a href="#" class="delete card-link" data-id="${post.id}">
            <i class="fas fa-trash-alt"></i>
          </a>
        </div>
      </div>
      `
    })

    this.post.innerHTML = output
  }

  // Show alert
  showAlert (msg, classBootstrap) {
    this.clearAlert()

    // Create div
    const divAlert = document.createElement('div')

    // Add clases
    divAlert.className = classBootstrap

    // Add text
    divAlert.appendChild(document.createTextNode(msg))

    // Get parent
    const container = document.querySelector('.postsContainer')

    // Get posts
    const posts = document.querySelector('#posts')

    // Insert divAlert
    container.insertBefore(divAlert, posts)

    // Set timeout for alert
    setTimeout(() => {
      this.clearAlert()
    },
    3000)
  }

  // Cleat alert func
  clearAlert () {
    const currentAlert = document.querySelector('.alert')
    if (currentAlert) {
      currentAlert.remove()
    }
  }

  // Clear fields func
  clearFields () {
    this.titleInput.value = ''
    this.bodyInput.value = ''
  }

  clearHiddenIdValue () {
    this.idInput.value = ''
  }

  // Fill from to edit
  fillForm (data) {
    this.titleInput.value = data.title
    this.bodyInput.value = data.body
    this.idInput.value = data.id

    // Check the state and change it to "edit"
    // console.log('before change state to edit   ', ui.formState)
    if (ui.formState !== 'edit') {
      this.changeFormState('edit')
      // console.log('after change state to edit   ', ui.formState)
    }
  }

  // Change form state func
  changeFormState (type) {
    if (type === 'edit') {
      // Set text of the button
      this.postSubmit.textContent = 'Update Post'

      // Set color of the button
      this.postSubmit.className = 'post-submit btn btn-warning btn-block'

      // Create cancel btn for quiting edit state
      const btnCancel = document.createElement('button')

      // Add classes to bnt
      btnCancel.className = 'post-cancel btn btn-light btn-block'

      // Add test to cancel btn
      btnCancel.appendChild(document.createTextNode('Cancel Edit'))

      // Get the parent
      const cardForm = document.querySelector('.card-form')

      // Get html element to insert before
      const formEnd = document.querySelector('.form-end')

      // Insert cancel btn
      cardForm.insertBefore(btnCancel, formEnd)

      this.formState = 'edit'
    } else if (type === 'add') {
      // Set text of the button
      this.postSubmit.textContent = 'Post It'

      // Set color of the button
      this.postSubmit.className = 'post-submit btn btn-primary btn-block'

      // Delete btnCancel if it exists
      if (document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove()

        // Clear value from hidden #id element
        this.clearHiddenIdValue()

        // Clear input fields
        this.clearFields()

        this.formState = 'add'
      }
    }
  }
}

export const ui = new UI()
