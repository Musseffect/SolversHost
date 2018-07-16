
export var select=function(id)
{
	return {type:"SELECT_TASK",id};
};
export var updateParameter=function(name,value)
{
	return {type:"UPDATE_PARAMETER",name,value};
};
export var updateVariable=function(name,value)
{
	return {type:"UPDATE_VARIABLE",name,value};
};
export var updateArgument=function(name,value)
{
	return {type:"UPDATE_ARGUMENT",name,value};
};