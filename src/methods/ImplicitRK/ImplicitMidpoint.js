import ImplicitGeneral from "./ImplicitGeneral.js";

class ImplicitMidpoint extends ImplicitGeneral
{
	constructor()
	{
		super();
	}
	F(yn_s,yo_s,step,func,yn_v,tn_s,yo_v)//Old Next Scalar Vector
	{
		let y=yn_v.slice();
		for(let i=0;i<y.length;i++)
			y[i]=0.5*(y[i]+yo_v[i]);
		var t=yn_s-yo_s-step*func(y,tn_s-0.5*step);
		return t;
	}
	dF(delta,step,df,yn_v,tn,yo_v)
	{
		let y=yn_v.slice();
		for(let i=0;i<y.length;i++)
			y[i]=0.5*(y[i]+yo_v[i]);
		return delta-0.5*step*df(y,tn-0.5*step);
	}
	dFNumeric(delta,step,func,jacstep,tn,yn_v,yo_v,index)
	{
		let y=yn_v.slice();
		for(let i=0;i<y.length;i++)
			y[i]=0.5*(y[i]+yo_v[i]);
		var y_temp=y[index];
		let df=func(y,tn-0.5*step);
		y[index]+=jacstep;
		df=(func(y,tn-0.5*step)-df)/jacstep;
		return delta-step*0.5*df;
	}

}
ImplicitMidpoint.attributes={name:{ru:'Неявный метод средней точки',eng:"Implicit midpoint method"}};
ImplicitMidpoint.options=['jacobianMatrixEnabled'];

export default ImplicitMidpoint;