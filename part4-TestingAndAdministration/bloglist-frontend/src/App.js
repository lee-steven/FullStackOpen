import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')
  const [ notification, setNotification ] = useState(null)


  // Gets all blogs
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // Checks to see if user token is stored in browser
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogIn = async (event) => {
    event.preventDefault()
    console.log("Login button clicked")
    try{
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log("LOGIN SUCCESSFUL")
    } catch(exception) {
      setNotification("Wrong username or password! Please try again.")
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  const handleBlogSubmit = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    const response = await blogService.create(newBlog)
    setBlogs(blogs.concat(response))
    setTitle('')
    setAuthor('')
    setUrl('')

    setNotification("Your blog has been created!")
      setTimeout(() => {
        setNotification(null)
      }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogIn}>
        <div>
          Username: 
          <input 
            type="text" 
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        
        <div>
          Password: 
          <input 
            type="password" 
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Log in</button>
    </form>
  )

  const blogList = () => (
    <div>

      <h2>blogs</h2>
      <span>
        {user.name} is logged in 
        <button onClick={handleLogout}>logout</button>
      </span>

      <h3>write a blog</h3>
      <form onSubmit={handleBlogSubmit}>
        <div>
          title: <input type="text" value={title} onChange={({target}) => setTitle(target.value)}/>
        </div>
        <div>
          author: <input type="text" value={author} onChange={({target}) => setAuthor(target.value)}/>
        </div>
        <div>
          url: <input type="text" value={url} onChange={({target}) => setUrl(target.value)}/>
        </div>
        <button type="submit">create blog</button>
      </form>
      
    
   
    <div>{blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}</div>
    </div>
  )

  return (
    <div>
      {notification ? <p style={{backgroundColor: 'lightgray', borderRadius: '10px', padding: '5px 10px'}}>{notification}</p>
      : ''
      }
      {user === null ? loginForm() : blogList()}
    </div>
  )
}

export default App