import React from "react";


var VanDerPol={
    taskInfo:
    {
        name:{ru:"Осциллятор Ван-дер-Поля",eng:"Van der Pol oscillator"},
        description:{ru:(<div><div>Осцилятор Ван-дер-Поля описывается дифференциальным уравнением второго порядка:</div>
        <div style={{margin:'0px 40px 20px'}}><img src='./img/vanderpolfull16px.png'/></div>
        <div>где {'\u03bc'} - параметр</div>
        <div>Приведённое уравнение приводится к системе второго порядка следующим образом:</div>
        <div style={{margin:"0px 40px 20px"}}><img src='./img/vanderpolalt16px.png'/></div></div>),
        eng:(<div><div>Van der Pol oscillator evolution is decribed by second order differential equation:</div>
        <div style={{margin:'0px 40px 20px'}}><img src='./img/vanderpolfull16px.png'/></div>
        <div>where {'\u03bc'} - parameter.</div>
        <div>This equation can be rewritten in the form of first order ODE system with two components:</div>
        <div style={{margin:"0px 40px 20px"}}><img src='./img/vanderpolalt16px.png'/></div></div>
            )},
        mathdescription:{
            ru:(
        <div>
            <div>Осцилятор Ван-дер-Поля описывается дифференциальным уравнением второго порядка:</div>
            <div style={{margin:'0px 40px 20px'}}>
                    {`
                \\begin{align}
                {d^2x \\over dt^2} &= \\mu(1-x^2){dx \\over dt} -x \\\\
                \\end{align}
                `}
            </div>
            <div>где $\mu$ - параметр.</div>
            <div>Приведённое уравнение приводится к системе второго порядка следующим образом:</div>
            <div style={{margin:"0px 40px 20px"}}>
                    {`
                \\begin{align}
                x_1&=x\\\\
                {dx_1 \\over dt} &= x_2={dx \\over dt} \\\\
                {dx_2 \\over dt} &= \\mu(1-x_1^2)x_2 -x_1 \\\\
                \\end{align}
                `}
            </div>
        </div>
            ),
        eng:(
        <div>
            <div>Van der Pol oscillator evolution is decribed by second order differential equation:</div>
            <div style={{margin:'0px 40px 20px'}}>
                    {`
                \\begin{align}
                {d^2x \\over dt^2} &= \\mu(1-x^2){dx \\over dt} -x \\\\
                \\end{align}
                `}
            </div>
            <div>where $\mu$ - parameter.</div>
            <div>This equation can be rewritten in the form of first order ODE system with two components:</div>
            <div style={{margin:"0px 40px 20px"}}>
                    {`
                \\begin{align}
                x_1&=x\\\\
                {dx_1 \\over dt} &= x_2={dx \\over dt} \\\\
                {dx_2 \\over dt} &= \\mu(1-x_1^2)x_2 -x_1 \\\\
                \\end{align}
                `}
            </div>
        </div>
            )
        }
    },
    taskID:'VanDerPol',
    parameters:
    [
    {
        name:"u",
        description:{ru:"Параметр \u03bc",eng:"Parameter \u03bc"},
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
        description:{ru:"Позиция",eng:"Position"},
        default:1,
        step:0.1,
        min:-100,
        max:100
    },
    {
        name:"x'",
        description:{ru:"Скорость",eng:"Velocity"},
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
            index:2,
            description:{ru:'Время',eng:"Time"}
        },
        y:{
            index:0,
            description:{ru:"X",eng:"X"}
        },
        description:{ru:"График изменения x",eng:"Plot of x(t)"}
    },
    {
        x:{
            index:2,
            description:{ru:'Время',eng:"Time"}
        },
        y:{
            index:1,
            description:{ru:"X'",eng:"X'"}
        },
        description:{ru:"График изменения x'",eng:"Plot of x'(t)"}
    },
    {
        x:{
            index:0,
            description:{ru:"X",eng:"X"}
        },
        y:{
            index:1,
            description:{ru:"X'",eng:"X'"}
        },
        description:{ru:"Фазовый портрет",eng:"Phase portrait"}
    }
    ],
    getFunctions:function getFunctions(parameters)
    {
        var functions=new Array(2);
        functions[0]=function(x,t)
        {
            return x[1];
        };
        functions[1]=function(x,t)
        {
            var u=parameters[0];
            var x0=x[0];
            var v0=x[1];
            return u*(1-x0*x0)*v0-x0;
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
                return 0;
            },
            function(xv,t)
            {   
                return 1;
            },
            function(xv,t)
            {
                var u=parameters[0];
                return -1-2.0*u*xv[0]*xv[1];
            },
            function(xv,t)
            {
                var u=parameters[0];
                var x0=xv[0];
                return u*(1-x0*x0);
            }
        ];
        return jacobian;
    }
}
export default VanDerPol;