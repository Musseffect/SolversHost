import ImplicitGeneral from "./ImplicitGeneral.js";

class ImplicitTrapezoidal extends ImplicitGeneral
{
	constructor()
	{
		super();
	}	
	F(yn_s,yo_s,step,func,yn_v,tn_s,yo_v)//Old Next Scalar Vector
	{
		var t=yn_s-yo_s-step*0.5*(func(yo_v,tn_s-step)+func(yn_v,tn_s));
		return t;
	}
	dF(delta,step,df,yn_v,tn,yo_v)
	{
		return delta-0.5*step*df(yn_v,tn);
	}
	dFNumeric(delta,step,func,jacstep,tn,yn_v,yo_v,index)
	{
		let y=yn_v.slice();
		for(let i=0;i<y.length;i++)
			y[i]=0.5*(y[index]+yo_v);
		let df=func(y,tn);
		y[index]+=jacstep;
		df=(func(y,tn)-df)/jacstep;
		return delta-step*0.5*df;
	}

}
ImplicitTrapezoidal.attributes={name:{ru:'Неявный метод трапеции',eng:"Implicit trapezoidal rule"}};
ImplicitTrapezoidal.options=['jacobianMatrixEnabled'];

export default ImplicitTrapezoidal;