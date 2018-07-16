import ImplicitEuler from "./ImplicitRK/ImplicitEuler.js";
import ImplicitRadauIA5 from "./ImplicitRK/ImplicitRadauIA5.js";
import ImplicitLobatto3C from "./ImplicitRK/ImplicitLobatto3C.js";
import ImplicitMidpoint from "./ImplicitRK/ImplicitMidpoint.js";
import ImplicitTrapezoidal from "./ImplicitRK/ImplicitTrapezoidal.js";
import {createFamily} from "./methodFamily.js";

var methods=[ImplicitEuler,ImplicitMidpoint,ImplicitTrapezoidal,ImplicitRadauIA5,ImplicitLobatto3C];

class ImplicitRKFamily
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

ImplicitRKFamily.attributes={name:{ru:'Неявные методы Рунге-Кутты',eng:"Implicit Runge-Kutta methods"}};
ImplicitRKFamily.options=["chooseOrderEnabled",'jacobianMatrixEnabled'];
ImplicitRKFamily.orders=createFamily(methods);

export default ImplicitRKFamily;