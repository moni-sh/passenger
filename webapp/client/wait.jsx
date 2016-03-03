Wait = React.createClass({
    mixins: [ReactMeteorData],
    getInitialState() {
        return {
            currentPosition: null,
            ready: false
        };
    },
    componentWillMount() {
        var self = this;
        navigator.geolocation.getCurrentPosition(function(position) {
            self.setState({
                currentPosition: position,
                ready: true
            });
        });
    },
    componentDidMount() {
        GoogleMaps.load();
    },
    getMeteorData() {
        return {
            loaded: GoogleMaps.loaded() && this.state.ready,
            mapOptions: GoogleMaps.loaded() && this._mapOptions()
        };
    },
    _mapOptions() {
        if(this.state.currentPosition) {
            return {
                center: new google.maps.LatLng(this.state.currentPosition.coords.latitude, this.state.currentPosition.coords.longitude),
                zoom: 17
            };
        }
        else {
            return {};
        }

    },
    render() {
        if (this.data.loaded)
            return <GoogleMap name="mymap" options={this.data.mapOptions} />;

        return <div>Loading map...</div>;
    }
});

GoogleMap = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        options: React.PropTypes.object.isRequired
    },
    componentDidMount() {
        GoogleMaps.create({
            name: this.props.name,
            element: ReactDOM.findDOMNode(this),
            options: this.props.options
        });

        GoogleMaps.ready(this.props.name, function(map) {
            navigator.geolocation.getCurrentPosition(function(position) {
                ;
            })
            var marker = new google.maps.Marker({
                position: map.options.center,
                map: map.instance
            });
        });
    },
    componentWillUnmount() {
        if (GoogleMaps.maps[this.props.name]) {
            google.maps.event.clearInstanceListeners(GoogleMaps.maps[this.props.name].instance);
            delete GoogleMaps.maps[this.props.name];
        }
    },
    render() {
        return <div className="map-container"></div>;
    }
});
