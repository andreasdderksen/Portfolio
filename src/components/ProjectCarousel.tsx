import { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import type { ComponentType } from 'react';
import { Link } from 'react-router-dom';

// Lazy load demo components for better performance
const SyncedCanvasDemo = lazy(() => import('./SyncedCanvasDemo'));
const ParserDemo = lazy(() => import('./ParserDemo'));
const BlocklyDemo = lazy(() => import('./BlocklyDemo'));

interface ProjectSlide {
    id: string;
    title: string;
    description: string;
    icon: string;
    techTags: string[];
    link: string;
    linkText: string;
    DemoComponent: React.LazyExoticComponent<ComponentType<object>>;
}

const projects: ProjectSlide[] = [
    {
        id: 'coopws',
        title: 'Coop_WS',
        description: 'Real-time multiplayer pixel canvas built with ASP.NET 8 and SignalR. Features Redis backplane for horizontal scaling.',
        icon: '🎨',
        techTags: ['ASP.NET 8', 'SignalR', 'Redis', 'Docker'],
        link: '/projects/coopws',
        linkText: 'View Project →',
        DemoComponent: SyncedCanvasDemo,
    },
    {
        id: 'simpleparser',
        title: 'SimpleParser',
        description: 'A Pratt parser implementation in C# with custom lexer and AST visualization.',
        icon: '🔍',
        techTags: ['C#', 'Pratt Parser', 'Lexer', 'AST'],
        link: '/projects/simpleparser',
        linkText: 'View Project →',
        DemoComponent: ParserDemo,
    },
    {
        id: 'blockly',
        title: 'Blockly Escape Room',
        description: 'Custom Blockly blocks for creating escape room puzzles with visual programming.',
        icon: '🧩',
        techTags: ['Blockly', 'JavaScript', 'Visual Programming'],
        link: '/projects/blockly-escape-room',
        linkText: 'View Details →',
        DemoComponent: BlocklyDemo,
    },
];

function DemoLoader() {
    return (
        <div className="carousel-demo-loader">
            <div className="loader-spinner"></div>
            <span>Loading demo...</span>
        </div>
    );
}

function ProjectCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [direction, setDirection] = useState<'left' | 'right'>('right');

    const goToSlide = useCallback((index: number) => {
        setDirection(index > currentIndex ? 'right' : 'left');
        setCurrentIndex(index);
    }, [currentIndex]);

    const nextSlide = useCallback(() => {
        setDirection('right');
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection('left');
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }, []);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;
        const timer = setInterval(nextSlide, 8000);
        return () => clearInterval(timer);
    }, [isAutoPlaying, nextSlide]);

    // Pause auto-play on hover
    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    const currentProject = projects[currentIndex];

    return (
        <div
            className="project-carousel"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Navigation arrows */}
            <button
                className="carousel-arrow carousel-arrow-left"
                onClick={prevSlide}
                aria-label="Previous project"
            >
                ‹
            </button>
            <button
                className="carousel-arrow carousel-arrow-right"
                onClick={nextSlide}
                aria-label="Next project"
            >
                ›
            </button>

            {/* Main carousel content */}
            <div className="carousel-content">
                <div className={`carousel-slide carousel-slide-${direction}`} key={currentProject.id}>
                    {/* Project info header */}
                    <div className="carousel-header">
                        <div className="carousel-project-info">
                            <span className="carousel-icon">{currentProject.icon}</span>
                            <div className="carousel-title-section">
                                <h3 className="carousel-title">{currentProject.title}</h3>
                                <p className="carousel-description">{currentProject.description}</p>
                            </div>
                        </div>
                        <div className="carousel-actions">
                            <div className="carousel-tech-tags">
                                {currentProject.techTags.map((tag) => (
                                    <span key={tag} className="tech-tag">{tag}</span>
                                ))}
                            </div>
                            <Link to={currentProject.link} className="project-link">
                                {currentProject.linkText}
                            </Link>
                        </div>
                    </div>

                    {/* Demo area */}
                    <div className="carousel-demo-area">
                        <Suspense fallback={<DemoLoader />}>
                            <currentProject.DemoComponent />
                        </Suspense>
                    </div>
                </div>
            </div>

            {/* Dot indicators */}
            <div className="carousel-indicators">
                {projects.map((project, index) => (
                    <button
                        key={project.id}
                        className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to ${project.title}`}
                    />
                ))}
            </div>

            {/* Progress bar */}
            <div className="carousel-progress">
                <div
                    className="carousel-progress-bar"
                    style={{
                        animationDuration: isAutoPlaying ? '8s' : '0s',
                        animationPlayState: isAutoPlaying ? 'running' : 'paused',
                    }}
                    key={`progress-${currentIndex}-${isAutoPlaying}`}
                />
            </div>
        </div>
    );
}

export default ProjectCarousel;
