import styled from 'styled-components'
import { hoverShadow, listReset } from '../../style/utils'

export const Wrapper = styled.article`
	border: ${p => p.theme.border.sm};
	${hoverShadow};
	padding: 5px;
`
export const DayDate = styled.h3`
	font-size: 1rem;
	cursor: pointer;
	margin: 0;
	margin-bottom: 5px;
	color: rgba(0, 0, 0, 0.4);
`

export const AppointmentsList = styled.ul`
	${listReset};
`
