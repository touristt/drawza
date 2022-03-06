import React, { useState, useRef } from 'react';
import Sketch from 'react-p5';
import styled from 'styled-components';
import { notification } from '../utils/notification';
import { ColorPalette } from './ColorPalette';
import { StrokeWeight } from './StrokeWeight';
import { FiTrash } from 'react-icons/fi';
import {
	FaEraser,
	FaPencilAlt,
	FaPaintRoller,
	FaBars,
	FaStream,
} from 'react-icons/fa';

const CanvasStyles = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	user-select: none;
	#tools {
		position: absolute;
		top: 10px;
		left: 15px;
		cursor: pointer;
		.icon {
			margin: 0.3rem 0.8rem;
			padding: 0.5rem;
			height: 45px;
			width: 45px;
			border: 3px solid transparent;
			border-radius: 10px;
			cursor: pointer;
			&:hover {
				border: 3px solid var(--white);
			}
		}
	}
	.row1 {
		margin-top: 2rem;
		padding: 1rem 1.5rem;
		display: flex;
		justify-content: space-around;
		border-radius: 10px 10px 10px 10px;
		background-color: var(--background-s);
	}
	.row2 {
		padding: 1rem 1.5rem;
		display: flex;
		justify-content: center;
		border-radius: 0 0 10px 10px;
		background-color: var(--background-s);
		margin-bottom: 2rem;
		.tool-icon {
			margin: 0.3rem 0.8rem;
			padding: 0.5rem;
			height: 45px;
			width: 45px;
			border: 3px solid transparent;
			border-radius: 10px;
			cursor: pointer;
			&:hover {
				border: 3px solid var(--white);
			}
			@media (max-width: 768px) {
				width: 35px;
				height: 35px;
			}
		}
		.active {
			border: 3px solid var(--white);
		}
	}
`;

export const Canvas = () => {
	const [background, setBackground] = useState('#333');
	const [stroke, setStroke] = useState('#0099ff');
	const [eraserOn, setEraserOn] = useState(false);
	const [strokeWeight, setStrokeWeight] = useState(10);
	const [toolsVisible, setToolsVisible] = useState(false);
	const [canDraw, setCanDraw] = useState(false);
	const [overTools, setOverTools] = useState(false);

	const p5Ref = useRef(null);
	const canvasRef = useRef(null);
	const selectBackgroundRef = useRef(null);
	const setup = (p5, canvasParentRef) => {
		canvasRef.current = p5
			.createCanvas(window.innerWidth, window.innerHeight - 7)
			.parent(canvasParentRef);
		canvasRef.current.elt.style.cursor = 'crosshair';
		p5.background(background);
		p5Ref.current = p5;
		if (window.innerWidth > 768)
			notification(
				'Draw by dragging or Hold key "d" and move the cursor',
				`shortcuts: <clear-screen : 'c'> <pencil: 'p'> <eraser: 'e'> <increase-stroke-weight:'+'> <decrease-stroke-weight:'-'>`,
				'info',
				10000
			);
	};
	const draw = (p5) => {
		if (canDraw) drawing(p5);
	};
	const keyPressed = (p5) => {
		if (p5.keyCode === 68) {
			setCanDraw(true);
		} else if (p5.keyCode === 67) {
			updateBackground();
			notification('', 'Canvas Cleared', 'info');
		} else if (p5.keyCode === 69) {
			setEraserOn(true);
			notification('', 'Eraser On', 'info');
		} else if (p5.keyCode === 80) {
			setEraserOn(false);
			notification('', 'Pencil On', 'info');
		} else if (p5.keyCode === 107) {
			setStrokeWeight(strokeWeight + 5);
			notification('', '++size: ' + strokeWeight, 'info');
		} else if (p5.keyCode === 109) {
			setStrokeWeight(Math.max(1, strokeWeight - 5));
			notification('', '--size: ' + strokeWeight, 'info');
		}
	};
	const keyReleased = (p5) => {
		if (p5.keyCode === 68) {
			setCanDraw(false);
		}
	};
	const mouseDragged = (p5) => {
		setCanDraw(true);
	};
	const mouseReleased = (p5) => {
		setCanDraw(false);
	};
	const mousepressed = (p5) => {
		if (!overTools) setCanDraw(true);
	};
	const drawing = (p5) => {
		setToolsVisible(false);
		if (!eraserOn) {
			p5.stroke(stroke);
			p5.fill(255);
		} else {
			p5.stroke(background);
			p5.fill(background);
		}

		p5.strokeWeight(strokeWeight);
		const mx = p5.mouseX;
		const my = p5.mouseY;
		const pmx = p5.pmouseX;
		const pmy = p5.pmouseY;
		p5.line(mx, my, pmx, pmy);
	};

	const updateBackground = () => {
		p5Ref.current.background(background);
	};

	return (
		<CanvasStyles>
			{' '}
			<div>
				<div
					id='tools'
					onMouseEnter={() => setOverTools(true)}
					onMouseLeave={() => setOverTools(false)}>
					{toolsVisible ? (
						<div
							className='icon'
							onClick={() => setToolsVisible(!toolsVisible)}>
							<FaStream />
						</div>
					) : (
						<div
							className='icon'
							onClick={() => setToolsVisible(!toolsVisible)}>
							<FaBars />
						</div>
					)}
					{toolsVisible ? (
						<>
							<div className='row1'>
								<ColorPalette setStroke={setStroke} />
								<StrokeWeight
									size={strokeWeight}
									setStrokeWeight={
										setStrokeWeight
									}></StrokeWeight>
							</div>
							<div className='row2'>
								<div
									className={
										!eraserOn
											? 'active tool-icon'
											: 'tool-icon'
									}
									onClick={(e) => {
										if (!eraserOn) return;
										setEraserOn((eraser) => !eraser);
										canvasRef.current.elt.style.cursor =
											'crosshair';
									}}>
									<FaPencilAlt />
								</div>
								<div
									className={
										eraserOn
											? 'active tool-icon'
											: 'tool-icon'
									}
									onClick={(e) => {
										if (eraserOn) return;
										setEraserOn((eraser) => !eraser);
										canvasRef.current.elt.style.cursor = '';
									}}
									title='Eraser'>
									<FaEraser />
								</div>
								<div
									className='tool-icon'
									onClick={(e) => {
										updateBackground();
									}}
									title='Clear'>
									<FiTrash />
								</div>
								<div className='tool-icon'>
									<FaPaintRoller
										onClick={(e) => {
											selectBackgroundRef.current.click();
										}}
									/>
									<input
										style={{ height: '0px', width: '0px' }}
										type='color'
										ref={selectBackgroundRef}
										onChange={(e) => {
											setBackground(e.target.value);
											updateBackground();
										}}
										title='Change background'
										value={background}
									/>
								</div>
							</div>
						</>
					) : (
						''
					)}
				</div>
				<Sketch
					setup={setup}
					draw={draw}
					updateBackground={updateBackground}
					mouseDragged={mouseDragged}
					mouseReleased={mouseReleased}
					mousePressed={mousepressed}
					keyPressed={keyPressed}
					keyReleased={keyReleased}
				/>
			</div>
		</CanvasStyles>
	);
};
