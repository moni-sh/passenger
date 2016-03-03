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
                currentPosition: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
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
                center: this.state.currentPosition,
                //center: new google.maps.LatLng(32.0641227,34.7698104),
                zoom: 17
            };
        }
        else {
            return {};
        }

    },
    render() {
        if (this.data.loaded)
            return <GoogleMap name="mymap" options={this.data.mapOptions} currentPosition={this.state.currentPosition}/>;

        return <div>Loading map...</div>;
    }
});

GoogleMap = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        options: React.PropTypes.object.isRequired
    },
    componentDidMount() {
        var self = this;
        GoogleMaps.create({
            name: this.props.name,
            element: ReactDOM.findDOMNode(this),
            options: this.props.options
        });

        GoogleMaps.ready(this.props.name, function(map) {
            var cabImage = 'https://avatars0.githubusercontent.com/u/17613586?v=3&s=40';
            var passangerImage = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

            var you = new google.maps.Marker({
                position: self.props.currentPosition,
                map: map.instance,
                icon: passangerImage
            });

            var cab = null;


            var locations = [32.0512168,34.7836476];

            cab = new google.maps.Marker({
                position: new google.maps.LatLng(locations[0], locations[1]),
                map: map.instance,
                icon: cabImage
            });
            Meteor.setInterval(function(){
                if(cab){
                    cab.setMap(null);
                }
                locations[1] = locations[1] - 0.0001;
                locations[0] = locations[0] + 0.0001;

                cab = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[0], locations[1]),
                    map: map.instance,
                    icon: cabImage
                });

            } ,1000);
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
