'use strict';

function IntroPage(parentElement) {
  this.parentElement = parentElement;
  this.elements = null;
  this.series = null;
  this.images = [];
  this.imageUrl = null;
}

IntroPage.prototype.generate = async function() {
  this.loading = new Loading(this.parentElement);
  this.loading.generate();
  await this.connectToAPI();
  //console.log(this.series);
  // this.getAllImg();

  var self = this;
  this.series.forEach( (serie) => {
    this.images.push(serie.image.original);
    //var randomNumber = 
  });

  function randomImg(self) {
    setInterval(function(){
      //backgroundImg(self);
      var randomImg = Math.floor(Math.random() * self.images.length-1 );
      var image = document.querySelector('.img-intro-1');
      image.attributes.src.value = self.images[randomImg];
      var img = document.querySelector('.img-intro-1');
      img.classList.add('fade-effect');
    },6000);
  }
  


  this.elements = `
    <section class="site-intro">
      <header>
        <div class="blur"></div>
        <h1>Super Cool Star Wars web site</h1>
        <h2>Here you can find the info you are looking for</h2>
      </header>
      <div class="img-intro-container">
        <img class="img-intro-1" src="#" />
        <!--<img class="img-intro-2" src="#" />-->
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





// IntroPage.prototype.getAllImg = () => {
//   this.series.forEach( (serie) => {
//     this.images.push(serie.image.original);
//   });
//   console.log(this.images);
// }



