import ExplicitEulerMethod from "./ExplicitRK/ExplicitEuler.js";
import ExplicitRalston from "./ExplicitRK/ExplicitRalston.js";
import ExplicitTrapezoidal from "./ExplicitRK/ExplicitTrapezoidal.js";
import ExplicitMidpoint from "./ExplicitRK/ExplicitMidpoint.js";
import ExplicitRK4 from "./ExplicitRK/ExplicitRK4.js";
import ExplicitRK6_1 from "./ExplicitRK/ExplicitRK6_1.js";
import ExplicitRK6_2 from "./ExplicitRK/ExplicitRK6_2.js";
import ExplicitRK7 from "./ExplicitRK/ExplicitRK7.js";
import ExplicitRK8 from "./ExplicitRK/ExplicitRK8.js";
import ExplicitDormandPrince from "./ExplicitRK/ExplicitDormandPrince.js";
import {createFamily} from "./methodFamily.js";

let methods=[ExplicitEulerMethod,
			ExplicitRalston,
			ExplicitTrapezoidal,
			ExplicitMidpoint,
			ExplicitRK4,
			ExplicitRK6_1,
			ExplicitRK6_2,
			ExplicitRK7,
			ExplicitRK8,
			ExplicitDormandPrince];

class ExplicitRKFamily
{
	constructor()
	{
	}
	Init(options)
	{
		this.method=new methods[options.order]();
		this.method.Init(options);
		this.Step=this.method.Step.bind(this.method);
	}
}

ExplicitRKFamily.attributes={name:{ru:'Явные методы Рунге-Кутты',eng:"Explicit Runge-Kutta methods"}};
ExplicitRKFamily.options=["chooseOrderEnabled"];
ExplicitRKFamily.orders=createFamily(methods);

export default ExplicitRKFamily;