import { css } from 'styled-components'
export const listReset = css`
	margin: 0;
	padding: 0;
	list-style-type: none;
`
export const center = css`
	display: flex;
	justify-content: center;
	align-items: center;
`
export const hoverShadow = css`
	transition: all 0.3s ease-in-out;
	&:hover {
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.03), 0 6px 6px rgba(0, 0, 0, 0.08);
		transition: all 0.3s ease-in-out;
	}
`
