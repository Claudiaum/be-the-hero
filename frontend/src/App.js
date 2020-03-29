import React from "react";
import Footer from "./Footer";
import Routes from "./routes";
import "./global.css";

function App() {
	return (
		<div>
			<Routes />
			<Footer title="BE THE HERO">
				by - Claudio Americo - powered with{" "}
				<span role="img" aria-label="hamburguer">
					&#127828;
				</span>
			</Footer>
		</div>
	);
}

export default App;
