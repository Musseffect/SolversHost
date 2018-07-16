import React from "react";


var LinearSystem2x2={
    taskInfo:
    {
        name:{ru:"Линейная система ОДУ размерности 2",eng:"Linear ODE system with two components"},
        description:{ru:(<div><p>Линейная система обыкновенных дифференциальных уравнений размерности 2 имеет вид:</p>
        <div>Где f(t) - произвольная функция от времени.</div>
        <p>В данном случае рассматривается система:</p>
        <div><img src="./img/linearSystemGeneral16px.png"/></div></div>),
        eng:(
            <div><p>Linear ODE system has a form:</p>
        <div>Где f(t) - some function of time.</div>
        <p>In this particular case the following system is presented:</p>
        <div><img src="./img/linearSystemGeneral16px.png"/></div></div>
            )},
        mathdescription:{
            ru:(
        <div>
            <div>Линейная система обыкновенных дифференциальных уравнений размерности 2 имеет вид:</div>
            <div>
                {`
                \\begin{align}
                {dx_1 \\over dt} &= a_{11}x_1+a_{12}x_2+f(t)\\\\
                {dx_2 \\over dt} &= a_{21}x_1+a_{22}x_2+f(t)\\\\
                \\end{align}
                `}
            </div>
            <div>где $f(t)$ - произвольная функция от времени.</div>
            <div>В данном случае рассматривается система:</div>
            <div>
                {`
                \\begin{align}
                {dx_1 \\over dt} &= a_{11}x_1+a_{12}x_2+b_1t\\\\
                {dx_2 \\over dt} &= a_{21}x_1+a_{22}x_2+b_2t\\\\
                \\end{align}
                `}
            </div>
        </div>)
            ,
            eng:(
        <div>
            <div>Linear ODE system has a form:</div>
            <div>
                {`
                \\begin{align}
                {dx_1 \\over dt} &= a_{11}x_1+a_{12}x_2+f(t)\\\\
                {dx_2 \\over dt} &= a_{21}x_1+a_{22}x_2+f(t)\\\\
                \\end{align}
                `}
            </div>
            <div>where $f(t)$ - some function of time.</div>
            <div>In this particular case the following system is presented:</div>
            <div>
                {`
                \\begin{align}
                {dx_1 \\over dt} &= a_{11}x_1+a_{12}x_2+b_1t\\\\
                {dx_2 \\over dt} &= a_{21}x_1+a_{22}x_2+b_2t\\\\
                \\end{align}
                `}
            </div>
        </div>)
        }
    },
    taskID:'LinearSystem2x2',
    parameters:
    [
    {
        name:"a11",
        description:{ru:"Параметр a11",eng:"Parameter a11"},
        default:-2,
        step:'any',
        min:-100,
        max:100
    },
    {
        name:"a12",
        description:{ru:"Параметр a12",eng:"Parameter a12"},
        default:-2,
        step:'any',
        min:-100,
        max:100
    },
    {
        name:"b1",
        description:{ru:"Параметр b1",eng:"Parameter b1"},
        default:-2,
        step:'any',
        min:-100,
        max:100
    },
    {
        name:"a21",
        description:{ru:"Параметр a21",eng:"Parameter a21"},
        default:-2,
        step:'any',
        min:-100,
        max:100
    },
    {
        name:"a22",
        description:{ru:"Параметр a22",eng:"Parameter a22"},
        default:-2,
        step:'any',
        min:-100,
        max:100
    },
    {
        name:"b2",
        description:{ru:"Параметр b1",eng:"Parameter b1"},
        default:-2,
        step:'any',
        min:-100,
        max:100
    }
    ],
    variables:
    [
    {
        name:"x1",
        description:{ru:"Значение x1",eng:"Value of x1"},
        default:1,
        step:'any',
        min:-100,
        max:100
    },
    {
        name:"x2",
        description:{ru:"Значение x1",eng:"Value of x2"},
        default:1,
        step:'any',
        min:-100,
        max:100
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
    plotInfo:
    [
    {
        x:{
            index:2,
            description:{ru:"Время",eng:"Time"}
        },
        y:{
            index:0,
            description:{ru:"x1",eng:"x1"}
        },
        description:{ru:"График изменения x1",eng:"Plot of x1"}
    },
    {
        x:{
            index:2,
            description:{ru:"Время",eng:"Time"}
        },
        y:{
            index:1,
            description:{ru:"x2",eng:"x2"}
        },
        description:{ru:"График изменения x2",eng:"Plot of x2"}
    },
    {
        x:{
            index:0,
            description:{ru:"x1",eng:"x1"}
        },
        y:{
            index:1,
            description:{ru:"x2",eng:"x2"}
        },
        description:{ru:"График x1 x2",eng:"Plot of x1 and x2"}
    }
    ],
    getFunctions:function getFunctions(parameters)
    {
        var functions=new Array(2);
        functions[0]=function(x,t)
        {
            return parameters[0]*x[0]+parameters[1]*x[1]+parameters[2]*t;
        };
        functions[1]=function(x,t)
        {
            return parameters[3]*x[0]+parameters[4]*x[1]+parameters[5]*t;
        };
        return functions;
    },
    methodsAttributes:
    {
        stepValue:10,
        stepMin:10e-1,
        stepMax:500,
        jacobianAnalythicEnabled:true
    },
    getJacobian:function getJacobian(parameters)
    {
        var jacobian=
        [
            function(xv,t)
            {
                return parameters[0];
            },
            function(xv,t)
            {
                return parameters[1];
            },function(xv,t)
            {
                return parameters[3];
            },
            function(xv,t)
            {
                return parameters[4];
            }
        ];
        return jacobian;
    }
}
export default LinearSystem2x2;