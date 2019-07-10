'use strict';

function GalleriesPage(parentElement) {
  this.parentElement = parentElement;
  this.elements = null;
  this.series = null;
  this.loading = null;
  this.year = null;
}

GalleriesPage.prototype.generate = async function() {
  this.loading = new Loading(this.parentElement);
  this.loading.generate();

  await this.connectToAPI();
  this.elements = `
    <header>
      <h2>Wellcome to the series page</h2>
    </header>
    <section class="cards-container"> 
  `;
  this.series.forEach( (serie) => {

    var time = serie.premiered.split('-');
    time.splice(1,2).toString();
    this.year = parseInt(time);

    if(serie.network){
      var network = serie.network.country.name;
    } else {
      var network = "Unknown";
    }

    this.elements += `
      <article>
        <a href="#0" id=${serie.id}>
          <div class="poster">
            <img src="${serie.image.original}" alt="${serie.name} featured image"/>
          </div>
          <div class="info">
            <h3>Name: ${serie.name}</h3>
            <p>Year: ${this.year}</p>
            <p>Seasons: ${serie.seasons}</p>
            <p>Rating: ${serie.rating.average}</p>
            <p>Country: ${network}</p>
            <p>Summary: ${serie.summary}</p>
            <!--<a href="https://www.imdb.com/title/${serie.externals.imdb}" target="_blank">Play</a>-->
          </div>
        </a>
      </article>`;
  });
  this.elements += '</section>';
  this.render();
  this.addListeners();
}

GalleriesPage.prototype.render = function() {
  this.parentElement.innerHTML = this.elements;
}

GalleriesPage.prototype.connectToAPI = async function() {
  this.series = await seriesServiceInstance.getAllSeries();
}

GalleriesPage.prototype.addListeners = function() {

  var anchors = document.querySelectorAll('article a');
  var self = this;
  anchors.forEach( function(anchor){
    anchor.addEventListener('click', (event) => {
      goToSerie(event,self)
    });
  })
  
  function goToSerie(event, self) {
    var id = Number(event.currentTarget.attributes.id.value);
    var url = null;
    routerInstance.buildDom(url, self.parentElement, id);
  }
}