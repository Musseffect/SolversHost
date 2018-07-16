import React from "react";
import ReactDOM from 'react-dom';


let loaded=false;

(function()
{
	let iter=0;
	let timeID=setInterval(function(){
		iter++;
		if(MathJax!==undefined)
		{
			clearInterval(timeID);
			loaded=true;
			MathJax.Hub.Queue([function(){MathJax.Hub.processSectionDelay = 0;}]);
		}else if(iter==100)
		{
			clearInterval(timeID);
		}
		},500);
})();

class MathJaxComponent extends React.Component {

constructor(props) {
    super(props);
}

componentDidMount(){
	if(loaded)
    	MathJax.Hub.Queue(['Typeset', MathJax.Hub, ReactDOM.findDOMNode(this)]);
}

componentDidUpdate() {
	if(loaded)
    	MathJax.Hub.Queue(['Typeset', MathJax.Hub, ReactDOM.findDOMNode(this)]);
}

render() {

    return (
    	/*dangerouslySetInnerHTML={{__html: this.props.children}}*/
         loaded?(<div style={{}}>{this.props.children}</div>):(<div style={{}}>{this.props.alternative}</div>)
    );
}
}

export default MathJaxComponent;