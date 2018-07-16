import ImplicitRungeKuttaGeneral from "./ImplicitRungeKuttaGeneral.js";

class ImplicitRadauIA5 extends ImplicitRungeKuttaGeneral
{
	constructor()
	{
		super();
		{
			let root6=Math.sqrt(6);
			this.a_m=[1/9,(-1-root6)/18,(-1+root6)/18,
			1/9,(88+7*root6)/360,(88-43*root6)/360,
			1/9,(88+43*root6)/360,(80-7*root6)/360];//row order
			this.b_v=[1/9,(16+root6)/36,(16-root6)/36];
			this.c_v=[0,(6-root6)/10,(6+root6)/10];
		}
		this.k_order=3;
	}
}

ImplicitRadauIA5.attributes={name:{ru:'Метод Radau IA 5 порядка',eng:"5th order Radau IA method"}};
ImplicitRadauIA5.options=['jacobianMatrixEnabled'];

export default ImplicitRadauIA5;