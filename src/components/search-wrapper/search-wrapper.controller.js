class SearchWrapperController {
  constructor(AirportsService) {
    this.AirportsService = AirportsService;
  }
  $onInit () {
    this.routesList = [];
    this.AirportsService.getAllAirports().then(data => {
      this.airportList = data.data.airports;
      this.routesFullList = data.data.routes;
      this.setOriginAirport();
      this.setDestAirport();
    });
  }
  $onChanges(changes) {
    if (changes.originAirportCode) { this.setOriginAirport(); }
    if (changes.destAirportCode) { this.setDestAirport(); }
  }
  setOriginAirport() {
    this.originAirport = this.findAirportCode(this.originAirportCode);
    this.updateDestinations();
    this.destAirport = '';
  }
  setDestAirport() {
    this.destAirport = this.findAirportCode(this.destAirportCode);
  }
  updateDestinations() {
    const routes = this.routesFullList
    && this.originAirport
    && this.originAirport.iataCode
    && this.routesFullList[this.originAirport.iataCode]
    || [];
    this.routesList = this.airportList && this.airportList.filter(airport =>
      { return routes.some(iata => iata === airport.iataCode); });
  }
  onOriginAirport(item) {
    this.selectOrigin({ airport: item });
    this.updateDestinations();
  }
  onDestAirport(item) {
    this.selectDest({ airport: item });
  }
  findAirportCode(iataCode) {
    return iataCode
    && this.airportList
    && this.airportList.find(airport => airport.iataCode === iataCode);
  }
  replaceTripLocations() {
    [this.destAirport, this.originAirport] = [this.originAirport, this.destAirport];
    this.selectOrigin({ airport: this.originAirport });
    this.selectDest({ airport: this.destAirport });
  }
}

SearchWrapperController.$inject = ['AirportsService'];

export default SearchWrapperController;
