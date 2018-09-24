import React, { PureComponent } from 'react'
import P from 'prop-types'

import * as S from './style'

class Navigation extends PureComponent {
	render() {
		const { handlePreviousMonth, currentMonth, handleNextMonth } = this.props

		return (
			<S.Wrapper>
				<S.NavList>
					<S.NavItem pointer onClick={handlePreviousMonth}>
						{'<'}
					</S.NavItem>
					<S.NavItem>
						<h1>{currentMonth}</h1>
					</S.NavItem>
					<S.NavItem pointer onClick={handleNextMonth}>
						{'>'}
					</S.NavItem>
				</S.NavList>
			</S.Wrapper>
		)
	}
}

Navigation.propTypes = {
	handlePreviousMonth: P.func.isRequired,
	currentMonth: P.string.isRequired,
	handleNextMonth: P.func.isRequired
}

export default Navigation
