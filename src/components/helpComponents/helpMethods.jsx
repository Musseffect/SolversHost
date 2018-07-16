import React from "react";

let help={ru:(
	<div>
		<div className="helpDescriptionHeader bg-danger text-white">Выбор методов</div>
		<div className="helpDescriptionContent">
			<div>Блок "Выбор методов" предназначен для задания параметров исследуемых методов.</div>
			<div>Нажатие на кнопку добавляет новый метод в список методов.</div>
			<div>При нажатии на элемент списка его параметры отображаются в правой части.</div> 
			<div>Параметры методов:</div>
			<ul>
				<li>Семейство методов - позволяет выбрать семейство методов.</li>
				<li>Метод - позволяет выбрать конкретный метод из указанного семейства.</li>
				<li>Шаг - задаёт минимальный шаг интегрирования, шаг отображается в 1/1000 секунды.</li>
				<li>Максимальный шаг - задаёт максимальный шаг интегрирования, актуален для методов с адаптивным размером шага.</li>
				<li>Допустимая абс. ошибка - задаёт величину допустимой локальной ошибки, которая используется для расчёта шага в методах с выбором шага.</li>
				<li>Матрица Якоби - задаёт способ расчёта значений матрицы Якоби для неявных методов. Возможные значения - Приближённая, Аналитическая.</li>
				<li>Константная матрица - задаёт способ использования матрицы Якоби для итераций метода Ньютона. При положительном значении матрица рассчитывается только один раз перед итерациями на шаге.</li>
				<li>Количество итераций - задаёт максимальное количество итераций метода Ньютона решения систем нелинейных уравнений.</li>
				<li>Абс. ошибка - задаёт максимальную допустимую величину нормы абсолютной ошибки приближённого решения системы нелинейных уравнений методом Ньютона, используется для досрочного завершения итераций.</li>
				<li>Абс. разница решений - задаёт максимальную допустимую величину нормы абсолютной разницы двух последовательных приближённых решений методом Ньютона, используется для досрочного завершения итераций.</li>
				<li>Отн. разница решений - задаёт максимальную допустимую величину относительной разницы двух последовательных приближённых решений методом Ньютона, используется для досрочного завершения итераций.</li>
			</ul>
		</div>
	</div>
	),eng:(
	<div>
		<div className="helpDescriptionHeader bg-danger text-white">Methods</div>
		<div className="helpDescriptionContent">
			<div>The button with plus sign is used to add method to the list of methods, used in computation.</div>
			<div>Parameters of selected method are shown in right or lower part of the block.</div>
			<div>List of parameters:</div>
			<ul>
				<li>Family of methods - sets family of methods.</li>
				<li>Method - sets method.</li>
				<li>Step - sets minimal step for numerical solution in 1/1000 of a second.</li>
				<li>Max step - sets maximal step for solution, used for methods with variable step.</li>
				<li>Abs. error tolerance - sets value of error tolerance, which is used for step caluclation in methods with variable step.</li>
				<li>Jacobian matrix - sets the way of computing for elements of jacobian matrix.</li>
				<li>Use constant matrix - if it's set, jacobian matrix for iterations will be computed only one time for each step of implicit numerical method.</li>
				<li>Iterations - sets maximal number of iterations for Newton method.</li>
				<li>Max abs. error - sets maximal allowed value of absolute error of aproximated solution for iterations of Newton method.</li>
				<li>Max abs. solutions difference - sets maximal allowed value of absolute difference between two approximated solutions of Newton method.</li>
				<li>Max rel. solutions difference - sets maximal allowed value of relative difference between two approximated solutions of Newton method.</li>
			</ul>
		</div>
	</div>
		)};

class HelpMethods extends React.Component
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



export default HelpMethods;