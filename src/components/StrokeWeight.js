import React, { useState } from 'react';
import styled from 'styled-components';
const Main = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
	background: var(--background-s);
	.active {
		border-color: var(--white);
	}
`;
const Box = styled.div`
	width: 60px;
	height: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	border: 3px solid transparent;
	padding: 0.2rem;
	border-radius: 10px;
	margin: 0 0.5rem;
	&:hover {
		border-color: var(--white);
	}
	@media (max-width: 768px) {
		width: 31px;
		height: 31px;
		border: 1px solid transparent;
	}
`;
const Circle = styled.div`
	border-radius: 50%;
	background: var(--text);
`;
export const StrokeWeight = (props) => {
	const sizes = [5, 10, 20, 30];
	const [currentSize, setCurrentSize] = useState(props.size);
	return (
		<Main>
			{sizes.map((size) => (
				<Box
					className={size === currentSize ? 'active' : ''}
					onClick={(e) => {
						setCurrentSize(size);
						props.setStrokeWeight(size);
						console.log(size);
					}}>
					<Circle
						style={{
							width: size + 'px',
							height: size + 'px',
						}}></Circle>
				</Box>
			))}
		</Main>
	);
};
