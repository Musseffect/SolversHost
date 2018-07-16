import ImplicitGeneral from "./ImplicitGeneral.js";

class ImplicitEuler extends ImplicitGeneral
{
	constructor()
	{
		super();
	}
	F(yn_s,yo_s,step,func,yn_v,tn_s,yo_v)//Old Next Scalar Vector
	{
		var t=yn_s-yo_s-step*func(yn_v,tn_s);
		return t;
	}
	dF(delta,step,df,yn_v,tn,yo_v)
	{
		return delta-step*df(yn_v,tn);
	}
	dFNumeric(delta,step,func,jacstep,tn,yn_v,yo_v,index)
	{
		var y_temp=yn_v[index];
		let df=func(yn_v,tn);
		yn_v[index]+=jacstep;
		df=(func(yn_v,tn)-df)/jacstep;
		yn_v[index]=y_temp;
		return delta-step*df;
	}
	/*BIGF(y_old_s,y_new_s,step,func_s,t_next,y_new_v)//s for scalar, v for vector
			//F(y(s+1))=y(s+1)-y(s)-h*f(t(s+1),y(s+1))
	{	
		var t=y_new_s-y_old_s-step*func_s(y_new_v,t_next);
		return t;
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
					var df=-this.step*this.jacobian[i+j*count](y,t_next);
					if(i==j)
						df+=1.0;
					this.jacobian_m[i+j*count]=df;
				}
			}
		}
		for(var i=0;i<count;i++)
		{
			f[i]=-this.BIGF(y_old[i],y[i],this.step,this.funcs[i],t_next,y);
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
						var df=-this.step*this.jacobian[i+j*count](y,t_next);
						if(i==j)
							df+=1.0;
						this.jacobian_m[i+j*count]=df;
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
				f[i]=-this.BIGF(y_old[i],y[i],this.step,this.funcs[i],t_next,y);
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
					var y_temp=y[i];
					var df=(-this.funcs[j](y,t_next));
					y[i]+=jacobianStep;
					df=(-this.funcs[j](y,t_next)-df);
					df*=this.step;
					df/=jacobianStep;
					if(i==j)
						df+=1.0;
					this.jacobian_m[i+j*count]=df;
					y[i]=y_temp;
				}
			}
		}
		for(var i=0;i<count;i++)
		{
			f[i]=(-this.BIGF(y_old[i],y[i],this.step,this.funcs[i],t_next,y));
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
						var y_temp=y[i];
						var df=(-this.funcs[j](y,t_next));
						y[i]+=jacobianStep;
						df=(-this.funcs[j](y,t_next)-df);
						df*=this.step;
						df/=jacobianStep;
						if(i==j)
							df+=1.0;
						this.jacobian_m[i+j*count]=df;
						y[i]=y_temp;
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
				f[i]=(-this.BIGF(y_old[i],y[i],this.step,this.funcs[i],t_next,y));
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
	}*/
}
ImplicitEuler.attributes={name:{ru:'Неявный метод Эйлера',eng:"Implicit Euler method"}};
ImplicitEuler.options=['jacobianMatrixEnabled'];

export default ImplicitEuler;