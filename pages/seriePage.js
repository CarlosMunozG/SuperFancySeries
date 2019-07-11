'use strict';

function SeriePage(parentElement, id) {
  this.parentElement = parentElement;
  this.elements = null;
  this.serie = null;
  this.loading = null;
  this.year = null;
  this.id = id;
  this.genres = null;
  this.country = null;
}

SeriePage.prototype.generate = async function() {
  this.loading = new Loading(this.parentElement);
  this.loading.generate();

  await this.connectToAPI();
  this.getYear(); 
  this.getCountry();
  this.getGenres();
  
  this.elements = `
  <!--<header>
    <h2>Welcome to the serie page</h2>
  </header>-->
    <section class="single-card"> 
      <article>
        <a href="#0" url=${this.serie._links.self}>
          <div class="poster">
            <div class="poster-container">
              <img src="${this.serie.image.original}" alt="${this.serie.name} featured image"/>
            </div>
            <div class="lateral-background"></div>
          </div>
          <section class="get-details">
            <div class="info-featured">
              <h3>${this.serie.name}</h3>
              <p class="rating">${this.serie.rating.average} / 10</p>
              <p class="genre">${this.genres}</p>
            </div>
            <div class="info-secondary">
              <p class="details">Year</p>
              <p class="info-details">${this.year}</p>
              <p class="details">Seasons</p>
              <p class="info-details">${this.serie.seasons}</p>
              <p class="details">Country</p>
              <p class="info-details">${this.country}</p>
              <p class="details">Summary</p>
              <p class="last-detail">${this.serie.summary}</p>
            </div>
            <div class="play">
              <!--<a href="https://www.imdb.com/title/${this.serie.externals.imdb}" target="_blank">Play</a>-->
            </div>
          </section>
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

SeriePage.prototype.getYear = function() {
  var time = this.serie.premiered.split('-');
  time.splice(1,2).toString();
  this.year = parseInt(time);
}

SeriePage.prototype.getCountry = function() {
  if(this.serie.network){
    this.country = this.serie.network.country.name;
  } else {
    this.country = "Unknown";
  }
}

SeriePage.prototype.getGenres = function() {
  if(this.serie.genres){
    this.genres = this.serie.genres.toString().split(',').join('');
  } else {
    this.genres = "Unknown";
  }  
}
