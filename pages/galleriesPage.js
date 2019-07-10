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
      <h2 class="pageTitle" >See All series</h2>
      <p>Super Fancy Series selection</p>
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
    console.log(serie);

    this.elements += `
      <article class="all-galleries">
        <a href="#0" id=${serie.id}>
          <div class="poster">
            <img src="${serie.image.original}" alt="${serie.name} featured image"/>
            <div class="background-all-galleries"></div>
          </div>
          <div class="mini-info">
            <h3 class="mini-title">${serie.name}</h3>
            <p class="mini-year">${this.year}</p>
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