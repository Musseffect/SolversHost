import tasks from "../tasks.js";

export function setPlotInterval(state)
{
	let taskId=state.selectedTask;
	let methods=state.currentSessions[taskId].data.methods;
	let outputParameters=state.currentSessions[taskId].data.outputParameters;
	let systemSize=tasks[taskId].variables.length;
	let taskParameters=state.currentSessions[taskId].data.taskParameters;
	let t0=taskParameters.argument;
	let dt=taskParameters.argumentInterval;


	let t=0;
	let mem=8*1024*1024/(8*(systemSize+1));
	let t0i=parseFloat(t0);
	let t1i=t0i+parseFloat(dt);
	for(var i=0;i<methods.length;i++)
	{
		let p=parseFloat(methods[i].parameters.stepValue)/1000.0;
		if(isNaN(p))
		{
			let pd=outputParameters.plotDomain=isNaN(t0i)||isNaN(t1i)||isNaN(dtn)||t0>=t1i?{t0:0,t1:1,dt:0}:{t0:t0i,t1:t1i,dt:0};
			return;
		}
		t+=1.0/p;
	}
	let dtn=mem/t;
	let pd=outputParameters.plotDomain=isNaN(t0i)||isNaN(t1i)||isNaN(dtn)||t0>=t1i?{t0:0,t1:1,dt:0}:{t0:t0i,t1:t1i,dt:dtn};

	return state;
}



export var outputParametersReducer=function(state,action)
{
	let taskId=state.selectedTask;
	let outputParameters=state.currentSessions[taskId].data.outputParameters;
	switch(action.type)
	{
		case "UPDATE_OUTPUT_PARAMETER":
			outputParameters[action.name]=action.value;
			state.currentSessions[taskId].data.outputParameters=Object.assign({},outputParameters);
			break;
		case "UPDATE_PLOTS":
			outputParameters.plots[action.name]=action.value;
			state.currentSessions[taskId].data.outputParameters=Object.assign({},outputParameters);
			break;
		case "UPDATE_RESULTS":
			state.results=action.results;
	}
	return state;
}

