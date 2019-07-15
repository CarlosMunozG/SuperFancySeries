'use strict';

class Router{
  constructor(){
    this.page = {};
  }

  buildDom(url, parentElement, id, links) {
    if(this.page.slider) {
      clearInterval(this.page.slider)
    }
    if(url === '/'){
      this.generateIntroPage(parentElement, links, url);
    } else if( url === '/series'){
      this.generateGalleriesPage(parentElement);
    } else if(id){
      this.generateSeriePage(parentElement, id);
    }
  } 
  
  generateIntroPage(parentElement, links, url) {
    this.page = new IntroPage(parentElement, links, url);
    this.page.generate();
  }
  
  generateGalleriesPage(parentElement) {
    this.page = new GalleriesPage(parentElement);
    this.page.generate();
  }
  
  generateSeriePage(parentElement, id) {
    this.page = new SeriePage(parentElement, id);
    this.page.generate();
  }
}
const routerInstance = new Router();  

