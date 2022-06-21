import PropTypes from "prop-types"
import { useLocation } from "react-router-dom"
import Buttons from "./Buttons"

const Header = ({ title, onAdd, showAdd }) => {
	const location = useLocation()

	return (
		<header className="header">
			<h1>{title}</h1>
			{location.pathname === "/React-Task-Tracker" && (
				<Buttons
					color={showAdd ? "red" : "green"}
					text={showAdd ? "Close" : "Add"}
					onClick={onAdd}
				/>
			)}
		</header>
	)
}

Header.defaultProps = {
	title: "Task Test",
}

Header.propTypes = {
	title: PropTypes.string.isRequired,
}

// CSS in JS
// const headingStyle = {
//   color: "red",
//   backgroundColor: 'Black'
// }

export default Header
