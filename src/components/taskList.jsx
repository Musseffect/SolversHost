import React from "react";
import { connect } from "react-redux";
import {select,updateParameter,updateVariable,updateArgument} from "../actions/taskParametersActions.js";
import tasks from "../tasks.js";
import InputNumber from "./inputNumber.jsx";
import MathJaxComponent from "./mathJaxComponent.jsx";
import t from "../localization.js";

const mapStateToProps=function(state)
{
	let taskId=state.selectedTask;
	return {selectedTask:taskId,data:state.currentSessions[taskId].data.taskParameters,lang:state.lang};
};

const mapDispatchToProps=function(dispatch)
{
	return ({
		select:function(id){dispatch(select(id))},
		updateParameter:function(name,value){dispatch(updateParameter(name,value));},
		updateVariable:function(name,value){dispatch(updateVariable(name,value))},
		updateArgument:function(name,value){dispatch(updateArgument(name,value));}
	});
};

class TaskList extends React.Component
{
	constructor(props)
	{
		super(props);
		this.selectTask=this.selectTask.bind(this);
		this._updateParameter=this._updateParameter.bind(this);
		this._updateArgument=this._updateArgument.bind(this);
		this._updateVariable=this._updateVariable.bind(this);
		this.props=props;
	}
	selectTask(e)
	{
		this.props.select(e.currentTarget.getAttribute('name'));
	}
	_updateParameter(e)
	{
		let name=e.target.name;
		let value= e.target.value;
		this.props.updateParameter(name,value);
	}
	_updateArgument(e)
	{
		let name=e.target.name;
		let value= e.target.value;
		this.props.updateArgument(name,value);
	}
	_updateVariable(e)
	{
		let name=e.target.name;
		let value= e.target.value;
		this.props.updateVariable(name,value);
	}
	render()
	{
		const {lang,data,selectedTask} = this.props;
		let self=this;
		let elements=tasks.map(function(data,index){
			return <div className={"list-group-item list-group-item-action taskListElement"+(index==selectedTask?" active":"")} key={index+"_taskList"} name={index}  onClick={self.selectTask}>
				<div>{(index+1)+". "+t(data.taskInfo.name,lang)}</div>
			</div>;
		});
		let task=tasks[selectedTask];

		let params=[];
		data.parameters.forEach(function(data,index)
		{
			let attr=task.parameters[index];
			params.push(<div className="table_row" key={index+"_parameterDiv"}>
				<label className="table_label" key={index+"_parameterLabel"} >{t(attr.description,lang)}</label>
				<InputNumber className="table_input" onChange={self._updateParameter} type="number" value={data} name={index} key={index+"_parameterInput"} step={attr.step} min={attr.min} max={attr.max} />
					</div>);
		});
		let variables=[];
		data.variables.forEach(function(data,index)
		{
			let attr=task.variables[index];
			variables.push(<div className="table_row" key={index+"_variableDiv"}>
				<label className="table_label" key={index+"_variableLabel"} >{t(attr.description,lang)}</label>
				<InputNumber className="table_input" onChange={self._updateVariable} type="number" value={data} name={index} key={index+"_variableInput"} step={attr.step} min={attr.min} max={attr.max} />
					</div>)
		});

		return (
			<div id="taskBlock">
				<div id="taskBlockLabel" className="componentLabel bg-dark text-white">
					{t({ru:"Выбор задачи",eng:"Systems"},lang)}
				</div>
				<div id="taskList">
					<ul className="list-group list-group-flush">
					{elements}
					</ul>
				</div>
				<div id="taskDescriptionLabel" className="componentLabel bg-dark text-white">
					{t({ru:"Описание задачи",eng:"System description"},lang)}
				</div>
					{/*dangerouslySetInnerHTML={{__html: task.taskInfo.description}}*/}
				<div id="taskDescription">
					<MathJaxComponent alternative={task.taskInfo.description[lang]}>
						{task.taskInfo.mathdescription[lang]}	
					</MathJaxComponent>
				</div>
				<div id="taskParametersBlock">
				{	params.length!=0&&
					<div>
						<div id="taskParameters" className="componentLabel bg-dark text-white">
							{t({ru:"Параметры системы",eng:"System parameters"},lang)}
						</div>
							<div className="taskParametersTable">
							<div className="table_row_group">
								{params}
							</div>
							</div>
					</div>
				}
					<div id="taskInitials" className="componentLabel bg-dark text-white">
							{t({ru:"Начальные условия и интервал расчёта",eng:"Initial conditions and argument interval"},lang)}
					</div>
					<div className="taskParametersTable">
						<div className="table_row_group">
						{variables}
							<div className="table_row">
								<label className="table_label">{t(task.argument.description,lang)}</label>
								<InputNumber className="table_input" onChange={this._updateArgument} type="number" name="argument" id="argument" value={this.props.data.argument} step={task.argument.step} min={task.argument.min} max={task.argument.max}/>
							</div>
							<div className="table_row">
								<label className="table_label">{t(task.argumentInterval.description,lang)}</label>
								<InputNumber className="table_input" onChange={this._updateArgument} type="number" name="argumentInterval" id="argumentInterval" value={this.props.data.argumentInterval} step={task.argument.step} min={task.argument.min} max={task.argument.max}/>
							</div>
						</div>
					</div>
				</div>
			</div>
			);
	}
}



export default connect(mapStateToProps,mapDispatchToProps)(TaskList);