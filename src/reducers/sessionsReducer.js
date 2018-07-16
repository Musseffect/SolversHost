import tasks from "../tasks.js";
import {setParameters} from "./methodPickerReducer.js";

function resetSession(state)
{
	let taskID=state.selectedTask;
	let session={sessionName:'Новая сессия'};
	let data={};
	let i=taskID;
	let k=0;
	let taskParameters={};
	taskParameters.argument=tasks[i].argument.default;
	taskParameters.argumentInterval=tasks[i].argumentInterval.default;
	taskParameters.parameters=tasks[i].parameters.map(function(data)
	{
		return data.default;
	});
	taskParameters.variables=tasks[i].variables.map(function(data)
	{
		return data.default;
	});
	let outputParameters={};
	outputParameters.errorMethod=-1;
	outputParameters.plotInterval=[0, 0];
	outputParameters.plotDomain={t0:0,t1:1,dt:0};
	outputParameters.errorPlot=false;
	outputParameters.eigenvaluePlot=false;
	outputParameters.plots=[
	];
	tasks[i].plotInfo.forEach(function(data)
	{
		outputParameters.plots.push(false)
	});
	data={methods:[],taskParameters:taskParameters,outputParameters:outputParameters};
	session.data=data;
	state.currentSessions[taskID]=session;
	state.selectedMethod=-1;
	return state;
}
function removeSession(state,id)
{
	let taskId=state.selectedTask;
	state.sessions[taskId].sessionArray=state.sessions[taskId].sessionArray.filter(function(item,index){return index!=id;});
	return state;
}

function loadSession(state,id)
{
	let taskId=state.selectedTask;
	state.currentSessions[taskId]=JSON.parse(JSON.stringify(state.sessions[taskId].sessionArray[id]))
	state.selectedMethod=-1;
	return state;
}

function saveCurrentSession(state,sessionName)
{
	let taskId=state.selectedTask;
	if(state.sessions[taskId].sessionArray.length<8)
	{
		state.currentSessions[taskId].sessionName=sessionName;
		state.sessions[taskId].sessionArray=state.sessions[taskId].sessionArray.concat(JSON.parse(JSON.stringify(state.currentSessions[taskId])));
	}
	return state;
}
function loadSessions(state,fileInput,callback)
{
	var sessions=[];
	sessions=tasks.map(function(el,index){
		return {taskID:el.taskID,sessionArray:[]};
	});
	try{
		let data=JSON.parse(fileInput);
		data.forEach(function(el,index)
		{
			let flag=false;
			for(var i=0;i<tasks.length;i++)
			{
				if(el.taskID==tasks[i].taskID)
				{
					sessions[i].sessionArray=sessions[i].sessionArray.concat(el.sessionArray);
					break;
				}else
				{
					sessions.push(el);
				}
			}
		});
		sessions.forEach(function(el,index)
			{
				let len=el.sessionArray.length;
				if(len>8)
					el.sessionArray.splice(8,len-8);
			});
	}catch(e)
	{
		//error
		callback(false);
		return state;
	}
	state.sessions=sessions;
	callback(true);
	return state;
}





var sessionsReducer=function(state,action)
{
	switch(action.type)
	{
		case "RESET_SESSION":
			return setParameters(resetSession(state));
		case "DELETE_SESSION":
			return removeSession(state,action.id);
		case "LOAD_SESSION":
			return setParameters(loadSession(state,action.id));
		case "SAVE_SESSION":
			return saveCurrentSession(state,action.sessionName);
		case "LOAD_FILE":
			return setParameters(loadSessions(state,action.content,action.callback));
	}
	return state;
}

export default sessionsReducer;