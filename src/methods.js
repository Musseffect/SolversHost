import ExplicitRKFamily from "./methods/ExplicitRKFamily.js";
import ImplicitRKFamily from "./methods/ImplicitRKFamily.js";
import AdamsBashfort from "./methods/AdamsBashfort.js";
import BackwardDifferentiationFormulas from "./methods/BackwardDifferentiationFormulas.js";
import AdamsMulton from "./methods/AdamsMulton.js";

var methods;

var InitMethods=function(){
	
		//https://www.inf.ethz.ch/personal/gander/papers/qrneu.pdf
		//http://people.inf.ethz.ch/arbenz/ewp/Lnotes/chapter4.pdf
	methods=(function()
	{
		return [
			ExplicitRKFamily,
			ImplicitRKFamily,
			AdamsBashfort,
			BackwardDifferentiationFormulas,
			AdamsMulton
		];
		/*
			ExplicitEulerMethod,
			ExplicitRalston,
			ExplicitTrapezoidal,
			ExplicitMidpoint,
			ExplicitRK4,
			ExplicitRK6_1,
			ExplicitRK6_2,
			ExplicitDormandPrince,
			ImplicitEuler,
			ImplicitRadauIA5,
			ImplicitLobatto3C,*/
	})();
}
InitMethods();

export {methods};


/*

Что делать дальше?


Интерфейс выбора методов
Сохранение параметров эксперимент: Параметры задачи плюс параметры методов
Вывод графика ошибки 
графики решения с маркерами
Решить вопрос с ограничением точек
Вывод количества операций, затрат на решение
Возможен вывод жесткости задачи для методов в точках расчёта





*/