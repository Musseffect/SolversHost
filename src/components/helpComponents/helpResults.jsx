import React from "react";

let help={ru:(
	<div>
		<div className="helpDescriptionHeader bg-danger text-white">Получение результатов</div>
		<div className="helpDescriptionContent">
			<div>Кнопка "Расcчитать" запускает(что бы вы думали?) расчёт решений с использованием заданных методов.</div>
			<div>После расчёта в нижней части появляются блоки "Вывод Результатов" и "Графики".</div>
			<div>В блоке "Вывод результатов" представлены следующие данные по каждому решению:</div>
			<ul>
				<li>Количество вычислений</li>
				<li>Средний шаг метода при решении</li>
				<li>Величины ошибок</li>
				<li>Количество решений системы уравнений</li>
			</ul> 
		</div>
	</div>
	),eng:(
	<div>
		<div className="helpDescriptionHeader bg-danger text-white">Results and plots</div>
		<div className="helpDescriptionContent">
			<div>Button "Compute" starts up computation of solutions with choosen methods.</div>
			<div>Blocks "Results" and "Plots" will apear after succesful computation.</div> 
		</div>
	</div>)};

class HelpResults extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	render()
	{
		const {lang}=this.props;
		return (
				<div id="helpComponent">
					{help[lang]}
				</div>
			);

	}
}





export default HelpResults;