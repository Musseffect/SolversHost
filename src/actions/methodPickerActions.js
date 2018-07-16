export var select=function(id)
{
	return {type:'SELECT_METHOD',id};
};
export var add=function()
{
	return {type:'ADD_METHOD'};
};
export var remove=function(id)
{
	return {type:'REMOVE_METHOD',id};
};
export var update=function(id,name,value)
{
	return {type:"UPDATE_METHOD",id,name,value};
}

