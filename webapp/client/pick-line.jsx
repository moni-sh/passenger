PickLine = React.createClass({
    render() {
        return <div className="monish">
            {this.state.lines.map( line => {return <Line {...line}></Line>})}
        </div>
    },
    getInitialState() {
        return {
            lines: cabLines
        }
    }
});

var Line = React.createClass({
    render() {
        return (<div className="line" onClick={this.pickLine}>
            {this.props.number}
        </div>);
    },
    pickLine() {
        FlowRouter.go('/directions/' + this.props.number)
    }
});