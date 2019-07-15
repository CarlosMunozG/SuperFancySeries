'use strict';

class GalleriesPage{
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.elements = null;
    this.series = null;
    this.loading = null;
    this.year = null;
    this.url = null;
  }

  async generate(){
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
    this.series.forEach( serie => {
      const newURL = serie.image.original.split('');
      newURL.splice(4,0,"s")
      const newString = newURL.join('')
      this.url = newString;
      const time = serie.premiered.split('-');
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

  render(){
    this.parentElement.innerHTML = this.elements;
  }

  async connectToAPI() {
    this.series = await seriesServiceInstance.getAllSeries();
  }

  addListeners() {
    const anchors = document.querySelectorAll('article a');
    const body = document.querySelector('body');
    const main = document.querySelector('#site-main');
    const self = this;
    anchors.forEach( (anchor) => {
      anchor.addEventListener('click', event =>  goToSerie(event,self) );
    })
    const goToSerie = (event, self) => {
      const id = Number(event.currentTarget.attributes.id.value);
      let url = null;
      routerInstance.buildDom(url, self.parentElement, id);
      body.style.background = '#fff';
      main.style.background = '#fff';
    }
  }

  unpluggedIntroEffect() {
    const introEffect = document.querySelector('.intro-effect');
    setTimeout( () =>  introEffect.classList.add('opacity'), 1000);
    setTimeout( () =>  introEffect.classList.add('none'), 1500);
  }
      

}


