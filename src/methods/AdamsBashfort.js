import ExplicitRK6_1 from './ExplicitRK/ExplicitRK6_1.js';
class AdamsBashfort
{
	constructor()
	{
		this.step;
		this.points=null;
		this.maxOrder;
		this.counter;
		this.funcs;
		this.Method=new ExplicitRK6_1();
		this.Step=this.StepFirst;
	}
	Init(options)
	{
		this.counter=1;
		this.step=options.step;
		this.funcs=options.funcsVector;
		this.maxOrder=options.order!==undefined?Math.max(1,Math.min(5,options.order)):5;
		this.points=new Array(/*maxOrder*funcs.length*/);
		//console.log(maxOrder);
		if(this.maxOrder==1)
		{
			this.Step=this.StepGeneral;
			return;
		}else{
			this.Step=this.StepFirst;
		}
		this.Method.Init(options);
		//this.DP.Init({minStep:step,maxStep:step,step:step,funcsVector:funcs});
	}
	StepFirst(data,complexity)
	{
		for(var i=this.funcs.length-1;i>-1;i--)
		{
			this.points.unshift(this.funcs[i](data.xv,data.t));
		}
		this.Method.Step(data,complexity);
		this.counter++;
		if(this.counter==this.maxOrder)
		{
			this.Step=this.StepGeneral;
		}
	}
	StepGeneral(data,complexity)
	{
		var count=data.xv.length;

		this.points.splice((this.maxOrder-1)*count,count);
		//console.log('postsplice: '+points);
		for(var i=count-1;i>-1;i--)
		{
			this.points.unshift(this.funcs[i](data.xv,data.t));
		}
		//console.log(points);
		for(var j=0;j<this.counter;j++)
		{
			for(var i=0;i<count;i++)
				data.xv[i]+=this.step*this.points[i+j*count]*AB.coefficients[this.counter-1][j];
		}
		complexity.rightSideEvaluation+=count;
		complexity.currentStep=this.step;
		complexity.averageStep+=this.step;
		data.t+=this.step;
	}
}
let AB=AdamsBashfort;
AB.coefficients=[
			[1],
			[1.5,-0.5],
			[23/12,-4/3,5/12],
			[55/24,-59/24,37/24,-3/8],
			[1901/720,-1387/360,109/30,-637/360,251/720],
			[4277/1440,-2641/480,4991/720,-3649/720,959/480,-95/288]];
AdamsBashfort.attributes={name:{ru:"Явные методы Адамса-Башфорта",eng:"Explicit Adams methods"}};
AdamsBashfort.options=["chooseOrderEnabled"];
AdamsBashfort.orders=
[
{name:{ru:"Метод Эйлера (1)",eng:"Euler method (1)"}},
{name:{ru:"Метод 2го порядка",eng:"2nd order method"}},
{name:{ru:"Метод 3го порядка",eng:"3rd order method"}},
{name:{ru:"Метод 4го порядка",eng:"4th order method"}},
{name:{ru:"Метод 5го порядка",eng:"5th order method"}},
{name:{ru:"Метод 6го порядка",eng:"6th order method"}}
];

export default AdamsBashfort;