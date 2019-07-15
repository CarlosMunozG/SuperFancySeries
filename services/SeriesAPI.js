'use strict';

class SeriesService{
  constructor(){
    this.baseUrl = 'https://api.tvmaze.com';
  }

  async getAllSeries() {
    const response = await fetch(`${this.baseUrl}/shows`);
    const data = await response.json();

    const filteredData = data.splice(0, 100);
    const newSeries = await Promise.all(filteredData.map( async element => {
      const newURL = element._links.previousepisode.href.split('');
      newURL.splice(4,0,"s")
      const newString = newURL.join('');
      const newResponse = await fetch(newString);
      const newData = await newResponse.json();
      element.seasons = newData.season;
      return element;
    }));
    return newSeries;
  }
  async getOneSerie(id){
    const response = await fetch(`${this.baseUrl}/shows/${id}`);
    const data = await response.json();
    const newURL = data._links.previousepisode.href.split('');
    newURL.splice(4,0,"s")
    const newString = newURL.join('');
    const newResponse = await fetch(newString);
    const newData = await newResponse.json();
    data.seasons = newData.season;
    return data;
  }
  }

const seriesServiceInstance = new SeriesService();
