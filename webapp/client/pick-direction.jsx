PickDirection = React.createClass({
   render() {
       return (<div className="directions">
           <Direction direction={this.state.directions[0]} line={this.props}></Direction>
           <Direction direction={this.state.directions[1]} line={this.props}></Direction>
       </div>);
   },
    getInitialState() {
        return {
            directions: ['', '']
        };
    },
    componentDidMount() {
        this.setState( cabLines.filter( line => line.number == Number(this.props.number))[0]);
    }
});

var Direction = React.createClass({
    render() {
       return <div onClick={this.setRide}>{this.props.direction}</div>;
    },
    setRide() {
        console.log('call mongo firebase, who ever?!');
        FlowRouter.go('/wait/' + this.props.line.number + '/' + this.props.direction);
    }
});