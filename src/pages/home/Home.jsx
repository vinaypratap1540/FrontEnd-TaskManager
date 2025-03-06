import React from 'react'
import "./home.css"
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
    <div className='header'>
       <div className='taglines'>
      <h1>Stay Organized, Stay Productive - Manage Your Tasks with Ease!</h1>
      <h3>Plan, Track, and Complete Your Tasks Effortlessly.</h3>
      <Link to="/tasks"><button>Try it free</button></Link>
      </div>
      <div className='imag'>
        <img src="https://cdn-icons-png.flaticon.com/512/167/167824.png" alt="" />
      </div>
    </div>
    <div className='card'>
    <div className='features'>
        <h1>Features for accurate tracking and process optimization</h1>
    </div>
    <div className='add'>
        <img src="https://cdn-icons-png.flaticon.com/512/6330/6330748.png" alt="" />
        <div className='addHeading'>
        <h1>Add your tasks to remember</h1>
        <h3>Quickly create and organize tasks to stay on top of your work</h3>
        </div>
    </div>
    <div className='add'>
        <div className='addHeading'>
        <h1>Check status of tasks</h1>
        <h3>Track progress in real-time and stay updated on your task completion</h3>
        </div>
     <img src="https://cdn-icons-png.flaticon.com/512/8655/8655482.png" alt="" />
    </div>
    <div className='add'>
        <img src="https://cdn-icons-png.flaticon.com/512/5807/5807545.png" alt="" />
        <div className='addHeading'>
        <h1>Delete tasks your completed tasks</h1>
        <h3>Remove completed or unnecessary tasks effortlessly to keep your workspace clean</h3>
        </div>
    </div>
    </div>
    <footer className="footer">
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/login">Login</Link>
        <Link to="/login">Signup</Link>
      </div>
      <p className="copyright">&copy; {new Date().getFullYear()} Vinay Pratap Singh. All rights reserved.</p>
    </footer>
    </div>
  )
}

export default Home
