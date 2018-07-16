import React from "react";

let help={ru:(
	<div>
	<div className="helpDescriptionHeader bg-danger text-white">Наборы параметров</div>
	<div className="helpDescriptionContent">
		<div>Блок "Наборы параметров" предназначен для сохранения и загрузки наборов параметров.</div>
		<div>Наборы параметров создаются отдельно для каждой задачи и хранятся до момента завершения работы со стендом. </div>
		<div>Для возможности работы с наборами при новом запуске стенда предусмотрена возможность сохранения и загрузки списка наборов в файл. </div> 
		<div>Возможные действия:</div>
		<ul>
			<li>Добавить набор параметров – сохранение заданных параметров задачи, списка методов и параметров выходных данных.</li>
			<li>Создать новый набор – сброс всех текущих заданных параметров задачи, списка методов и параметров выходных данных.</li>
			<li>Загрузить из файла – выбор файла для загрузки списка наборов.</li>
			<li>Сохранить в файл – сохранения файла на локальном диске.</li>
			<li>Загрузить – применение сохранённые в наборе значения параметров.</li>
			<li>Удалить – удаление заданного набора из списка.</li>
		</ul> 
	</div>
	</div>
	),
eng:(
	<div>
	<div className="helpDescriptionHeader bg-danger text-white">Parameter's presets</div>
	<div className="helpDescriptionContent">
		<div>Presets contain values defined by user for particular system and are available until the user has closed the tab in browser.</div>
		<div>Presets can be saved or loaded from local hard drive as a file.</div>
		<div>Possible actions:</div>
		<ul>
			<li>Add preset – adds new preset with current values of parameters.</li>
			<li>Reset parameters – sets all parameters for choose system to default values.</li>
			<li>Load from file – load presets from choosen file.</li>
			<li>Save to file – saves all created presets on hard drive.</li>
			<li>Load – apply saved parameters.</li>
			<li>Delete – delete choosen preset.</li>
		</ul>
	</div>
	</div>)
};

class HelpPresets extends React.Component
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




export default HelpPresets;