'use strict';

function GalleriesPage(parentElement) {
  this.parentElement = parentElement;
  this.elements = null;
  this.series = null;
  this.loading = null;
  this.year = null;
  this.url = null;
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
    var newURL = serie.image.original.split('');
    newURL.splice(4,0,"s")
    var newString = newURL.join('')
    this.url = newString;
    var time = serie.premiered.split('-');
    time.splice(1,2).toString();
    this.year = parseInt(time);

    this.elements += `
      <article class="all-galleries">
        <a href="#0" id=${serie.id}>
          <div class="poster">
            <img src="${newString}" alt="${serie.name} featured image"/>
            <div class="background-all-galleries"></div>
          </div>
          <div class="mini-info">
            <h3 class="mini-title">${serie.name}</h3>
            <p class="mini-year">${this.year}</p>
          </div>
        </a>
        <!--<div class="mini-intro"></div>-->
      </article>`;
  });
  this.elements += `</section><section class="intro-effect"></section>`;
  this.render()
  this.addListeners();
  this.unpluggedIntroEffect();
}

GalleriesPage.prototype.render = function() {
  this.parentElement.innerHTML = this.elements;
}

GalleriesPage.prototype.connectToAPI = async function() {
  this.series = await seriesServiceInstance.getAllSeries();
}

GalleriesPage.prototype.addListeners = function() {
  var anchors = document.querySelectorAll('article a');
  var body = document.querySelector('body');
  var main = document.querySelector('#site-main');
  var self = this;
  anchors.forEach( function(anchor){
    anchor.addEventListener('click', (event) => {
      goToSerie(event,self)
    });
  })
  function goToSerie(event, self) {
    //console.log(self.url);
    // var newURL = serie.image.original.split('');
    // newURL.splice(4,0,"s")
    // var newString = newURL.join('');
    // this.images.push(newString);

    var id = Number(event.currentTarget.attributes.id.value);
    var url = self.url;
    routerInstance.buildDom(url, self.parentElement, id);
    body.style.background = '#fff';
    main.style.background = '#fff';
  }
}

GalleriesPage.prototype.unpluggedIntroEffect = function() {
  var introEffect = document.querySelector('.intro-effect');
  setTimeout( function(){
    introEffect.classList.add('opacity');
  },1000);

  setTimeout( function(){
    introEffect.classList.add('none');
  }, 1500);
}


