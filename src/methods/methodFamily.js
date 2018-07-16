


export function createFamily(methods)
{
	return methods.map(function(item,index)
		{
			return {name:item.attributes.name,options:item.options};
		});
}