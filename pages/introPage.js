'use strict';

function IntroPage(parentElement, links) {
  this.parentElement = parentElement;
  this.elements = null;
  this.series = null;
  this.images = [];
  this.imageUrl = null;
  this.state = false;
  this.links = links;
}

IntroPage.prototype.generate = async function() {
  this.loading = new Loading(this.parentElement);
  this.loading.generate();
  await this.connectToAPI();
  this.getAllImg();
   
  var self = this;

  var slider = null;
  // if(this.state === false){
    function randomImg(self) {
      slider = setInterval(function( ){
        var randomImg = Math.floor(Math.random() * self.images.length-1 );
        var image = document.querySelector('.img-intro');
        image.attributes.src.value = self.images[randomImg];
        //var img = document.querySelector('.img-intro');
        //img.classList.add('fade-effect');
      },6000);
    } 
  //   }
  // } else if( this.state === true){
  //   clearInterval(slider);
  // }
  
  this.elements = `
    <section class="site-intro">
      <header>
        <!--<div class="blur"></div>-->
        <h1 class="title">Super Fancy Series</h1>
        <a class="button-intro" href="${this.links[1].url}">Start</<a>
      </header>
      <div class="img-intro-container">
        <img class="img-intro" src="#" />
      </div>
    </section>
  `;
  this.render();
  randomImg(self);
}

IntroPage.prototype.render = function() {
  this.parentElement.innerHTML = this.elements;
}

IntroPage.prototype.connectToAPI = async function() {
  this.series = await seriesServiceInstance.getAllSeries();
}

IntroPage.prototype.getAllImg = function() {
  this.series.forEach( (serie) => {
    var newURL = serie.image.original.split('');
    newURL.splice(4,0,"s")
    var newString = newURL.join('');
    this.images.push(newString);
  });
}




