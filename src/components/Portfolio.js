import React from "react";

export default class Portfolio extends React.Component {
	render() {
		const myJobs = [
			{
				name: "JAVASCRIPT GAME",
				description: "Игра, написанная на чистом JavaScript без зависимостей, данные (такие как лучший результат на уровне или купленные улучшения для игрока) сохраняются в LocalStorage",
				siteLink: "https://loonywizard.github.io/game/",
				githubLink: "https://github.com/loonywizard/sp-bob-game",
				tags: [
					'ES6', 'NATIVE_JAVASCRIPT'
				]
			},
			{
				name: "NOTES EDITOR",
				description: "Небольшой редактор заметок с добавления тегов, по которым возможен поиск. Поддерживаются функции создания, редактирования и удаления заметок. Данные сохраняются в LocalStorage. Код написан на ES6, проект не имеет зависимостей, использован только нативный JavaScript",
				siteLink: "https://loonywizard.github.io/notes_editor/",
				githubLink: "https://github.com/loonywizard/NotesEditor",
				tags: [
					'ES6', 'NATIVE_JAVASCRIPT'
				]
			}
		].map((job, i) => {
			const tags = job.tags.map((tag, i) => <span key={i} className="tag">#{tag}</span>)
			return (
				<div key={i} className="job">
					<h3>{job.name}</h3>
					<p className="description">{job.description}</p>
					<div className="links">
						<a href={job.siteLink} target="_blank" className="btn">Посетить сайт</a>
						<a href={job.githubLink} target="_blank" className="btn">Код на GitHub</a>
					</div>
					<div className="tags">
						{tags}
					</div>
				</div>
			);
		});

		return (
			<div className="portfolio">
				<h2>Мои работы</h2>
				<div>
					{myJobs}
				</div>
			</div>
		);
	}
}