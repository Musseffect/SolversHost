import React from "react";
import Plot from "../lib/plotlyCustom.js";//'react-plotly.js';
import { connect } from "react-redux";
import serialSolver from "../serialSolver.js";
import {colors} from "../reducers/methodPickerReducer.js";
import {methods} from "../methods.js";
import tasks from "../tasks.js";
import {updateResults} from "../actions/outputParametersActions.js";
import {smallMedium,mediumLarge} from "../windowSizes.js";
import MediaQuery from 'react-responsive';
import {StatisticsDesktop} from "./statisticsDesktop.jsx";
import StatisticsMobile from "./statisticsMobile.jsx";
import t from "../localization.js";


const mapStateToProps=function(state)
{
	let taskId=state.selectedTask;
	return {methods:state.currentSessions[taskId].data.methods,
		outputParameters:state.currentSessions[taskId].data.outputParameters,
		selectedTask:taskId,
		taskParameters:state.currentSessions[taskId].data.taskParameters,
		data:state.results.data,
		task:state.results.task,
		lang:state.lang};
};

const mapDispatchToProps=function(dispatch)
{
	return ({
		updateResults:function(results){dispatch(updateResults(results));}
	});
};
class Results extends React.Component
{
	constructor(props)
	{
		super(props);
		this._calculate=this._calculate.bind(this);
		this._setProgress=this._setProgress.bind(this);
		this.state={progress:0,frameId:-1};
		this.props=props;
	}
	componentWillMount()
	{
	}
	componentDidUpdate()
	{
	}
	_calculate()
	{
		let methods_t=this.props.methods;
		if(methods_t.length==0)
			return;
		let outputParameters=this.props.outputParameters;
		let taskParameters=this.props.taskParameters;
		let task=tasks[this.props.selectedTask];
		let data=serialSolver.solve(methods_t,taskParameters,outputParameters,this._setProgress,task);
		this.setState({progress:100,frameId:-1});
		this.props.updateResults({data:data,task:task});
	}
	_setProgress(progress)
	{
		this.setState({progress:progress});
	}
	render()
	{
		const {lang,data,task}=this.props;
		let statistics=[];
		let plots=[];
		let rows=[];
		if(data!==undefined)
		{
			self=this;
			let stat=data.statistics;
			if(data.localErrorPlots.length>0)
			{
				let localTraces=[];
				let globalTraces=[];
				data.localErrorPlots.forEach(function(el,index)
					{
						localTraces.push({x:data.timeArrays[data.errorIndicies[index]],
							y:el,
							line:{color:colors[data.methods_t[index].color]},
							marker:{color:colors[data.methods_t[index].color]},
							name:(data.errorIndicies[index]+1)+". "+t(methods[data.methods_t[data.errorIndicies[index]].name].attributes.name,lang),
 							mode: 'lines+markers'
						});
						globalTraces.push({x:data.timeArrays[data.errorIndicies[index]],
							y:data.globalErrorPlots[index],
							line:{color:colors[data.methods_t[index].color]},
							marker:{color:colors[data.methods_t[index].color]},
							name:(data.errorIndicies[index]+1)+". "+t(methods[data.methods_t[data.errorIndicies[index]].name].attributes.name,lang),
 							mode: 'lines+markers'
						});
					});
				plots.push(<div className="plotDiv" key="localErrorPlot"><Plot useResizeHandler={true} className="plotComponent" key="localErrorPlot" data={localTraces} 
					layout={
						{
							showlegend:true,
							title:t({ru:'Графики локальной ошибки',eng:"Local error plot"},lang),
							xaxis:{title:t(task.argument.plotDescription,lang)},
							yaxis:{title:t({ru:'Локальная ошибка',eng:"Local error"},lang)},
							legend:{   
									xanchor: "left",
								    yanchor:'bottom',
								    y:-0.5,
								    x:0
							   },
							autosize:true
						}
					}/></div>);
				plots.push(<div className="plotDiv" key="globalErrorPlot"><Plot useResizeHandler={true} className="plotComponent" key="globalErrorPlot" data={globalTraces} 
					layout={
						{
							showlegend:true,
							title:t({ru:'Графики глобальной ошибки',eng:"Global error plot"},lang),
							xaxis:{title:t(task.argument.plotDescription,lang)},
							yaxis:{title:t({ru:'Глобальная ошибка',eng:"Global error"},lang)},
							legend:{   
									xanchor: "left",
								    yanchor:'bottom',
								    y:-0.5,
								    x:0
							   },
							autosize:true
						}
					}/></div>);
			}
			if(data.eigenvaluePlots.length>0)
			{
				let traces=[];
				data.eigenvaluePlots.forEach(function(el,index)
					{
						traces.push({x:data.timeArrays[index],
							y:el,
							line:{color:colors[data.methods_t[index].color]},
							marker:{color:colors[data.methods_t[index].color]},
							name:(index+1)+". "+t(methods[data.methods_t[index].name].attributes.name,lang),
 							mode: 'lines+markers'
						});
					});
				plots.push(<div className="plotDiv" key="diveigenvaluePlot"><Plot useResizeHandler={true} className="plotComponent" key="eigenvaluePlot"
						data={traces}
						layout={
							{
								showlegend:true,
								title:t({ru:'Графики максимальных по модулю собственных чисел',eng:"Max absolute real parts of eigenvalues"},lang),
								xaxis:{title:t(task.argument.name,lang)},
								yaxis:{title:'\u033b'},
							legend:{   
									xanchor: "left",
								    yanchor:'bottom',
								    y:-0.5,
								    x:0
							   },
							autosize:true
							}
						}
					/></div>);
			}
			if(data.plots.length>0)
			{
				data.plots.forEach(function(el,index)
				{
					let traces=[];
					el.plotData.forEach(function(elem,ind)
					{
						let data2={};
						data2.x=elem.x;
						data2.y=elem.y;
						if(elem.z!==undefined)
						{	
							data2.z=elem.z;
							data2.type='scatter3d';
						}
						data2.name=(ind+1)+". "+t(methods[data.methods_t[ind].name].attributes.name,lang);
						data2.mode= 'lines+markers';
						data2.line={color:colors[data.methods_t[ind].color]};
						data2.marker={color:colors[data.methods_t[ind].color]};
						traces.push(data2);
					});
					let layout={
							showlegend:true,
							title:t(self.props.task.plotInfo[el.index].description,lang),
							xaxis:{title:t(self.props.task.plotInfo[el.index].x.description,lang)},
							yaxis:{title:t(self.props.task.plotInfo[el.index].y.description,lang)},
							legend:{   
									xanchor: "left",
								    yanchor:'bottom',
								    y:-0.5,
								    x:0
							   },
							autosize:true
						};
						let z=self.props.task.plotInfo[el.index].z;
						if(z!==undefined)
							layout.zaxis={title:t(z.description,lang)};
					plots.push(<div className="plotDiv" key={index+"div_plot"}><Plot useResizeHandler={true} className="plotComponent" key={index+"_plot"}
						data={traces}
						layout={layout}
						/></div>);
				});
			}
		}
		return (
			<div id="outputBlock">
			<progress id="progressBar" value={this.state.progress} max="100"></progress>
			<div style={{textAlign:'center'}}>
			<button id="outputComputeButton" className="btn btn-primary startButton" onClick={this._calculate}>
				{t({ru:"Рассчитать",eng:"Compute"},lang)}
			</button>
			</div>
			<div id="output" style={data==undefined?{display:'none'}:{}}>
				<div id="outputResultsLabel" className="componentLabel bg-dark text-white">
					{t({ru:"Вывод результатов",eng:"Results"},lang)}
				</div>
				<div id="ouputInnerBlock">
				<MediaQuery maxWidth={smallMedium}>
					<StatisticsMobile data={data} lang={lang}/>
					{/*<div className="statTable">
						{rows}
					</div>*/}
				</MediaQuery>
				<MediaQuery minWidth={smallMedium+1}>
					<StatisticsDesktop data={data} lang={lang}/>
				</MediaQuery>
					{/*statistics*/}
				</div>
				<div id='outputGraphLabel' className="componentLabel bg-dark text-white" style={plots.length>0?{}:{display:'none'}}>
					{t({ru:"Графики",eng:"Plots"},lang)}
				</div>
				<div id="ouputInnerPlotBlock" style={plots.length>0?{}:{display:'none'}} >
					{plots}
				</div>
			</div>
			<div id="outputFooter">
			</div>
			</div>
			);
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Results);