import React from "react";

// function Header(props) {
function Footer({ title, children }) {
	return (
		<footer>
			<h1>{title}</h1>
			<h6>{children}</h6>
		</footer>
	);
}

export default Footer;
