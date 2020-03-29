import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./pages/Logon";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NewIncident from "./pages/NewIncident";

export default function Routes() {
	return (
		// precisa estar por fora de todas as rotas
		<BrowserRouter>
			{/* Certifica que vai estar rodando apenas uma página */}
			<Switch>
				{/* exact - a rota não pode ter filhos */}
				<Route path="/" exact component={Logon} />
				<Route path="/register" component={Register} />
				<Route path="/profile" component={Profile} />
				<Route path="/incidents/new" component={NewIncident} />
			</Switch>
		</BrowserRouter>
	);
}
