import './App.css'
import { Link } from 'react-router-dom'
import ThemeToggle from './components/ThemeToggle'

function App() {
  return (
    <div className="page-transition">
      {/* Navigation */}
      <nav className="nav">
        <a href="#" className="nav-logo">AD</a>
        <ul className="nav-links">
          <li><a href="#projects">Projects</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <ThemeToggle />
      </nav>

      {/* Projects Section - FIRST */}
      <section className="hero" id="projects">
        <div className="projects-container">
          <h2 className="section-title" style={{ marginBottom: '3rem' }}>My <span>Projects</span></h2>
          <div className="projects-grid">
            {/* Coop_WS */}
            <div className="project-card">
              <div className="project-icon">🎨</div>
              <h3 className="project-title">Coop_WS</h3>
              <p className="project-description">
                Real-time multiplayer pixel canvas built with ASP.NET 8 and SignalR.
                Features Redis backplane for horizontal scaling, Google Pub/Sub for event streaming,
                rate limiting per client, and Docker containerization for Cloud Run deployment.
              </p>
              <div className="project-tech">
                <span className="tech-tag">ASP.NET 8</span>
                <span className="tech-tag">SignalR</span>
                <span className="tech-tag">Redis</span>
                <span className="tech-tag">Pub/Sub</span>
                <span className="tech-tag">Docker</span>
                <span className="tech-tag">Cloud Run</span>
              </div>
              <Link to="/projects/coopws" className="project-link">
                View Project →
              </Link>
            </div>

            {/* SimpleParser */}
            <div className="project-card">
              <div className="project-icon">🔍</div>
              <h3 className="project-title">SimpleParser</h3>
              <p className="project-description">
                A Pratt parser implementation in C# with a custom lexer, configurable operator precedence via JSON,
                support for infix/prefix/infixr operators, statement parsing, and AST visualization in WinForms.
              </p>
              <div className="project-tech">
                <span className="tech-tag">C#</span>
                <span className="tech-tag">Pratt Parser</span>
                <span className="tech-tag">Lexer</span>
                <span className="tech-tag">AST</span>
                <span className="tech-tag">WinForms</span>
              </div>
              <Link to="/projects/simpleparser" className="project-link">
                View Project →
              </Link>
            </div>

            {/* Blockly Escape Room */}
            <div className="project-card">
              <div className="project-icon">🧩</div>
              <h3 className="project-title">Blockly Escape Room</h3>
              <p className="project-description">
                Custom Blockly blocks for creating escape room puzzles. Users can design their own
                escape rooms with adjustable puzzles and interconnecting pieces using visual programming.
              </p>
              <div className="project-tech">
                <span className="tech-tag">Blockly</span>
                <span className="tech-tag">JavaScript</span>
                <span className="tech-tag">Visual Programming</span>
              </div>
              <Link to="/projects/blockly-escape-room" className="project-link">
                View Details →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="section hero-alt" id="home">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-greeting">Hello, I'm</p>
            <h1 className="hero-name">Andreas Derksen</h1>
            <p className="hero-title">Software Developer & Cloud Enthusiast</p>
            <p className="hero-description">
              Building scalable backend solutions and cloud-native applications.
              Currently completing my final internship at CM.com.
            </p>
            <div className="hero-cta">
              <a href="#about" className="btn btn-primary">Learn More</a>
              <a href="/cv.pdf" download className="btn btn-secondary">Download CV</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="profile-image-wrapper">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Andreas&backgroundColor=0d8abc"
                alt="Andreas Derksen"
                className="profile-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Skills */}
      <section className="section" id="about">
        <h2 className="section-title">About <span>Me</span></h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a <span className="about-highlight">Netherlands-Chilean developer</span> based in Rotterdam,
              with a deep enthusiasm for cloud technology and backend development. My journey in tech has taken
              me across borders – including a study abroad experience at <span className="about-highlight">Myongji University in Seoul</span>,
              where I explored digital media and experienced a different culture.
            </p>
            <p>
              Currently wrapping up my studies at <span className="about-highlight">Fontys HBO-ICT</span> while
              gaining real-world experience at <span className="about-highlight">CM.com</span>, where I'm working
              with Machine Learning and end-to-end inference services in Python.
            </p>
            <p>
              When I'm not coding, you'll find me at the gym or planning my next adventure –
              I love traveling to places like South Korea!
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-card">
              <div className="stat-number">5+</div>
              <div className="stat-label">Years Coding</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">4</div>
              <div className="stat-label">Languages Spoken</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">2</div>
              <div className="stat-label">Internships</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">∞</div>
              <div className="stat-label">Curious Mind</div>
            </div>
          </div>
        </div>

        {/* Skills integrated into About */}
        <h3 className="skills-subtitle">Tech Stack</h3>
        <div className="skills-grid">
          <div className="skill-card">
            <div className="skill-icon">🐳</div>
            <div className="skill-name">Docker</div>
          </div>
          <div className="skill-card">
            <div className="skill-icon">☸️</div>
            <div className="skill-name">Kubernetes</div>
          </div>
          <div className="skill-card">
            <div className="skill-icon">🔷</div>
            <div className="skill-name">.NET</div>
          </div>
          <div className="skill-card">
            <div className="skill-icon">🐍</div>
            <div className="skill-name">Python</div>
          </div>
          <div className="skill-card">
            <div className="skill-icon">⚡</div>
            <div className="skill-name">SignalR</div>
          </div>
          <div className="skill-card">
            <div className="skill-icon">🤖</div>
            <div className="skill-name">ML</div>
          </div>
          <div className="skill-card">
            <div className="skill-icon">🔧</div>
            <div className="skill-name">DevOps</div>
          </div>
          <div className="skill-card">
            <div className="skill-icon">⚛️</div>
            <div className="skill-name">React</div>
          </div>
          <div className="skill-card">
            <div className="skill-icon">📘</div>
            <div className="skill-name">TypeScript</div>
          </div>
          <div className="skill-card">
            <div className="skill-icon">☁️</div>
            <div className="skill-name">GCP</div>
          </div>
          <div className="skill-card">
            <div className="skill-icon">🔀</div>
            <div className="skill-name">Git</div>
          </div>
          <div className="skill-card">
            <div className="skill-icon">🗄️</div>
            <div className="skill-name">Redis</div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section" id="contact">
        <h2 className="section-title">Get in <span>Touch</span></h2>
        <div className="contact-content">
          <p className="contact-text">
            Interested in working together or just want to say hi?
            Feel free to reach out – I'm always open to new opportunities and connections!
          </p>
          <div className="contact-links">
            <a href="mailto:andreasderksen@gmail.com" className="contact-link">
              <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
              Email
            </a>
            <a href="https://linkedin.com/in/andreas-derksen" target="_blank" rel="noopener noreferrer" className="contact-link">
              <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
              LinkedIn
            </a>
            <a href="tel:+31637448841" className="contact-link">
              <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
              Call
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Andreas Derksen. Built with React & TypeScript.</p>
      </footer>
    </div>
  )
}

export default App
