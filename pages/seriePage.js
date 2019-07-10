'use strict';

function SeriePage(parentElement, id) {
  this.parentElement = parentElement;
  this.elements = null;
  this.serie = null;
  this.loading = null;
  this.year = null;
  this.id = id;
}

SeriePage.prototype.generate = async function() {
  this.loading = new Loading(this.parentElement);
  this.loading.generate();

  await this.connectToAPI();

  var time = this.serie.premiered.split('-');
  time.splice(1,2).toString();
  this.year = parseInt(time);

  if(this.serie.network){
    var network = this.serie.network.country.name;
  } else {
    var network = "Unknown";
  }

  this.elements = `
  <header>
    <h2>Welcome to the serie page</h2>
  </header>
    <section class="cards-container"> 
    <article>
      <a href="#0" url=${this.serie._links.self}>
        <div class="poster">
          <img src="${this.serie.image.original}" alt="${this.serie.name} featured image"/>
        </div>
        <div class="info">
          <h3>Name: ${this.serie.name}</h3>
          <p>Year: ${this.year}</p>
          <p>Seasons: ${this.serie.seasons}</p>
          <p>Rating: ${this.serie.rating.average}</p>
          <p>Country: ${network}</p>
          <p>Summary: ${this.serie.summary}</p>
          <!--<a href="https://www.imdb.com/title/${this.serie.externals.imdb}" target="_blank">Play</a>-->
        </div>
      </a>
    </article>
    </section>
    `;
  this.render();
}

SeriePage.prototype.render = function() {
  this.parentElement.innerHTML = this.elements;
}

SeriePage.prototype.connectToAPI = async function() {
  this.serie = await seriesServiceInstance.getOneSerie(this.id)
}