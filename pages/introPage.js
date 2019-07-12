'use strict';

function IntroPage(parentElement) {
  this.parentElement = parentElement;
  this.elements = null;
  this.series = null;
  this.images = [];
  this.imageUrl = null;
  this.state = false;

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
        <div class="blur"></div>
        <h1>Super Cool Star Wars web site</h1>
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
  // var newString = [];
  this.series.forEach( (serie) => {
    // newString.push(serie.image.original);
    this.images.push(serie.image.original);
  });
  // var newURL = newString.split('');
  // console.log(newURL);
  // newURL.splice(4,0,"s")
  // this.images = newURL.join('');
}




