import React from "react";

let help={ru:(
	<div>
	<div className="helpDescriptionHeader bg-danger text-white">Задачи</div>
	<div className="helpDescriptionContent">
		<div className="helpDescriptionLabel">Параметры системы</div>
		<div>Блок "Параметры системы" позволяет задавать значения численных констант для выбранной задачи.</div> 
		<div className="helpDescriptionLabel">Начальные условия и интервал расчёта</div>
		<div>В блоке "Начальные условия и интервал расчёта" расположены элементы для задания значений в момент времени t<sub>0</sub>.</div>
		<div>Элементы "Начальное время" и "Продолжительность" задают значение t<sub>0</sub> и длину интервала расчёта решений.</div> 
	</div>
	</div>
	),eng:(
	<div>
		<div className="helpDescriptionHeader bg-danger text-white">Choice of ODE system</div>
		<div className="helpDescriptionContent">
			<div>List of different ODE systems used for methods comparison is the "Systems" block.</div>
			<div className="helpDescriptionLabel">System description</div>
			<div>To change height of the block drag lower right corner.</div>
			<div className="helpDescriptionLabel">System parameters</div>
			<div>Values of system constants can be set here.</div>
			<div className="helpDescriptionLabel">Initial conditions and and argument interval</div>
			<div>Elements in this block allow to set values for initial conditions.</div>
			<div>Elements "Start time" and "Time length" used to set value t<sub>0</sub> and length of time interval of solution.</div> 
		</div>
	</div>)};

class HelpTasks extends React.Component
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





export default HelpTasks;