import styled, { css } from 'styled-components'
import { Form as FormikForm, Field as FormikField } from 'formik'

import { center, hoverShadow } from '../../style/utils'

export const Field = styled(FormikField)`
	width: 100%;
	border-radius: 5px;
	padding: 5px;
	border: ${p => p.theme.border.md};
`

export const Form = styled(FormikForm)`
	min-height: 60vh;
	width: 30%;
	min-width: 300px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: white;
	padding: 20px;
	border-radius: 5px;
	${hoverShadow};
`

export const ModalWrapper = styled.section`
	position: fixed;
	top: 0;
	left: 0;
	min-height: 100%;
	min-width: 100%;
	z-index: 1000;
	background-color: rgba(0, 0, 0, 0.8);
	${center};
`

export const Error = styled.span`
	color: #ff5050;
`

export const Label = styled.label`
	color: black;
	padding-top: 10px;
	padding-bottom: 10px;
`

export const ModalClose = styled.button`
	cursor: pointer;
	background-color: transparent;
	position: absolute;
	top: 0;
	right: 0;
	border: none;
	color: rgba(255, 255, 255, 0.8);
	width: 150px;
	height: auto;
	font-size: 100px;
`

export const SubmitButton = styled.button`
	border: none;
	border-radius: 5px;
	padding: 20px;
	color: white;
	${hoverShadow};
	background-image: ${p => p.theme.gradient.pm};
	cursor: pointer;
	${p =>
		p.disabled &&
		css`
			background-image: none;
			background-color: #eee;
			cursor: not-allowed;
		`};
`

export const Title = styled.h3`
	text-align: center;
	font-size: 2rem;
`

export const LabelledInput = styled.fieldset`
	border: none;
	margin: 0;
	padding: 0;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: start;
	flex-wrap: wrap;
	margin-bottom: 20px;
`
