import React from "react";

var lorentz={
    taskInfo:
    {
        name:{ru:"Система Лоренца",eng:"Lorentz system"},
        description:{ru:(<div><div>Система Лоренца представляет собой систему ОДУ следующего вида:</div>
        <div style={{margin:'0px 40px 20px'}}><img src='./img/lorentz16px.png'/></div>
        <div>где x, y, z - координаты, {'\u03c3'}, r, b - параметры.</div></div>),
        eng:(
            <div><div>The Lorentz system is a following ODE system:</div>
        <div style={{margin:'0px 40px 20px'}}><img src='./img/lorentz16px.png'/></div>
        <div>where x, y, z - coordinates, {'\u03c3'}, r, b - constants.</div></div>
            )},
        mathdescription:{
            ru:(
            <div>
                <div>Система Лоренца представляет собой систему ОДУ следующего вида:</div>
                <div style={{margin:'0px 40px 20px'}}>
                {`
                    \\begin{align}
                    {dx \\over dt} &= \\sigma(y-x)\\\\
                    {dy \\over dt} &= x(r-z)-y\\\\
                    {dz \\over dt} &= xy-bz\\\\
                    \\end{align}
                `}
                </div>
                <div>где $x$, $y$, $z$ - координаты, $\sigma$, $r$, $b$ - параметры.</div>
            </div>
            ),
        eng:(
            <div>
                <div>The Lorentz system is a following ODE system:</div>
                <div style={{margin:'0px 40px 20px'}}>
                {`
                    \\begin{align}
                    {dx \\over dt} &= \\sigma(y-x)\\\\
                    {dy \\over dt} &= x(r-z)-y\\\\
                    {dz \\over dt} &= xy-bz\\\\
                    \\end{align}
                `}
                </div>
                <div>where $x$, $y$, $z$ - coordinates, $\sigma$, $r$, $b$ - constants.</div>
            </div>
            )
        }
    },
    taskID:'lorentz',
    parameters:
    [
    {
        name:"sigma",
        description:{ru:"Параметр \u03c3",eng:"Parameter \u03c3"},
        default:20,
        step:0.1,
        min:0,
        max:1000
    }
    ,
    {
        name:"r",
        description:{ru:"Параметр r",eng:"Parameter r"},
        default:20,
        step:0.1,
        min:0,
        max:1000
    },
    {
        name:"b",
        description:{ru:"Параметр b",eng:"Parameter b"},
        default:20,
        step:0.1,
        min:0,
        max:1000
    }
    ],
    variables:
    [
    {
        name:"x",
        description:{ru:"Координата x",eng:"Coordinate x"},
        default:1,
        step:0.1,
        min:-100,
        max:100
    },
    {
        name:"y",
        description:{ru:"Координата y",eng:"Coordinate y"},
        default:0,
        step:0.1,
        min:-100,
        max:100
    },
    {
        name:"z",
        description:{ru:"Координата z",eng:"Coordinate z"},
        default:0,
        step:0.1,
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
            index:0,
            description:{ru:"X",eng:"X"}
        },
        y:{
            index:1,
            description:{ru:"Y",eng:"Y"}
        },
        z:{
            index:2,
            description:{ru:"Z",eng:"Z"}
        },
        description:{ru:"График изменения координат",eng:"Plot of coordinates"}
    },
    {
        x:{
            index:3,
            description:{ru:"Время",eng:"Time"}
        },
        y:{
            index:0,
            description:{ru:"X",eng:"X"}
        },
        description:{ru:"График координаты X",eng:"Plot of Z(t)"}
    },
    {
        x:{
            index:3,
            description:{ru:"Время",eng:"Time"}
        },
        y:{
            index:1,
            description:{ru:"Y",eng:"Y"}
        },
        description:{ru:"График координаты Y",eng:"Plot of Y(t)"}
    },
    {
        x:{
            index:3,
            description:{ru:"Время",eng:"Time"}
        },
        y:{
            index:2,
            description:{ru:"Z",eng:"Z"}
        },
        description:{ru:"График координаты Z",eng:"Plot of Z(t)"}
    }
    ],
    getFunctions:function getFunctions(parameters)
    {
        var functions=new Array(3);
        var s=parameters[0],r=parameters[1],b=parameters[2];
        functions[0]=function(x,t)
        {
            return s*(x[1]-x[0]);
        };
        functions[1]=function(x,t)
        {
            return x[0]*(r-x[2])-x[1];
        };
        functions[2]=function(x,t)
        {
            return x[0]*x[1]-b*x[2];
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
        var s=parameters[0],r=parameters[1],b=parameters[2];
        var jacobian=
        [
            function(xv,t)
            {
                return -s;
            },
            function(xv,t)
            {   
                return r-xv[2];
            },
            function(xv,t)
            {
                return xv[1];
            },
            function(xv,t)
            {
                return s;
            },
            function(xv,t)
            {   
                return -1;
            },
            function(xv,t)
            {
                return xv[0];
            },
            function(xv,t)
            {
                return 0;
            },
            function(xv,t)
            {   
                return -xv[0];
            },
            function(xv,t)
            {
                return -b;
            }
        ];
        return jacobian;
    }
}

export default lorentz;