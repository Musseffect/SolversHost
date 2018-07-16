import React from "react";
import {colors} from "../reducers/methodPickerReducer.js";
import {methods} from "../methods.js";
import t from "../localization.js";

export let statData=[{name:{ru:"Средний шаг",eng:"Average step"},attribute:"averageStep"},
					{name:{ru:"Вычисления правых частей",eng:"Right sides evaluation count"},attribute:"calculations"},
					{name:{ru:"Вычисления элементов матрицы Якоби",eng:"Evaluation count of Jacobian elements"},attribute:"jacobianCalculations"},
					{name:{ru:"Решений СЛАУ",eng:"Linear systems solved"},attribute:"matrixSolving"},
					{name:{ru:"Средняя локальная ошибка",eng:"Average local error"},attribute:"localError"},
					{name:{ru:"Средняя глобальная ошибка",eng:"Average global error"},attribute:"globalError"},
					{name:{ru:"Максимальная локальная ошибка",eng:"Max local error"},attribute:"maxLocalError"},
					{name:{ru:"Максимальная глобальная ошибка",eng:"Max global error"},attribute:"maxGlobalError"},
					{name:{ru:"Конечная глобальная ошибка",eng:"Final global error"},attribute:"finalGlobalError"}
					];


export class StatisticsDesktop extends React.Component
{
	constructor(props)
	{
		super(props);
		this.props=props;
	}
	componentWillMount()
	{
	}
	render()
	{
		const {lang,data} = this.props;
		let rows=[];
		if(data!==undefined)
		{
			self=this;
			let stat=data.statistics;

			rows.push(<div key={"statRow"} className="statRow">
				<div key="0_0stat" className="statCell"></div>
				{
					stat.map(function(el,index)
					{
						let method=methods[data.methods_t[index].name];
						let order=data.methods_t[index].order;
						return (<div key={index+"_"+index+ "statFirstRow"} className="statCell" style={{color:colors[data.methods_t[index].color]}}>{(index+1)+". "+t(method.attributes.name,lang)+(order!=undefined?(". "+t(order,lang)):"")}</div>);
					})
				}
				</div>);

			statData.forEach(function(el,index)
			{
				let columns=[];
				columns.push(<div key={index+"stat"} className="statCell">{t(el.name,lang)}</div>);
				stat.forEach(function(elem,i)
				{
					let val=elem[el.attribute];
					val=(val==undefined?"-":val);
					columns.push(<div key={index+"_"+i+"stat"} className="statCell">{val}</div>);
				});
				rows.push(<div key={index+"_statRow"} className="statRow">{columns}</div>);
			});
		}
		return (
			<div className="statTable">
				{rows}
			</div>
			);

	}
}
