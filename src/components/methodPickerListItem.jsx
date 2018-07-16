import React from "react";


class MethodPickerListItem extends React.Component
{
	constructor(props)
	{
		super(props);
		this._select=this._select.bind(this);
		this._remove=this._remove.bind(this);
	}
	_select(event)
	{
		event.preventDefault();
		event.stopPropagation();
		this.props.select(this.props.number);
	}
	_remove(event)
	{
		event.preventDefault();
		event.stopPropagation();
		this.props.remove(this.props.number);
	}
	render(){
		let className="methodListItem";
		if(this.props.selected)
		{
			className+=" methodListItemSelected";
		}
		return (<div id="method1" className={className} onClick={this._select}>
				<div className="methodInfoContainer">
					<div className="methodNumber">{this.props.number+1}
					</div>
					<div className="methodName">{this.props.methodName}
					</div>
				</div>
				<div className={"methodColor "+this.props.colorStyle}>
				</div>
				<div className="methodRemoveButton" onClick={this._remove}>
					<svg className="methodRemoveIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" width="8" height="8">
						<use href="#xSign"></use>
					</svg>
				</div>
			</div>
			);
	}
}

MethodPickerListItem.defaultProps = {
 methodName:"Undefined",
 number:0,
 colorStyle:""
};

module.exports=MethodPickerListItem;