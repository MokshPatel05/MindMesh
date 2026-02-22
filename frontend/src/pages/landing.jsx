import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className='landingPageContainer'>
      <nav>
        <div className='navHeader'>
          <h2>MindMesh</h2>
        </div>
        <div className='navlist'>
          <p onClick={() => navigate("/aljk23")}>Join as Guest</p>
          <p onClick={() => navigate("/auth")}>Register</p>
          <div onClick={() => navigate("/auth")} role='button'>
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div className="heroContent">
          <h1>
            <span className="gradientText">Connect</span> with your loved ones
          </h1>
          <p>Bridge the distance with crystal-clear video calls. Quality connections, quality moments.</p>
          <Link to="/auth" className="ctaButton">
            Get Started →
          </Link>
        </div>
        <div className="heroVisual">
          <img 
            src="/mobile.png" 
            alt="Video calling illustration" 
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <div className="heroVisualFallback" aria-hidden="true">
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="200" r="150" stroke="url(#grad1)" strokeWidth="2" fill="none" opacity="0.5"/>
              <circle cx="200" cy="200" r="100" stroke="url(#grad1)" strokeWidth="2" fill="none" opacity="0.3"/>
              <rect x="140" y="140" width="120" height="90" rx="12" stroke="url(#grad1)" strokeWidth="2" fill="rgba(20,184,166,0.1)"/>
              <circle cx="200" cy="175" r="15" fill="url(#grad1)"/>
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#14b8a6"/>
                  <stop offset="100%" stopColor="#2dd4bf"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
