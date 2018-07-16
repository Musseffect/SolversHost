import {methodPickerReducer} from "./methodPickerReducer.js";
import {outputParametersReducer} from "./outputParametersReducer.js";
import taskReducer from "./taskReducer.js";
import sessionsReducer from "./sessionsReducer.js";


var rootReducer=function(state,action)
{
	state=sessionsReducer(state,action);
	state=taskReducer(state,action);
	state=methodPickerReducer(state,action);
	state=outputParametersReducer(state,action);
	switch(action.type)
	{
		case "SWITCH_LANG":
			state.lang=(state.lang=="ru"?"eng":"ru");
	}
	return Object.assign({},state);
}

export default rootReducer;