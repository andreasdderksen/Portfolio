import { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly';
import 'blockly/blocks';

// ===== Custom Block Definitions =====

// Robot movement blocks
Blockly.Blocks['robot_forward'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('🤖 Move Forward')
            .appendField(new Blockly.FieldNumber(1, 1, 10), 'STEPS')
            .appendField('steps');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('Move the robot forward');
    }
};

Blockly.Blocks['robot_backward'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('🤖 Move Backward')
            .appendField(new Blockly.FieldNumber(1, 1, 10), 'STEPS')
            .appendField('steps');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('Move the robot backward');
    }
};

Blockly.Blocks['robot_turn'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('🔄 Turn')
            .appendField(new Blockly.FieldDropdown([
                ['Left', 'LEFT'],
                ['Right', 'RIGHT']
            ]), 'DIRECTION');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('Turn the robot');
    }
};

Blockly.Blocks['robot_say'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('💬 Say')
            .appendField(new Blockly.FieldTextInput('Hello!'), 'MESSAGE');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip('Robot speaks a message');
    }
};

Blockly.Blocks['robot_light'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('💡 Set Light')
            .appendField(new Blockly.FieldDropdown([
                ['Red', 'RED'],
                ['Green', 'GREEN'],
                ['Blue', 'BLUE'],
                ['Off', 'OFF']
            ]), 'COLOR');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(20);
        this.setTooltip('Change robot light color');
    }
};

Blockly.Blocks['escape_check_sensor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('👁️ See Dot?');
        this.setOutput(true, 'Boolean');
        this.setColour(210);
        this.setTooltip('Check if robot sees a dot');
    }
};

Blockly.Blocks['escape_launch'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('🚀 Launch Puzzle')
            .appendField(new Blockly.FieldDropdown([
                ['Confetti', 'CONFETTI'],
                ['Smoke', 'SMOKE'],
                ['Lights', 'LIGHTS']
            ]), 'EFFECT');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip('Trigger escape room effect');
    }
};

// Toolbox definition
const toolbox = {
    kind: 'categoryToolbox',
    contents: [
        {
            kind: 'category',
            name: '🤖 Movement',
            colour: 160,
            contents: [
                { kind: 'block', type: 'robot_forward' },
                { kind: 'block', type: 'robot_backward' },
                { kind: 'block', type: 'robot_turn' },
            ]
        },
        {
            kind: 'category',
            name: '💬 Actions',
            colour: 290,
            contents: [
                { kind: 'block', type: 'robot_say' },
                { kind: 'block', type: 'robot_light' },
            ]
        },
        {
            kind: 'category',
            name: '🔍 Sensors',
            colour: 210,
            contents: [
                { kind: 'block', type: 'escape_check_sensor' },
            ]
        },
        {
            kind: 'category',
            name: '🎮 Escape Room',
            colour: 330,
            contents: [
                { kind: 'block', type: 'escape_launch' },
            ]
        },
        {
            kind: 'category',
            name: '🔧 Logic',
            colour: 210,
            contents: [
                { kind: 'block', type: 'controls_if' },
                { kind: 'block', type: 'controls_repeat_ext' },
                { kind: 'block', type: 'logic_compare' },
            ]
        },
    ]
};

// ===== Main Demo Component =====

function BlocklyDemo() {
    const blocklyDiv = useRef<HTMLDivElement>(null);
    const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
    const [blockCount, setBlockCount] = useState(0);

    useEffect(() => {
        if (blocklyDiv.current && !workspaceRef.current) {
            workspaceRef.current = Blockly.inject(blocklyDiv.current, {
                toolbox: toolbox,
                grid: {
                    spacing: 20,
                    length: 3,
                    colour: '#1a1a2e',
                    snap: true
                },
                move: {
                    scrollbars: true,
                    drag: true,
                    wheel: true
                },
                zoom: {
                    controls: true,
                    wheel: true,
                    startScale: 0.9,
                    maxScale: 2,
                    minScale: 0.3,
                    scaleSpeed: 1.2
                },
                trashcan: true,
                theme: Blockly.Theme.defineTheme('escapeRoom', {
                    base: Blockly.Themes.Classic,
                    componentStyles: {
                        workspaceBackgroundColour: '#0f0f23',
                        toolboxBackgroundColour: '#16213e',
                        toolboxForegroundColour: '#fff',
                        flyoutBackgroundColour: '#1a1a2e',
                        flyoutForegroundColour: '#fff',
                        flyoutOpacity: 0.9,
                        scrollbarColour: '#00d4ff',
                        scrollbarOpacity: 0.5,
                    }
                })
            });

            // Add initial blocks
            const startBlock = workspaceRef.current.newBlock('robot_forward');
            startBlock.initSvg();
            startBlock.render();
            startBlock.moveBy(50, 50);

            // Listen for changes
            workspaceRef.current.addChangeListener(() => {
                if (workspaceRef.current) {
                    const blocks = workspaceRef.current.getAllBlocks(false);
                    setBlockCount(blocks.length);
                }
            });
        }

        return () => {
            if (workspaceRef.current) {
                workspaceRef.current.dispose();
                workspaceRef.current = null;
            }
        };
    }, []);

    const handleReset = () => {
        if (workspaceRef.current) {
            workspaceRef.current.clear();
            setBlockCount(0);
        }
    };

    return (
        <div className="blockly-demo">
            <div className="demo-description">
                <p>
                    <strong>Try it!</strong> Drag blocks from the toolbox on the left
                    to create robot programs. Connect blocks together like puzzle pieces
                    to define escape room sequences.
                </p>
            </div>

            <div className="blockly-container">
                <div ref={blocklyDiv} className="blockly-workspace"></div>
            </div>

            <div className="blockly-footer">
                <div className="block-counter">
                    <span className="counter-label">Blocks used:</span>
                    <span className="counter-value">{blockCount}</span>
                </div>
                <button className="demo-reset-btn" onClick={handleReset}>
                    Clear Workspace
                </button>
            </div>
        </div>
    );
}

export default BlocklyDemo;
