import React, { useState } from 'react';
import styled from 'styled-components';
const Main = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.active {
		border-color: var(--white);
	}
	z-index: 1;
`;
const ColorRow = styled.div`
	display: flex;
	flex-direction: row;
	z-index: 1;
`;
const Color = styled.div`
	width: 35px;
	height: 35px;
	margin: 0.5rem;
	border-radius: 10px;
	border: 3px solid transparent;
	cursor: pointer;
	padding: 0.2rem;
	z-index: 1;

	&:hover {
		border-color: var(--white);
	}

	@media (max-width: 768px) {
		width: 20px;
		height: 20px;
		border: 1px solid transparent;
	}
`;

export const ColorPalette = (props) => {
	const colors = [
		['#000000', '#ffffff', '#663300', '#ff66ff', '#0099ff'],
		['#8bc34a', '#ffeb3b', '#ff8000', '#607d8b', '#ff3333'],
	];
	const [currentColor, setCurrentColor] = useState('#f44336');
	return (
		<>
			<Main>
				{colors.map((row) => (
					<ColorRow>
						{row.map((color) => (
							<Color
								className={
									color === currentColor ? 'active' : ''
								}
								style={{
									background: color,
								}}
								onClick={(e) => {
									setCurrentColor(color);
									props.setStroke(color);
								}}></Color>
						))}
					</ColorRow>
				))}
			</Main>
		</>
	);
};
