import styled, { css } from 'styled-components'
import { listReset, center } from '../../style/utils'

export const Wrapper = styled.nav`
	height: 10vh;
	display: flex;
	align-items: center;
	background-image: ${p => p.theme.gradient.pm};
`
export const NavList = styled.ul`
	${listReset};
	display: flex;
	width: 100%;
	justify-content: stretch;
`

export const NavItem = styled.li`
	flex: 1;
	color: white;
	text-align: center;
	${center};
	${p =>
		p.pointer &&
		css`
			cursor: pointer;
		`};
`
