'use strict';

class IntroPage{
  constructor(parentElement, links, url) {
    this.parentElement = parentElement;
    this.elements = null;
    this.series = null;
    this.images = [];
    this.imageUrl = null;
    this.state = false;
    this.links = links;
    this.url = url;
    this.slider = null;
  }

  async generate() {
    this.loading = new Loading(this.parentElement);
    this.loading.generate();

    await this.connectToAPI();
    this.getAllImg();
    
    const self = this;
  
    const randomImg = self => {
      self.slider = setInterval( () => {
        let randomImgNumber = Math.floor(Math.random() * self.images.length-1 );
        const image = document.querySelector('.img-intro');
        image.attributes.src.value = self.images[randomImgNumber];
      },6000);
    } 

    this.elements = `
      <section class="site-intro">
        <header>
          <section class="show-logo">
            <img class="text-logo" src="./images/text-logo-black.svg">
          </section>
          <a class="button-intro" href="#0" url="${this.links[1].url}">Start</a>
        </header>
        <div class="img-intro-container">
          <img class="img-intro" src="#" />
        </div>
      </section>
    `;
    this.render();
    let randomImgNumber = Math.floor(Math.random() * self.images.length-1 );
    const image = document.querySelector('.img-intro');
    image.attributes.src.value = self.images[randomImgNumber];
    randomImg(self);
  }

  render() {
    this.parentElement.innerHTML = this.elements;
    this.anchor = document.querySelector('.button-intro');
    const self = this;
    this.anchor.addEventListener('click', event => {
      clearInterval(self.slider);
      routerInstance.buildDom( event.target.attributes.url.value, self.parentElement )
    })
  }
  
  async connectToAPI() {
    this.series = await seriesServiceInstance.getAllSeries();
  }
  
  getAllImg() {
    this.series.forEach( serie => {
      const newURL = serie.image.original.split('');
      newURL.splice(4,0,"s")
      const newString = newURL.join('');
      this.images.push(newString);
    });
  }
          
}




