import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

function BlocklyEscapeRoom() {
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
                <div className="project-icon-large">🧩</div>
                <h1 className="project-page-title">Blockly Escape Room</h1>
                <p className="project-page-subtitle">Visual Programming for Escape Room Puzzle Design</p>
            </section>

            <section className="project-content">
                <div className="project-section">
                    <h2>Overview</h2>
                    <p>
                        A custom extension of Google's Blockly visual programming library, enabling users to
                        create their own escape room puzzles using drag-and-drop programming blocks. The project
                        involved diving deep into the Blockly source code to create custom blocks that control
                        robots and interconnected puzzle elements.
                    </p>
                </div>

                <div className="project-section">
                    <h2>Screenshot</h2>
                    <div className="project-screenshot">
                        <img src="/images/blockly.png" alt="Blockly Escape Room - Custom blocks for robot control" />
                        <p className="screenshot-caption">Custom Blockly blocks for robot movement, sensors, and escape room mechanics</p>
                    </div>
                </div>

                <div className="project-section">
                    <h2>Key Features</h2>
                    <ul className="feature-list">
                        <li><strong>Custom Blocks</strong> - Created new Blockly blocks for movement (Forward, Backward, Turn)</li>
                        <li><strong>Robot Control</strong> - Blocks for wheel speed, voice commands, lights, and animations</li>
                        <li><strong>Sensor Integration</strong> - "See Dot" sensor blocks for robot awareness</li>
                        <li><strong>Escape Room Logic</strong> - Conditional blocks and launcher controls for puzzle mechanics</li>
                        <li><strong>Visual Programming</strong> - No coding required - perfect for non-technical puzzle designers</li>
                    </ul>
                </div>

                <div className="project-section">
                    <h2>Tech Stack</h2>
                    <div className="tech-stack-grid">
                        <div className="tech-item">
                            <span className="tech-icon">🧩</span>
                            <span>Blockly</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-icon">📜</span>
                            <span>JavaScript</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-icon">🤖</span>
                            <span>Robot Control</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-icon">🔧</span>
                            <span>Custom Blocks</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-icon">🎮</span>
                            <span>Escape Room</span>
                        </div>
                    </div>
                </div>

                <div className="project-section">
                    <h2>The Challenge</h2>
                    <p>
                        The main challenge was extending Blockly's core functionality to support custom blocks
                        that could interface with real hardware (robots) while maintaining an intuitive drag-and-drop
                        experience. This required understanding Blockly's internal block definition system and
                        code generation pipeline.
                    </p>
                </div>

                <div className="project-links">
                    <span className="btn btn-secondary" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                        Private Project
                    </span>
                </div>
            </section>

            <footer className="footer">
                <p>© 2024 Andreas Derksen</p>
            </footer>
        </div>
    );
}

export default BlocklyEscapeRoom;
