'use strict';

function SeriesService() {
  this.baseUrl = 'http://api.tvmaze.com';
}

SeriesService.prototype.getAllSeries = async function() {
  var response = await fetch(`${this.baseUrl}/shows`);
  var data = await response.json();

  var filteredData = data.splice(0, 100);
  var newSeries = Promise.all(filteredData.map( async (element) => {
    var newResponse = await fetch(element._links.previousepisode.href);
    var newData = await newResponse.json();
    element.seasons = newData.season;
    return element;
  }))
  return newSeries;
}

SeriesService.prototype.getOneSerie = async function(id) {
  var response = await fetch(`${this.baseUrl}/shows/${id}`);
  var data = await response.json();
  return data;
}

var seriesServiceInstance = new SeriesService();
