import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import ParserDemo from '../components/ParserDemo';

function SimpleParser() {
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
                <div className="project-icon-large">🔍</div>
                <h1 className="project-page-title">SimpleParser</h1>
                <p className="project-page-subtitle">Pratt Parser Implementation with AST Visualization</p>
            </section>

            <section className="project-content">
                <div className="project-section">
                    <h2>Overview</h2>
                    <p>
                        A C# implementation of the Pratt parser algorithm, following Matklad's excellent article
                        on building simple but powerful parsers. Features a custom lexer, configurable operator
                        precedence, and a visual AST (Abstract Syntax Tree) representation.
                    </p>
                </div>

                <div className="project-section">
                    <h2>Screenshot</h2>
                    <div className="project-screenshot">
                        <img src="/images/simpleparser.png" alt="SimpleParser - Expression parsing with AST visualization" />
                        <p className="screenshot-caption">Expression "1 + 2" parsed into an AST with visual representation</p>
                    </div>
                </div>

                <div className="project-section">
                    <h2>Interactive Demo</h2>
                    <ParserDemo />
                </div>

                <div className="project-section">
                    <h2>Key Features</h2>
                    <ul className="feature-list">
                        <li><strong>Pratt Parsing</strong> - Elegant operator precedence parsing using binding power</li>
                        <li><strong>Custom Lexer</strong> - Tokenizes input into names, operators, literals, and strings</li>
                        <li><strong>Configurable Precedence</strong> - Operator precedence defined in JSON configuration</li>
                        <li><strong>Multiple Operator Types</strong> - Supports infix, prefix, infixr (right-associative), and statements</li>
                        <li><strong>AST Visualization</strong> - WinForms UI to visualize the parsed tree structure</li>
                    </ul>
                </div>

                <div className="project-section">
                    <h2>Tech Stack</h2>
                    <div className="tech-stack-grid">
                        <div className="tech-item">
                            <span className="tech-icon">🔷</span>
                            <span>C#</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-icon">🖥️</span>
                            <span>WinForms</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-icon">📝</span>
                            <span>Pratt Parser</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-icon">🌳</span>
                            <span>AST</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-icon">⚙️</span>
                            <span>JSON Config</span>
                        </div>
                    </div>
                </div>

                <div className="project-section">
                    <h2>How It Works</h2>
                    <p>
                        The parser uses Pratt's top-down operator precedence approach. Each token has a
                        "left binding power" (lbp) that determines how tightly it binds to tokens on its left.
                        The algorithm recursively builds the AST by comparing binding powers, allowing for
                        elegant handling of operator precedence without explicit grammar rules.
                    </p>
                </div>

                <div className="project-links">
                    <a href="https://github.com/Andreasd21/SimpleParser" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        View on GitHub
                    </a>
                    <a href="https://matklad.github.io/2020/04/13/simple-but-powerful-pratt-parsing.html" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        Original Article
                    </a>
                </div>
            </section>

            <footer className="footer">
                <p>© 2024 Andreas Derksen</p>
            </footer>
        </div>
    );
}

export default SimpleParser;
