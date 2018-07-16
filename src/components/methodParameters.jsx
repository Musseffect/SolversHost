import React from "react";
import {methods} from "../methods.js";
import {dependOnMethod} from "../reducers/methodPickerReducer.js";
import InputNumber from "./inputNumber.jsx";
import t from "../localization.js";
//import from methods


class MethodParameters extends React.Component
{
	constructor(props)
	{
		super(props);
		this._methodChange=this._methodChange.bind(this);
		this._inputChange=this._inputChange.bind(this);
		let self=this;
		
	}
	_methodChange(e)
	{
		this._inputChange(e);
	}
	_inputChange(e)
	{
		this.props.onUpdate(e.target.name,(e.target.type === 'checkbox' ? e.target.checked : e.target.value));
	}
	render()
	{
		const {lang,parameters}=this.props;
		let options=Object.assign({},dependOnMethod);
		let selectedMethod=parameters.selectedMethod;
		let m=methods[selectedMethod];
		let orderRows=[];
		if(m.options!==undefined)
		{	
			m.options.forEach(function(data)
				{
					options[data]=true;
				});
			if(m.orders!==undefined&&options.chooseOrderEnabled==true)
			{
				m.orders.forEach(function(item,index)
				{
					orderRows.push(<option key={index+"optionsOrder"} value={index}>{t(item.name,lang)}</option>);
				});
				let suboptions=m.orders[this.props.parameters.selectedOrder].options;
				if(suboptions!==undefined)
				{
					suboptions.forEach(function(data)
					{
						options[data]=true;
					});
				}
			}
		}

		var style="hide";
		if(this.props.show)
			style="show";
		let methodRows=[];
		let visibleItems=[];
		let hiddenItems=[];
		let methodList=methods.map(function(data,index)
			{
				return (<option key={index+"methodList"} value={index}>{t(data.attributes.name,lang)}</option>);
			});
		visibleItems.push(<div key="methodFamilyDiv" className="methodRow">
						<label key="methodFamilyLabel" className="methodLabel">
						{t({ru:"Семейство методов",eng:"Family of methods"},lang)}
						</label>
						<select key="methodFamilySelect" className="methodInput method_select" name="selectedMethod" onChange={this._methodChange} value={this.props.parameters.selectedMethod}/*React specific*/>
						{/*{methodRows}*/}
						{methodList}
						</select>
						</div>);
		let jsxText=(<div key="chooseOrderDiv" className={"methodGroup chooseOrder"+(options.chooseOrderEnabled?"":" methodParametersHidden")}>
						<div  className="methodRow">
							<label key="chooseOrderLabel" className="methodLabel">
								{t({ru:"Метод",eng:"Method"},lang)}
							</label>
							<select key="chooseOrderSelect" className="methodInput Orders" name="selectedOrder" onChange={this._inputChange} value={this.props.parameters.selectedOrder}>
									{orderRows}
							</select>
						</div>
					</div>);

		if(options.chooseOrderEnabled)
		{
			visibleItems.push(jsxText);
		}else
		{
			hiddenItems.push(jsxText);
		}

		visibleItems.push(<div key="stepDiv" className="methodRow">
							<label key="stepLabel" className="methodLabel">
							{t({ru:"Шаг, 1E-3",eng:"Step, 1E-3"},lang)}
							</label>
							<InputNumber key="stepInput" className="methodInput step" type="number" name="stepValue" onChange={this._inputChange} value={this.props.parameters.stepValue} step="any" min={this.props.taskDependent.stepMin} max={this.props.taskDependent.stepMax}/>
						</div>);
		jsxText=(<div key="autostepDiv" className={"methodGroup autoStep"+(options.autoStepEnabled?"":" methodParametersHidden")}>
						<div key="maxstepDiv" className="methodRow">
							<label key="maxsteplabel" className="methodLabel">
							{t({ru:"Максимальный шаг, 1E-3",eng:"Max step, 1E-3"},lang)}
							</label>
							<InputNumber key="maxstepInput" className="methodInput maxStep" type="number" name="maxstepValue" onChange={this._inputChange} value={this.props.parameters.maxstepValue} step="any" min={this.props.taskDependent.stepMin} max={this.props.taskDependent.stepMax}/>
						</div>
						<div key="errorAbsTolDiv" className="methodRow">
							<label key="errorAbsTolLabel" className="methodLabel">
							{t({ru:"Допустимая абс. ошибка",eng:"Abs. error tolerance"},lang)}
							</label>
							<InputNumber key="errorAbsTolInput" className="methodInput errorTolerance" name="errorValue" onChange={this._inputChange} type="number" value={this.props.parameters.errorValue} step="any" min="0" max='NaN'/>
						</div>
					</div>);

		if(options.autoStepEnabled)
		{
			visibleItems.push(jsxText);
		}else
		{
			hiddenItems.push(jsxText);
		}
		jsxText=(<div key="implicitDiv" className={"methodGroup useJacobian"+(options.jacobianMatrixEnabled?"":" methodParametersHidden")}>
						<div key="newtonDiv" className="methodRow">
							<label key="newtonLabel" className="methodLabel newtonLabel">{t({ru:"Параметры метода Ньютона",eng:"Newton method parameters"},lang)}</label>
						</div>
						<div key="matrixDiv" className="methodRow jacobiMatrixEval">
							<label key="matrixLabel" className="methodLabel">
							{t({ru:"Матрица Якоби",eng:"Jacobian matrix"},lang)}
							</label>
							<select key="matrixSelect" className="methodInput jacobianCalc" name="jacobianSelected" onChange={this._inputChange} value={this.props.taskDependent.jacobianAnalythicEnabled?this.props.parameters.jacobianSelected:1}>
								<option key="matrixOption0" value='0' disabled={!this.props.taskDependent.jacobianAnalythicEnabled} >
									{t({ru:"Аналитическая",eng:"Analytical"},lang)}
								</option>
								<option key="matrixOption1" value='1'>
								{t({ru:"Приближённая",eng:"Numerical"},lang)}
								</option>
							</select>
						</div>
						<div key="constmatrixDiv" className="methodRow">
							<label key="constmatrixLabel" className="methodLabel">
								{t({ru:"Константная матрица",eng:"Use constant matrix"},lang)}
							</label>
							<input key="constmatrixCheckbox" type="checkbox" className="methodInput jacobianConst" name="useConstMatrix" onChange={this._inputChange} checked={this.props.parameters.useConstMatrix}/>
						</div>
						<div key="iterationsDiv" className="methodRow">
							<label key="iterationsLabel" className="methodLabel">
								{t({ru:"Количество итераций",eng:"Iterations"},lang)}
							</label>
							<InputNumber key="iterationsInput" className="methodInput" type="number" name="iterationsCount" onChange={this._inputChange} value={this.props.parameters.iterationsCount} step="1" min={1} max={20}/>
						</div>
						<div key="absErrorDiv" className="methodRow">
							<label key="absErrorLabel" className="methodLabel">
								{t({ru:"Абс. ошибка",eng:"Max abs. error"},lang)}
							</label>
							<InputNumber key="absErrorInput" className="methodInput" type="number" name="maxAbsSolution" onChange={this._inputChange} value={this.props.parameters.maxAbsSolution} step="any" min={0.0} max={2.0}/>
						</div>
						<div key="absDiffDiv" className="methodRow">
							<label key="absDiffLabel" className="methodLabel">
								{t({ru:"Абс. разница решений",eng:"Max abs. solutions difference"},lang)}
							</label>
							<InputNumber key="absDiffInput" className="methodInput" type="number" name="maxAbsDifference" onChange={this._inputChange} value={this.props.parameters.maxAbsDifference} step="any" min={0.0} max={2.0}/>
						</div>
						<div key="relDiffDiv" className="methodRow">
							<label key="relDiffLabel" className="methodLabel">
								{t({ru:"Отн. разница решений",eng:"Max rel. solutions difference"},lang)}
							</label>
							<InputNumber key="relDiffInput" className="methodInput" type="number" name="maxRelDifference" onChange={this._inputChange} value={this.props.parameters.maxRelDifference} step="any" min={0.0} max={2.0}/>
						</div>
					</div>);

		if(options.jacobianMatrixEnabled)
		{
			visibleItems.push(jsxText);
		}else
		{
			hiddenItems.push(jsxText);
		}

		return (<div id="methodParameters" className={style}>
					<div id="methodAddingTable">
						<div>
						{visibleItems}
						{hiddenItems}
						</div>
					</div>
				</div>
				);
	}
}
MethodParameters.defaultProps = {
  show:false
};

module.exports=MethodParameters;