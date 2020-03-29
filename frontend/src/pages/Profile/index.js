import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import "./styles.css";
import api from "../../services/api";

import logoImg from "../../assets/logo.svg";

export default function Profile() {
	const ongName = localStorage.getItem("ongName") || "'Erro no login'";
	const ongId = localStorage.getItem("ongId");
	const [incidents, setIncidents] = useState([]);
	const history = useHistory();

	//usado para executar alguma ação assim que o usuário entra na página
	//primeiro parâmetro, função a ser executada
	//segundo parâmetro, array com variáveis que farão ela ser executada novamente
	useEffect(() => {
		api
			.get("profile", {
				headers: {
					authorization: ongId
				}
			})
			.then(res => {
				setIncidents(res.data.incidents);
			});
	}, [ongId]);

	async function handleDeleteIncident(id) {
		try {
			await api.delete(`incidents/${id}`, {
				headers: {
					authorization: ongId
				}
			});
			setIncidents(incidents.filter(incident => incident.id !== id));
		} catch (error) {
			alert("Erro ao deletar caso, tente novamente.");
		}
	}

	function handleLogout() {
		localStorage.clear();
		history.push("/");
	}

	return (
		<div className="profile-container">
			<header>
				<img src={logoImg} alt="Be the Hero" />
				<span>Bem vinda, {ongName}</span>
				<Link className="button" to="/incidents/new">
					Cadastrar novo caso
				</Link>
				<button onClick={handleLogout} type="button">
					<FiPower size={18} color="#e02041" />
				</button>
			</header>
			<h1>Casos cadastrados</h1>

			<ul>
				{incidents.map(incident => (
					<li key={incident.id}>
						<strong>CASO:</strong>
						<p>{incident.title}</p>
						<strong>DESCRIÇÃO:</strong>
						<p>{incident.description}</p>
						<strong>VALOR:</strong>
						<p>
							{Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: "BRL"
							}).format(incident.value)}
						</p>
						<button
							onClick={() => handleDeleteIncident(incident.id)}
							type="button"
						>
							<FiTrash2 size={20} color="#a8a8b3" />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
