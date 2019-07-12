'use strict';

function Router() {
  this.page = null;
}

Router.prototype.buildDom = function(url, parentElement, id, links) {
  if(url === '/'){
    this.generateIntroPage(parentElement, links);
  } else if( url === '/series'){
    this.generateGalleriesPage(parentElement);
  } else if(id){
    this.generateSeriePage(parentElement, id);
  }
} 

Router.prototype.generateIntroPage = function(parentElement, links) {
  this.page = new IntroPage(parentElement, links);
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