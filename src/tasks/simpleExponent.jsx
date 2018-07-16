import React from "react";


var ExponentEquation={
    taskInfo:
    {
        name:{ru:"Дифференциальное уравнение Далквиста",eng:"Differential Dahlquist's test equation"},
        description:{ru:(<div><div>Дифференциальное уравнение Далквиста имеет вид:</div>
        <div style={{margin:'0px 40px 20px'}}><img src='./img/exponentfirst16px.png'/></div>
        <div>где {'\u03bb'} - параметр.</div>
        <div>Решение данного уравнения в общем виде:</div>
        <div style={{margin:'0px 40px 20px'}}><img src='./img/exponentsecond16px.png'/></div>
        <div>Решение уравнения для начального условия x<sub>0</sub>, t<sub>0</sub>:</div>
        <div style={{margin:'0px 40px 20px'}}><img src='./img/exponentthird16px.png'/></div>
        <div>Данное уравнение используют для исследования устойчивости численных методов решения дифференциальных уравнений.</div></div>),
        eng:(
            <div><div>Differential Dahlquist's test equation has a form:</div>
        <div style={{margin:'0px 40px 20px'}}><img src='./img/exponentfirst16px.png'/></div>
        <div>where {'\u03bb'} - constant parameter.</div>
        <div>The solution of this equation:</div>
        <div style={{margin:'0px 40px 20px'}}><img src='./img/exponentsecond16px.png'/></div>
        <div>The solution for starting condition x<sub>0</sub>, t<sub>0</sub>:</div>
        <div style={{margin:'0px 40px 20px'}}><img src='./img/exponentthird16px.png'/></div>
        <div>This equation is used is stiff stability analysis of numerical methods for initial condition problems.</div></div>
            )},
        mathdescription:{
            ru:(
        <div>
            <div>Дифференциальное уравнение Далквиста имеет вид:</div>
            <div style={{margin:'0px 40px 20px'}}>
                    {`
                \\begin{align}
                {dx \\over dt} &= \\lambda x\\\\
                \\end{align}
                    `}
            </div>
            <div>где $\lambda$ - параметр.</div>
            <div>Решение данного уравнения в общем виде:</div>
            <div style={{margin:'0px 40px 20px'}}>
                    {`
                \\begin{align}
                x &= Ce^{\\lambda t}\\\\
                \\end{align}
                    `}
            </div>
            <div>Решение уравнения для начального условия $x_0, t_0$:</div>
            <div style={{margin:'0px 40px 20px'}}>
                    {`
                \\begin{align}
                x &= x_0e^{\\lambda (t-t0)}\\\\
                \\end{align}
                    `}
            </div>
            <div>Данное уравнение используют для исследования устойчивости численных методов решения дифференциальных уравнений.</div>
        </div>
            )
        ,eng:(
        <div>
            <div>Differential Dahlquist's test equation has a form:</div>
            <div style={{margin:'0px 40px 20px'}}>
                    {`
                \\begin{align}
                {dx \\over dt} &= \\lambda x\\\\
                \\end{align}
                    `}
            </div>
            <div>where $\lambda$ - constant parameter.</div>
            <div>The solution of this equation:</div>
            <div style={{margin:'0px 40px 20px'}}>
                    {`
                \\begin{align}
                x &= Ce^{\\lambda t}\\\\
                \\end{align}
                    `}
            </div>
            <div>The solution for starting condition $x_0, t_0$:</div>
            <div style={{margin:'0px 40px 20px'}}>
                    {`
                \\begin{align}
                x &= x_0e^{\\lambda (t-t0)}\\\\
                \\end{align}
                    `}
            </div>
            <div>This equation is used is stiff stability analysis of numerical methods for initial condition problems.</div>
        </div>

            )}
    },
    taskID:'ExponentEquation',
    parameters:
    [
    {
        name:"lambda",
        description:{ru:"Параметр \u03bb",eng:"Parameter \u03bb"},
        default:-2,
        step:'any',
        min:-100,
        max:100
    }
    ],
    variables:
    [
    {
        name:"x",
        description:{ru:"Значение x",eng:"Value of x"},
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
            index:1,
            description:{ru:"Время",eng:"Time"}
        },
        y:{
            index:0,
            description:{ru:"x",eng:"x"}
        },
        description:{ru:"График изменения x",eng:"Plot of x"}
    }
    ],
    getFunctions:function getFunctions(parameters)
    {
        var functions=new Array(1);
        functions[0]=function(x,t)
        {
            return parameters[0]*x[0];
        };
        return functions;
    },
    getAnalytic:function getAnalytic(parameters,variables,t0)
    {
        var functions=new Array(1);
        functions[0]=function(t)
        {
            return variables[0]*Math.exp(parameters[0]*(t-t0));
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
            }
        ];
        return jacobian;
    }
}
export default ExponentEquation;