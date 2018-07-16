import React from "react";

let help={ru:(
	<div>
		<div className="helpDescriptionHeader bg-danger text-white">Выбор графиков</div>
		<div className="helpDescriptionContent">
			<div>В блоке "Выбор графиков" возможен выбор эталонного решения для расчёта относительно него локальной и глобальной ошибки остальных методов.</div>
			<div>Помимо этого в данном блоке указываются графики, которые будут отображены в результатах расчёта решений.</div>
			<div>Для кажой задачи имеются специфичные графики.</div>
			<div>В блоке "Интервал построения графиков задаётся временной интервал, точки которого будут отображены на выбранных графиках.(В целях экономии памяти)</div> 
		</div>
	</div>
	),eng:(
	<div>
	<div className="helpDescriptionHeader bg-danger text-white">Choice of plots</div>
		<div className="helpDescriptionContent">
			<div>This block contains checkboxes for various plots and also allows to choose solution, which will be used for computation of errors.</div>
			<div>There are specific plots for each task.</div>
			<div>Block "Plotting interval" allows to set time interval of solution, which will be used for plotting.</div> 
		</div>
	</div>)};

class HelpPlots extends React.Component
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



export default HelpPlots;