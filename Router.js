'use strict';

function Router() {
  this.page = null;
}

Router.prototype.buildDom = function(url, parentElement, id) {
  if(url === '/'){
    this.generateIntroPage(parentElement);
  } else if( url === '/series'){
    this.generateGalleriesPage(parentElement);
  } else if(id){
    this.generateSeriePage(parentElement, id);
  }
} 

Router.prototype.generateIntroPage = function(parentElement) {
  this.page = new IntroPage(parentElement);
  this.page.generate();
}

Router.prototype.generateGalleriesPage = function(parentElement) {
  this.page = new GalleriesPage(parentElement);
  this.page.generate();
}

Router.prototype.generateSeriePage = function(parentElement, id) {
  this.page = new SeriePage(parentElement, id);
  this.page.generate();
}

var routerInstance = new Router();