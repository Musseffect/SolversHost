import React from "react";

var lotkaVolterra={
    taskID:'lotkaVolterra',
    taskInfo:
    {
        name:{ru:"Модель Лотки — Вольтерры",eng:"Lotka-Volterra equations"},
        description:{ru:(<div><div>Модель взаимодействия хищник-жертва</div>
		<div style={{margin:'0px 40px 20px'}}><img src='./img/lotkavolterra16px.png'/></div>
		<div>где x - количество жертв, y - количество хищников, {'\u03b1, \u03b2, \u03b3, \u03b4'} - константы.</div></div>),
        eng:(<div><div>Модель взаимодействия хищник-жертва</div>
        <div>Lotka-Volterra equations are a pair of differential equations, describing the predator-prey population dynamic:</div>
        <div style={{margin:'0px 40px 20px'}}><img src='./img/lotkavolterra16px.png'/></div>
        <div>where x - number of prey, y - number of predator, {'\u03b1, \u03b2, \u03b3, \u03b4'} - constants.</div></div>
            )},
        mathdescription:{ru:(
        <div>
            <div>Модель взаимодействия хищник-жертва</div>
            <div style={{margin:'0px 40px 20px'}}>
                {`
                \\begin{align}
                {dx \\over dt} &= \\alpha x-\\beta xy\\\\
                {dy \\over dt} &=\\delta xy - \\gamma y\\\\
                \\end{align}
                `}
            </div>
            <div>где $x$ - количество жертв, $y$ - количество хищников, $\alpha$, $\beta$, $\gamma$, $\delta$ - константы.</div>
        </div>
            ),
        eng:(
        <div>
            <div>Lotka-Volterra equations are a pair of differential equations, describing the predator-prey population dynamic:</div>
            <div style={{margin:'0px 40px 20px'}}>
                {`
                \\begin{align}
                {dx \\over dt} &= \\alpha x-\\beta xy\\\\
                {dy \\over dt} &=\\delta xy - \\gamma y\\\\
                \\end{align}
                `}
            </div>
            <div>where $x$ - number of prey, $y$ - number of predator, $\alpha$, $\beta$, $\gamma$, $\delta$ - constants.</div>
        </div>
            )
        }
    },
    parameters:
    [
    {
        name:"a",
        description:{ru:"Параметр \u03b1",eng:"Parameter \u03b1"},
        default:1,
        step:'any',
        min:0,
        max:10
    },
    {
        name:"b",
        description:{ru:"Параметр \u03b2",eng:"Parameter \u03b2"},
        default:1,
        step:'any',
        min:0,
        max:10
    },
    {
        name:"g",
        description:{ru:"Параметр \u03b3",eng:"Parameter \u03b3"},
        default:1,
        step:'any',
        min:0,
        max:10
    },
    {
        name:"d",
        description:{ru:"Параметр \u03b4",eng:"Parameter \u03b4"},
        default:1,
        step:'any',
        min:0,
        max:10
    }
    ],
    variables:
    [
    {
        name:"x",
        description:{ru:"Начальное число жертв",eng:"Initial number of preys"},
        default:10,
        step:'any',
        min:0,
        max:1000
    },
    {
        name:"y",
        description:{ru:"Начальное число хищников",eng:"Initial number of predators"},
        default:10,
        step:'any',
        min:0,
        max:1000
    }],
    argument:
    {
        name:"t",
        description:{ru:"Начальное время",eng:"Start time"},
        plotDescription:{ru:'Время',eng:"Time"},
        default:0,
        step:'any',
        min:0,
        max:10000
    },
    argumentInterval:
    {
        name:"dt",
        description:{ru:"Продолжительность",eng:"Time length"},
        default:5,
        step:'any',
        min:0,
        max:10000
    },
    methodsAttributes:
    {
        stepValue:10,
        stepMin:10e-1,
        stepMax:500,
        jacobianAnalythicEnabled:true
    },
    plotInfo:
    [
    {
        x:{
            index:2,
            description:{ru:"Время",eng:"Time"}
        },
        y:{
            index:0,
            description:{ru:"X",eng:"X"}
        },
        description:"График изменения количества жертв"
    },
    {
        x:{
            index:2,
            description:{ru:"Время",eng:"Time"}
        },
        y:{
            index:1,
            description:{ru:"Y",eng:"Y"}
        },
        description:"График изменения количества хищников"
    },
    {
        x:{
            index:0,
            description:{ru:"X",eng:"X"}
        },
        y:{
            index:1,
            description:{ru:"Y",eng:"Y"}
        },
        description:{ru:"Фазовый портрет",eng:"Phase portrait"}
    }
    ],
    getFunctions:function getFunctions(parameters)
    {
        var functions=new Array(2);
        functions[0]=function(x,t)
        {
            return (parameters[0]-parameters[1]*x[1])*x[0];
        };
        functions[1]=function(x,t)
        {
            return (parameters[3]*x[0]-parameters[2])*x[1];
        };
        return functions;
    },
    getJacobian:function getJacobian(parameters)
    {
    	var jacobian=[
    	function(x,t)
        {
            return (parameters[0]-parameters[1]*x[1]);
        },
    	function(x,t)
        {
            return -parameters[1]*x[0];
        },
    	function(x,t)
        {
            return parameters[3]*x[1];
        },
        function(x,t)
        {
            return (parameters[3]*x[0]-parameters[2]);
        }
    	];
    }
}
export default lotkaVolterra;