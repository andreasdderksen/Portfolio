import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

function CoopWS() {
    return (
        <div className="project-page page-transition">
            <nav className="nav">
                <Link to="/" className="nav-logo">AD</Link>
                <ul className="nav-links">
                    <li><Link to="/#projects">Projects</Link></li>
                    <li><Link to="/#about">About</Link></li>
                    <li><Link to="/#contact">Contact</Link></li>
                </ul>
                <ThemeToggle />
            </nav>

            <section className="project-hero">
                <Link to="/" className="back-link">← Back to Portfolio</Link>
                <div className="project-icon-large">🎨</div>
                <h1 className="project-page-title">Coop_WS</h1>
                <p className="project-page-subtitle">Real-time Multiplayer Collaborative Canvas</p>
            </section>

            <section className="project-content">
                <div className="project-section">
                    <h2>Overview</h2>
                    <p>
                        A multiplayer collaborative pixel canvas where users can place pixels in real-time,
                        similar to Reddit's r/place. Built with a focus on scalability and real-time synchronization
                        across multiple clients and server instances.
                    </p>
                </div>

                <div className="project-section">
                    <h2>Screenshot</h2>
                    <div className="project-screenshot">
                        <img src="/images/coopws.png" alt="Coop_WS - Two browser windows showing real-time pixel sync" />
                        <p className="screenshot-caption">Real-time synchronization between two browser windows</p>
                    </div>
                </div>

                <div className="project-section">
                    <h2>Key Features</h2>
                    <ul className="feature-list">
                        <li><strong>Real-time Sync</strong> - Instant pixel updates across all connected clients via SignalR WebSockets</li>
                        <li><strong>Horizontal Scaling</strong> - Redis backplane enables multiple server instances to share state</li>
                        <li><strong>Event Streaming</strong> - Google Pub/Sub for reliable event processing</li>
                        <li><strong>Rate Limiting</strong> - Per-client rate limiting to prevent abuse (10 messages/second)</li>
                        <li><strong>Cloud Native</strong> - Containerized with Docker, deployed on Google Cloud Run</li>
                    </ul>
                </div>

                <div className="project-section">
                    <h2>Tech Stack</h2>
                    <div className="tech-stack-grid">
                        <div className="tech-item">
                            <span className="tech-icon">🔷</span>
                            <span>ASP.NET 8</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-icon">⚡</span>
                            <span>SignalR</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-icon">🗄️</span>
                            <span>Redis</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-icon">📨</span>
                            <span>Google Pub/Sub</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-icon">🐳</span>
                            <span>Docker</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-icon">☁️</span>
                            <span>Cloud Run</span>
                        </div>
                    </div>
                </div>

                <div className="project-section">
                    <h2>Architecture</h2>
                    <p>
                        The application uses SignalR for WebSocket communication, with Redis as a backplane
                        to synchronize state between multiple server instances. Pixel updates are published
                        to Google Pub/Sub for event-driven processing, enabling features like persistence
                        and analytics without blocking the main request path.
                    </p>
                </div>

                <div className="project-links">
                    <a href="https://github.com/andreas-derksen/Coop_WS" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        View on GitHub
                    </a>
                </div>
            </section>

            <footer className="footer">
                <p>© 2024 Andreas Derksen</p>
            </footer>
        </div>
    );
}

export default CoopWS;
