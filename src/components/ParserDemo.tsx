import { useState, useCallback, useMemo } from 'react';
import {
    ReactFlow,
    Position,
    Handle,
} from '@xyflow/react';
import type { Node, Edge, NodeProps } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';

// ===== Simple Pratt Parser Implementation =====

type ASTNode = {
    type: 'number' | 'binary' | 'unary';
    value?: string;
    operator?: string;
    left?: ASTNode;
    right?: ASTNode;
    operand?: ASTNode;
};

type Token = {
    type: 'number' | 'operator' | 'lparen' | 'rparen' | 'end';
    value: string;
};

// Tokenizer
function tokenize(input: string): Token[] {
    const tokens: Token[] = [];
    let i = 0;

    while (i < input.length) {
        const char = input[i];

        if (/\s/.test(char)) {
            i++;
            continue;
        }

        if (/\d/.test(char)) {
            let num = '';
            while (i < input.length && /[\d.]/.test(input[i])) {
                num += input[i];
                i++;
            }
            tokens.push({ type: 'number', value: num });
            continue;
        }

        if ('+-*/^'.includes(char)) {
            tokens.push({ type: 'operator', value: char });
            i++;
            continue;
        }

        if (char === '(') {
            tokens.push({ type: 'lparen', value: '(' });
            i++;
            continue;
        }

        if (char === ')') {
            tokens.push({ type: 'rparen', value: ')' });
            i++;
            continue;
        }

        throw new Error(`Unknown character: ${char}`);
    }

    tokens.push({ type: 'end', value: '' });
    return tokens;
}

// Precedence table
function getPrecedence(op: string): number {
    switch (op) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        case '^':
            return 3;
        default:
            return 0;
    }
}

// Simple Pratt Parser
function parse(tokens: Token[]): ASTNode {
    let pos = 0;

    function current(): Token {
        return tokens[pos];
    }

    function advance(): Token {
        return tokens[pos++];
    }

    function parseExpression(minPrec: number = 0): ASTNode {
        let left = parsePrefix();

        while (current().type === 'operator' && getPrecedence(current().value) > minPrec) {
            const op = advance();
            const prec = getPrecedence(op.value);
            const right = parseExpression(op.value === '^' ? prec - 1 : prec);
            left = {
                type: 'binary',
                operator: op.value,
                left,
                right
            };
        }

        return left;
    }

    function parsePrefix(): ASTNode {
        const token = current();

        if (token.type === 'number') {
            advance();
            return { type: 'number', value: token.value };
        }

        if (token.type === 'operator' && (token.value === '-' || token.value === '+')) {
            advance();
            return {
                type: 'unary',
                operator: token.value,
                operand: parsePrefix()
            };
        }

        if (token.type === 'lparen') {
            advance();
            const expr = parseExpression(0);
            if (current().type !== 'rparen') {
                throw new Error('Expected closing parenthesis');
            }
            advance();
            return expr;
        }

        throw new Error(`Unexpected token: ${token.value || token.type}`);
    }

    return parseExpression(0);
}

// ===== Custom Node Components =====

function OperatorNode({ data }: NodeProps) {
    return (
        <div className="flow-node operator-node">
            <Handle type="target" position={Position.Top} />
            <span>{data.label as string}</span>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}

function NumberNode({ data }: NodeProps) {
    return (
        <div className="flow-node number-node">
            <Handle type="target" position={Position.Top} />
            <span>{data.label as string}</span>
        </div>
    );
}

const nodeTypes = {
    operator: OperatorNode,
    number: NumberNode,
};

// ===== Convert AST to React Flow nodes/edges =====

function astToFlow(ast: ASTNode): { nodes: Node[]; edges: Edge[] } {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    let idCounter = 0;

    function traverse(node: ASTNode, parentId?: string): string {
        const id = `node-${idCounter++}`;

        if (node.type === 'number') {
            nodes.push({
                id,
                type: 'number',
                data: { label: node.value },
                position: { x: 0, y: 0 },
            });
        } else if (node.type === 'unary') {
            nodes.push({
                id,
                type: 'operator',
                data: { label: node.operator },
                position: { x: 0, y: 0 },
            });
            const childId = traverse(node.operand!, id);
            edges.push({
                id: `edge-${id}-${childId}`,
                source: id,
                target: childId,
                type: 'smoothstep',
            });
        } else if (node.type === 'binary') {
            nodes.push({
                id,
                type: 'operator',
                data: { label: node.operator },
                position: { x: 0, y: 0 },
            });
            const leftId = traverse(node.left!, id);
            const rightId = traverse(node.right!, id);
            edges.push({
                id: `edge-${id}-${leftId}`,
                source: id,
                target: leftId,
                type: 'smoothstep',
            });
            edges.push({
                id: `edge-${id}-${rightId}`,
                source: id,
                target: rightId,
                type: 'smoothstep',
            });
        }

        if (parentId) {
            // Parent connection handled by parent
        }

        return id;
    }

    traverse(ast);
    return { nodes, edges };
}

// ===== Auto-layout with Dagre =====

function getLayoutedElements(nodes: Node[], edges: Edge[]) {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: 'TB', nodesep: 50, ranksep: 70 });

    const nodeWidth = 60;
    const nodeHeight = 60;

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        return {
            ...node,
            position: {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            },
        };
    });

    return { nodes: layoutedNodes, edges };
}

// ===== Main Demo Component =====

function ParserDemo() {
    const [input, setInput] = useState('1 + 2 * 3');
    const [ast, setAst] = useState<ASTNode | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleParse = useCallback(() => {
        try {
            setError(null);
            const tokens = tokenize(input);
            const tree = parse(tokens);
            setAst(tree);
        } catch (e) {
            setError((e as Error).message);
            setAst(null);
        }
    }, [input]);

    const { nodes, edges } = useMemo(() => {
        if (!ast) return { nodes: [], edges: [] };
        const { nodes: rawNodes, edges: rawEdges } = astToFlow(ast);
        return getLayoutedElements(rawNodes, rawEdges);
    }, [ast]);

    return (
        <div className="parser-demo">
            <div className="demo-description">
                <p>
                    <strong>Try it!</strong> Enter a math expression and click Parse
                    to see how the Pratt parser breaks it down into an Abstract Syntax Tree (AST).
                    Supports: +, -, *, /, ^ (power), and parentheses.
                </p>
            </div>

            <div className="parser-input-section">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter expression (e.g., 1 + 2 * 3)"
                    className="parser-input"
                    onKeyDown={(e) => e.key === 'Enter' && handleParse()}
                />
                <button className="parser-btn" onClick={handleParse}>
                    Parse
                </button>
            </div>

            {error && (
                <div className="parser-error">
                    Error: {error}
                </div>
            )}

            {ast && nodes.length > 0 && (
                <div className="ast-tree">
                    <div className="ast-header">Abstract Syntax Tree</div>
                    <div className="ast-flow-container">
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            nodeTypes={nodeTypes}
                            fitView
                            panOnDrag={false}
                            zoomOnScroll={false}
                            zoomOnPinch={false}
                            zoomOnDoubleClick={false}
                            preventScrolling={false}
                            nodesDraggable={false}
                            nodesConnectable={false}
                            elementsSelectable={false}
                            proOptions={{ hideAttribution: true }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ParserDemo;
