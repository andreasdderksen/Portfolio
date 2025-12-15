import { useState, useCallback } from 'react';

const GRID_WIDTH = 25;
const GRID_HEIGHT = 25;
const CELL_SIZE = 12;

type PixelGrid = boolean[][];

function createEmptyGrid(): PixelGrid {
    return Array(GRID_HEIGHT).fill(null).map(() => Array(GRID_WIDTH).fill(false));
}

function SyncedCanvasDemo() {
    const [pixels, setPixels] = useState<PixelGrid>(createEmptyGrid);

    const handleCellClick = useCallback((row: number, col: number) => {
        setPixels(prevPixels => {
            const newPixels = prevPixels.map(r => [...r]);
            newPixels[row][col] = !newPixels[row][col];
            return newPixels;
        });
    }, []);

    const handleReset = () => {
        setPixels(createEmptyGrid());
    };

    const renderCanvas = (label: string, isRight: boolean) => (
        <div className="demo-canvas-wrapper">
            <div className="demo-canvas-label">{label}</div>
            <div
                className="demo-canvas"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${GRID_WIDTH}, ${CELL_SIZE}px)`,
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: isRight
                        ? '0 0 20px rgba(0, 255, 255, 0.2)'
                        : '0 0 20px rgba(255, 100, 100, 0.2)'
                }}
            >
                {pixels.map((row, rowIndex) =>
                    row.map((isActive, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                            className="demo-cell"
                            style={{
                                width: CELL_SIZE,
                                height: CELL_SIZE,
                                backgroundColor: isActive ? '#1a1a1a' : '#f5f5f5',
                                cursor: 'pointer',
                                transition: 'background-color 0.15s ease, transform 0.1s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.1)';
                                e.currentTarget.style.zIndex = '1';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.zIndex = '0';
                            }}
                        />
                    ))
                )}
            </div>
        </div>
    );

    return (
        <div className="synced-canvas-demo">
            <div className="demo-description">
                <p>
                    <strong>Try it!</strong> Click on any cell in either canvas.
                    Watch how both canvases stay perfectly synchronized—just like
                    the real Coop_WS application with WebSocket connections.
                </p>
            </div>

            <div className="demo-canvases">
                {renderCanvas('Client A', false)}

                <div className="demo-sync-indicator">
                    <div className="sync-arrows">
                        <span className="sync-arrow left">←</span>
                        <span className="sync-label">Synced</span>
                        <span className="sync-arrow right">→</span>
                    </div>
                </div>

                {renderCanvas('Client B', true)}
            </div>

            <button className="demo-reset-btn" onClick={handleReset}>
                Reset Canvas
            </button>
        </div>
    );
}

export default SyncedCanvasDemo;
