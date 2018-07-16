
import gaussSolve from "../../gauss.js";

class ImplicitGeneral
{
	constructor()
	{
		this.step=0;
		this.funcs=null;
		this.jacobianConst=false;
		this.jacobian=null;
		this.jacobian_m=null;
		this.max_iteration=10;
		this.maxAbsDifference=0.01;
		this.maxRelDifference=0.01;
		this.maxAbsSolution=0.01;
	}
	Init(options)
	{
		this.step=options.step;
		this.funcs=options.funcsVector;
		if(options.jacobianCalc==true)
		{
			this.jacobian=options.jacobian;
			this.Step=this.StepAnalytic;
		}else
		{
			this.Step=this.StepNumeric;
		}
		this.jacobianConst=(options.jacobianConst==true?true:false);
		this.max_iteration=(options.max_iteration==undefined?10:options.max_iteration);
		this.maxAbsDifference=(options.maxAbsDifference==undefined?0.01:options.maxAbsDifference);
		this.maxRelDifference=(options.maxRelDifference==undefined?0.01:options.maxRelDifference);
		this.maxAbsSolution=(options.maxAbsSolution==undefined?0.01:options.maxAbsSolution);
		var count=this.funcs.length;
		this.jacobian_m=new Array(count*count);
	}
	F(yn_s,yo_s,step,func,yn_v,tn_s,yo_v)//Old Next Scalar Vector
	{
		return 0.0;
	}
	dF(delta,step,df,yn_v,tn,yo_v)
	{
		return 0;
	}
	dFNumeric(delta,step,func,jacstep,tn,yn_v,yo_v,index)
	{
		return 0;
	}
	StepAnalytic(data,complexity)
	{
		var count=data.xv.length;
		var f=new Array(count);
		var y=data.xv.slice();
		var t_next=data.t+this.step;
		var y_old=data.xv.slice();
		var k=0;
		var lastFNorm=0;
		if(this.jacobianConst==true)
		{
			for(var j=0;j<count;j++)
			{
				for(var i=0;i<count;i++)
				{	
					this.jacobian_m[i+j*count]=this.dF((i==j?1.0:0.0),this.step,this.jacobian[i+j*count],y,t_next,y_old);
				}
			}
		}
		for(var i=0;i<count;i++)
		{
			f[i]=-this.F(y_old[i],y[i],this.step,this.funcs[i],y,t_next,y_old);
			lastFNorm=Math.max(lastFNorm,Math.abs(f[i]));
		}
		while(true)
		{
			//solve system J(y_new(i))(dy)=-F(y_new(i))
			//y_new(0)=y_old
			var dy;
			if(this.jacobianConst==true)
			{
				var jacobian_t=this.jacobian_m.slice();
				dy=gaussSolve(jacobian_t,f);
			}
			else
			{
				for(var j=0;j<count;j++)
				{
					for(var i=0;i<count;i++)
					{	
						this.jacobian_m[i+j*count]=this.dF((i==j?1.0:0.0),this.step,this.jacobian[i+j*count],y,t_next,y_old);
					}
				}
				dy=gaussSolve(this.jacobian_m,f);
			}
			let dyNorm=0;//max norm for dy
			let yNorm=0;
			for(var i=0;i<count;i++)
			{
				dyNorm=Math.max(Math.abs(dy[i]),dyNorm);
				yNorm=Math.max(Math.abs(y[i]),yNorm);
				y[i]+=dy[i];
			}
			k++;
			var fNorm=0;//max norm for F(y_old+dy)
			for(var i=0;i<count;i++)
			{
				f[i]=-this.F(y[i],y_old[i],this.step,this.funcs[i],y,t_next,y_old);
				fNorm=Math.max(fNorm,Math.abs(f[i]));
			}
			if(lastFNorm>=fNorm)
			{
				for(var i=0;i<count;i++)//remember last optimal solution
				{
					data.xv[i]=y[i];
				}
				lastFNorm=fNorm;
			}
			if(fNorm<this.maxAbsSolution)
			{
				break;
			}
			if(dyNorm<this.maxAbsDifference)
			{
				break;
			}
			if(dyNorm<this.maxRelDifference*yNorm)
			{
				break;
			}
			if(k>this.max_iteration)
			{
				break;
			}
		}
		complexity.rightSideEvaluation+=(k+1)*count;
		complexity.matrixSolving+=k;
		complexity.currentStep=this.step;
		complexity.averageStep+=this.step;
		if(this.jacobianConst!=true)
			complexity.jacobianCalculations+=count*count*k;
		else
			complexity.jacobianCalculations+=count*count;
		data.t+=this.step;
		return;
	}
	StepNumeric(data,complexity)
	{
		var count=data.xv.length;
		var max_iteration=10;
		var f=new Array(count);
		var y=data.xv.slice();
		var t_next=data.t+this.step;
		var y_old=data.xv.slice();
		var jacobianStep=0.001;
		var k=0;
		var lastFNorm=0;
		if(this.jacobianConst==true)
		{
			for(var j=0;j<count;j++)
			{
				for(var i=0;i<count;i++)
				{//df=y+jstep-h*f(t,y+jstep)-y+h*f(t,y)
					this.jacobian_m[i+j*count]=this.dFNumeric((i==j?1.0:0.0),this.step,this.funcs[j],t_next,y,y_old,i);
				}
			}
		}
		for(var i=0;i<count;i++)
		{
			f[i]=(-this.F(y[i],y_old[i],this.step,this.funcs[i],y,t_next,y_old));
			lastFNorm=Math.max(lastFNorm,Math.abs(f[i]));
		}
		while(true)
		{
			
			//solve system J(y_new(i))(dy)=-F(y_new(i))
			//y_new(0)=y_old
			var dy;
			if(this.jacobianConst==true)
			{
				var jacobian_t=this.jacobian_m.slice();
				dy=gaussSolve(jacobian_t,f);
			}else
			{
				for(var j=0;j<count;j++)
				{
					for(var i=0;i<count;i++)
					{//df=y+jstep-h*f(t,y+jstep)-y+h*f(t,y)
						this.jacobian_m[i+j*count]=this.dFNumeric((i==j?1.0:0.0),this.step,this.funcs[j],t_next,y,y_old,i);
					}
				}
				dy=gaussSolve(this.jacobian_m,f);
			}
			let dyNorm=0;//max norm for dy
			let yNorm=0;
			for(var i=0;i<count;i++)
			{
				dyNorm=Math.max(Math.abs(dy[i]),dyNorm);
				yNorm=Math.max(Math.abs(y[i]),yNorm);
				y[i]+=dy[i];
			}
			k++;
			var fNorm=0;//max norm for F(y_old+dy)
			for(var i=0;i<count;i++)
			{
				f[i]=(-this.F(y[i],y_old[i],this.step,this.funcs[i],y,t_next,y_old));
				fNorm=Math.max(fNorm,Math.abs(f[i]));
			}
			if(lastFNorm>=fNorm)
			{
				for(var i=0;i<count;i++)//remember last optimal solution
				{
					data.xv[i]=y[i];
				}
				lastFNorm=fNorm;
			}
			if(fNorm<this.maxAbsSolution)
			{
				break;
			}
			if(dyNorm<this.maxAbsDifference)
			{
				break;
			}
			if(dyNorm<this.maxRelDifference*yNorm)
			{
				break;
			}
			if(k>this.max_iteration)
			{
				break;
			}
		}
		complexity.rightSideEvaluation+=(k+1)*count;
		complexity.matrixSolving+=k;
		complexity.currentStep=this.step;
		complexity.averageStep+=this.step;
		if(this.jacobianConst!=true)
			complexity.rightSideEvaluation+=count*count*k;
		else
			complexity.rightSideEvaluation+=count*count;
		//complexity.rightSideEvaluation+=(k+1)*count;
		data.t+=this.step;
		return;
	}

}

export default ImplicitGeneral;