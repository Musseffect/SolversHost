import React from "react";


var chemistry={
    taskInfo:
    {
        name:{ru:"Превращения восьми реагентов",eng:"The chemical reaction with 8 reactants"},
        description:{ru:
            (<div><div>Данная система ОДУ описывает превращения восьми реагентов.</div>
        <div>Она имеет следующий вид:</div>
        <div style={{margin:'0px 40px 20px'}}><img src='./img/chemistryFormulas16px.png'/></div>
        <div>где x<sub>i</sub> - концентрация i-го реагента.</div></div>)
            ,
        eng:
        (<div><div>This ODE system describes chemical reaction involving eight reactants.</div>
        <div>The system is:</div>
        <div style={{margin:'0px 40px 20px'}}><img src='./img/chemistryFormulas16px.png'/></div>
        <div>where x<sub>i</sub> - concentration of i-th reactant.</div></div>)
        },
        mathdescription:{ru:(
        <div>
            <div>Данная система ОДУ описывает превращения восьми реагентов.</div>
            <div>Она имеет следующий вид:</div>
            <div>
                {`\\begin{align}
                {dx_1 \\over dt } &= -1.71 x_1 + 0.43 x_2 + 8.32x_3 + 0.0007\\\\
                {dx_2 \\over dt } &= -1.71 x_1 - 8.75x_2\\\\
                {dx_3 \\over dt } &= -10.03 x_3 +0.43 x_4 + 0.035x_5\\\\
                {dx_4 \\over dt } &= -8.32 x_2 +1.71 x_3 -1.12 x_4 \\\\
                {dx_5 \\over dt } &= -1.745 x_5 +0.43 x_6 + 0.32 x_7\\\\
                {dx_6 \\over dt } &=  -280 x_6 x_8 +0.69 x_4 +1.71 x_6 - 0.43x_6 +0.69 x_7\\\\
                {dx_7 \\over dt } &=  280 x_6 x_8 -1.81 x_7\\\\
                {dx_8 \\over dt } &= -280 x_6 x_8 +1.81 x_7 \\\\
                \\end{align}
                `}
            </div>
            <div>
                где $x_i$ - концентрация $i$-го реагента.
            </div>
        </div>),
        eng:(
        <div>
            <div>This ODE system describes chemical reaction involving eight reactants.</div>
            <div>The system is:</div>
            <div>
                {`\\begin{align}
                {dx_1 \\over dt } &= -1.71 x_1 + 0.43 x_2 + 8.32x_3 + 0.0007\\\\
                {dx_2 \\over dt } &= -1.71 x_1 - 8.75x_2\\\\
                {dx_3 \\over dt } &= -10.03 x_3 +0.43 x_4 + 0.035x_5\\\\
                {dx_4 \\over dt } &= -8.32 x_2 +1.71 x_3 -1.12 x_4 \\\\
                {dx_5 \\over dt } &= -1.745 x_5 +0.43 x_6 + 0.32 x_7\\\\
                {dx_6 \\over dt } &=  -280 x_6 x_8 +0.69 x_4 +1.71 x_6 - 0.43x_6 +0.69 x_7\\\\
                {dx_7 \\over dt } &=  280 x_6 x_8 -1.81 x_7\\\\
                {dx_8 \\over dt } &= -280 x_6 x_8 +1.81 x_7 \\\\
                \\end{align}
                `}
            </div>
            <div>
                where $x_i$ - concentration of $i$-th reactant.
            </div>
        </div>)}
    },
    taskID:'chemistry',
    parameters:[
    ],
    variables:[
    {
        name:"x1",
        description:{ru:"Реагент №1",eng:"Reactant №1"},
        default:1,
        step:0.0001,
        min:0,
        max:100
    },
    {
        name:"x2",
        description:{ru:"Реагент №2",eng:"Reactant №2"},
        default:0,
        step:0.0001,
        min:0,
        max:100
    },
    {
        name:"x3",
        description:{ru:"Реагент №3",eng:"Reactant №3"},
        default:0,
        step:0.0001,
        min:0,
        max:100
    },
    {
        name:"x4",
        description:{ru:"Реагент №4",eng:"Reactant №4"},
        default:0,
        step:0.0001,
        min:0,
        max:100
    },
    {
        name:"x5",
        description:{ru:"Реагент №5",eng:"Reactant №5"},
        default:0,
        step:0.0001,
        min:0,
        max:100
    },
    {
        name:"x6",
        description:{ru:"Реагент №6",eng:"Reactant №6"},
        default:0,
        step:0.0001,
        min:0,
        max:100
    },
    {
        name:"x7",
        description:{ru:"Реагент №7",eng:"Reactant №7"},
        default:0.0057,
        step:0.0001,
        min:0,
        max:100
    },
    {
        name:"x8",
        description:{ru:"Реагент №8",eng:"Reactant №8"},
        default:1,
        step:0.0001,
        min:0,
        max:100
    }],
    argument:
    {
        name:"t",
        description:{ru:"Начальное время",eng:"Start time"},
        plotDescription:{ru:'Время',eng:"Time"},
        default:0,
        step:1,
        min:0,
        max:100
    },
    argumentInterval:
    {
        name:"dt",
        description:{ru:"Продолжительность",eng:"Time length"},
        default:10,
        step:1,
        min:0,
        max:100
    }
    ,
    plotInfo:[
    {
        x:{
            index:8,
            description:{ru:"Время",eng:"Time"}
        },
        y:{
            index:0,
            description:{ru:"Значение X1",eng:"Value of X1"}
        },
        description:{ru:"График изменения x1",eng:"Plot of x1"}
    },
    {
        x:{
            index:8,
            description:{ru:"Время",eng:"Time"}
        },
        y:{
            index:1,
            description:{ru:"Значение X2",eng:"Value of X2"}
        },
        description:{ru:"График изменения x2",eng:"Plot of x2"}
    },
    {
        x:{
            index:8,
            description:{ru:"Время",eng:"Time"}
        },
        y:{
            index:2,
            description:{ru:"Значение X3",eng:"Value of X3"}
        },
        description:{ru:"График изменения x3",eng:"Plot of x3"}
    },
    {
        x:{
            index:8,
            description:{ru:"Время",eng:"Time"}
        },
        y:{
            index:3,
            description:{ru:"Значение X4",eng:"Value of X4"}
        },
        description:{ru:"График изменения x4",eng:"Plot of x4"}
    },
    {
        x:{
            index:8,
            description:{ru:"Время",eng:"Time"}
        },
        y:{
            index:4,
            description:{ru:"Значение X5",eng:"Value of X5"}
        },
        description:{ru:"График изменения x5",eng:"Plot of x5"}
    },
    {
        x:{
            index:8,
            description:{ru:"Время",eng:"Time"}
        },
        y:{
            index:5,
            description:{ru:"Значение X6",eng:"Value of X6"}
        },
        description:{ru:"График изменения x6",eng:"Plot of x6"}
    },
    {
        x:{
            index:8,
            description:{ru:"Время",eng:"Time"}
        },
        y:{
            index:6,
            description:{ru:"Значение X7",eng:"Value of X7"}
        },
        description:{ru:"График изменения x7",eng:"Plot of x7"}
    },
    {
        x:{
            index:8,
            description:{ru:"Время",eng:"Time"}
        },
        y:{
            index:7,
            description:{ru:"Значение X8",eng:"Value of X8"}
        },
        description:{ru:"График изменения x8",eng:"Plot of x8"}
    }
    ],
    methodsAttributes:
    {
        stepValue:10,
        stepMin:10e-1,
        stepMax:500,
        jacobianAnalythicEnabled:false
    },
    getFunctions:function getFunctions(parameters)
    {
        var functions=new Array(8);
        functions[0]=function(x,t)
        {
            return -1.71*x[0]+0.43*x[1]+8.32*x[2]+0.0007;
        };
        functions[1]=function(x,t)
        {
            return 1.71*x[0]-8.75*x[1];
        };
        functions[2]=function(x,t)
        {
            return -10.03*x[2]+0.43*x[3]+0.035*x[4];
        };
        functions[3]=function(x,t)
        {
            return 8.32*x[1]+1.71*x[2]-1.12*x[3];
        };
        functions[4]=function(x,t)
        {
            return -1.745*x[4]+0.43*x[5]+0.43*x[6];
        };
        functions[5]=function(x,t)
        {
            return -280*x[5]*x[7]+0.69*x[3]+1.71*x[4]-0.43*x[5]+0.69*x[6];
        };
        functions[6]=function(x,t)
        {
            return 280*x[5]*x[7]-1.81*x[6];
        };
        functions[7]=function(x,t)
        {
            return -280*x[5]*x[7]+1.81*x[6];
        };
        return functions;
    }
}
export default chemistry;