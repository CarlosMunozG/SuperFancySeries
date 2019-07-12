'use strict';

function SeriesService() {
  this.baseUrl = 'https://api.tvmaze.com';
}

SeriesService.prototype.getAllSeries = async function() {
  var response = await fetch(`${this.baseUrl}/shows`);
  var data = await response.json();

  var filteredData = data.splice(0, 100);
  var newSeries = await Promise.all(filteredData.map( async (element) => {
    var newURL = element._links.previousepisode.href.split('');
    newURL.splice(4,0,"s")
    var newString = newURL.join('');
    var newResponse = await fetch(newString);
    var newData = await newResponse.json();
    element.seasons = newData.season;
    return element;
  }));
  return newSeries;
}

SeriesService.prototype.getOneSerie = async function(id) {
  var response = await fetch(`${this.baseUrl}/shows/${id}`);
  var data = await response.json();
  var newResponse = await fetch(data._links.previousepisode.href);
  var newData = await newResponse.json();
  data.seasons = newData.season;
  return data;
}

var seriesServiceInstance = new SeriesService();
