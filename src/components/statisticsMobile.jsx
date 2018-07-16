import React from "react";
import {statData} from "./statisticsDesktop.jsx";
import {colors} from "../reducers/methodPickerReducer.js";
import {methods} from "../methods.js";
import t from "../localization.js";

class StatisticsMobile extends React.Component
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
		let tables=[];
		if(data!==undefined)
		{
			self=this;
			let stat=data.statistics;
			stat.forEach(function(el,index)
			{
				let rows=[];
				let method=methods[data.methods_t[index].name];
				let order=data.methods_t[index].order;
				rows.push(<div key={index+"_"+ "stat"} className="statMobileMethod" style={{color:colors[data.methods_t[index].color]}}>{(index+1)+". "+t(method.attributes.name,lang)+(order!=undefined?(". "+t(order,lang)):"")}</div>)

				statData.forEach(function(elem,i)
				{
					let val=el[elem.attribute];
					if(val!==undefined)
					{
						rows.push(<div key={index+"_"+i+"statLabel"} className="statCellMobileLabel">{t(elem.name,lang)}</div>);
						rows.push(<div key={index+"_"+i+"stat"} className="statCellMobile">{val}</div>);
					}
				});

				tables.push(<div key={index+"_statTable"} className="statTableMobile">
					{rows}
					</div>);
				});
		}
		return (
			<div>
				{tables}
			</div>
			);

	}
}



export default StatisticsMobile;