import ExplicitRKGeneral from "./ExplicitRKGeneral.js";



class ExplicitRK7 extends ExplicitRKGeneral
{
	constructor()
	{
		super();
		this.a=[
			[1/6],
			[0,1/3],
			[1/8,0,3/8],
			[148/1331,0,150/1331,-56/1331],
			[-404/243,0,-170/27,4024/1701,10648/1701],
			[2466/2401,0,1242/343,-19176/16807,-51909/16807,1053/2401],
			[5/154,0,0,96/539,-1815/20384,-405/2464,49/1144],
			[-113/32,0,-195/22,32/7,29403/3584,-729/512,1029/1408,21/16]];
		this.b=[0,0,0,32/105,1771561/6289920,243/2560,16807/74880,77/1440,11/270];
		this.c=[0,1/6,1/3,1/2,2/11,2/3,6/7,0,1];
		this.stages=9;
	}
}
ExplicitRK7.attributes={name:{ru:'Метод Рунге-Кутты 7 порядка',eng:"Runge-kutta 7th order method "}};

export default ExplicitRK7;