WelcomeComponent = React.createClass({
    render() {
        return <div className="monish">
            {this.state.lines.map( line => {return <Line {...line}></Line>})}
        </div>
    },
    getInitialState() {
        return {
            lines: [
                {number: 4},
                {number: 5},
                {number: 16},
                {number: 51}
            ]
        }
    }
});

Line = React.createClass({
    render() {
        return (<div className="line">
            {this.props.number}
        </div>);
    }
});