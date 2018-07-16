import React from "react";

var pendulumKapitza={
    taskInfo:
    {
        name:{ru:"Маятник Капицы",eng:"Kapitza's pendulum"},
        description:{ru:(<div><div>Маятник Капицы описывается дифференциальным уравнением второго порядка для угла подвеса {'\u03C6'}:</div>
        <div><img src="./img/kapiza16px.png"/></div>
        <div>Уравнение можно преобразовать к виду </div>
        <div><img src="./img/kapizasecond16px.png"/></div></div>),
        eng:(
            <div><div>Kapitza's pendulum is described by second order differential equation for angle {'\u03C6'} between pendulum and downward direction:</div>
        <div><img src="./img/kapiza16px.png"/></div>
        <div>This equation can be transformed into a first order ODE system the following way:</div>
        <div><img src="./img/kapizasecond16px.png"/></div></div>
            )},
        mathdescription:{
            ru:(
            <div>
                <div>Маятник Капицы описывается дифференциальным уравнением второго порядка для угла подвеса $\phi$:</div>
                <div>
                    {`
                    \\begin{align}
                    {d^2\\phi \\over dt^2} &= -(g+a\\nu^2cos(\\nu t)){sin(\\phi) \\over l}\\\\
                    \\end{align}
                    `}
                </div>
                <div>Уравнение можно преобразовать следующим образом:</div>
                <div>
                    {`
                    \\begin{align}
                    x_1&=\\phi \\\\
                    {dx_1 \\over dt} &= x_2 = {d\\phi \\over dt}\\\\
                    {dx_2 \\over dt} &= -(g+a\\nu^2cos(\\nu t)){sin(x_1) \\over l}\\\\
                    \\end{align}
                    `}
                </div>
            </div>
            ),
            eng:(
            <div>
                <div>Kapitza's pendulum is described by second order differential equation for angle $\phi$ between pendulum and downward direction:</div>
                <div>
                    {`
                    \\begin{align}
                    {d^2\\phi \\over dt^2} &= -(g+a\\nu^2cos(\\nu t)){sin(\\phi) \\over l}\\\\
                    \\end{align}
                    `}
                </div>
                <div>This equation can be transformed into a first order ODE system the following way:</div>
                <div>
                    {`
                    \\begin{align}
                    x_1&=\\phi \\\\
                    {dx_1 \\over dt} &= x_2 = {d\\phi \\over dt}\\\\
                    {dx_2 \\over dt} &= -(g+a\\nu^2cos(\\nu t)){sin(x_1) \\over l}\\\\
                    \\end{align}
                    `}
                </div>
            </div>
            )}
    },
    taskID:'pendulumKapitza',
    parameters:
    [
    {
        name:"a",
        description:{ru:"Амплитуда колебаний осциллятора",eng:"Oscillation amplitude"},
        default:0.2,
        step:0.1,
        min:0,
        max:1000
    }
    ,
    {
        name:"v",
        description:{ru:"Частота колебаний осциллятора",eng:"Oscillation frequency"},
        default:200,
        step:0.1,
        min:0,
        max:1000
    },
    {
        name:"g",
        description:{ru:"Ускорение свободного падения",eng:"Free-fall acceleration"},
        default:9.8,
        step:0.1,
        min:0,
        max:1000
    },
    {
        name:"l",
        description:{ru:"Длина подвеса маятника",eng:"Length of pendulum"},
        default:1,
        step:0.1,
        min:0,
        max:1000
    }
    ],
    variables:
    [
    {
        name:"phi",
        description:{ru:"Угол маятника в градусах",eng:"Pendulum angle (degrees)"},
        default:170,
        step:0.1,
        min:0,
        max:360
    },
    {
        name:"phi'",
        description:{ru:"Производная угла маятника",eng:"Derivative of angle"},
        default:0,
        step:0.1,
        min:-200,
        max:200
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
            description:{ru:'Время',eng:"Time"}
        },
        y:{
            index:0,
            description:{ru:"Угол",eng:"Angle"}
        },
        description:{ru:"График изменения угла",eng:"Angle plot"}
    },
    {
        x:{
            index:0,
            description:{ru:"Угол",eng:"Angle"}
        },
        y:{
            index:1,
            description:{ru:"Производная угла",eng:"Angle derivative"}
        },
        description:{ru:"Фазовый портрет",eng:"Phase portrait"}
    }
    ],
    preprocessVariables:function(variables)
    {
        variables[0]=(variables[0]%360)+(variables[0]>=0.0?0:360);
        return variables;
    },
    getFunctions:function getFunctions(parameters)
    {
        var functions=new Array(3);
        var a=parameters[0],v=parameters[1],g=parameters[2],l=parameters[3];
        functions[0]=function(x,t)
        {
            return x[1];
        };
        functions[1]=function(x,t)
        {
            let scale=Math.PI/180.0;
            return -(g+a*v*v*Math.cos(v*t)*Math.sin(x[0]*scale))/(l*scale);
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
        var a=parameters[0],v=parameters[1],g=parameters[2],l=parameters[3];
        var jacobian=
        [
            function(xv,t)
            {
                return 0;
            },
            function(xv,t)
            {   
                return 1;
            },
            function(xv,t)
            {
            let scale=Math.PI/180.0;
            return -(g+a*v*v*Math.cos(v*t)*Math.cos(xv[0]*scale))/l;
            },
            function(xv,t)
            {
                return 0;
            }
        ];
        return jacobian;
    }
}
export default pendulumKapitza;