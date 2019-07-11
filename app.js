"use strict";

function main() {
  var ENTRY_POINT = "/";
  var layoutInstance = null;
  var navbarInstance = null;
  var rootElement = document.querySelector("#root");
  var navState = false;
  var links = [
    { name: "Home", url: "/" },
    { name: "All", url: "/series" }
    //si da tiempo haremos un menu que obtenga los genres de las series para filtrar por generos
  ];

  generateLayout();
  generateNavbar();
  addListenersToNavbar();
  addListenersToBurguerMenu();
  activateRouter();

  function generateLayout() {
    layoutInstance = new Layout(rootElement);
    layoutInstance.generate();
  }

  function generateNavbar() {
    navbarInstance = new Navbar(layoutInstance.header, links);
    navbarInstance.generate();
  }

  function activateRouter() {
    routerInstance.buildDom(ENTRY_POINT, layoutInstance.main);
  }

  function addListenersToNavbar() {
    var anchors = document.querySelectorAll("nav a");
    anchors.forEach(function(anchor) {
      anchor.addEventListener("click", changePage);
    });
  }
  function changePage(event) {
    var url = event.target.attributes.url.value;
    routerInstance.buildDom(url, layoutInstance.main);
  }

  function addListenersToBurguerMenu() {
    var burguerMenu = document.querySelector('.burguer-menu');
    var menuOptions = document.querySelector('.button-All');
    var backHome = document.querySelector('.button-Home');
    var nav = document.querySelector('#site-header nav');
    var ul = document.querySelector('#site-header nav ul')
    burguerMenu.addEventListener('click', showNavbar);
    menuOptions.addEventListener('click', showNavbar);
    backHome.addEventListener('click', showNavbar);

    function showNavbar() {
      nav.classList.add('move-in-out');
      ul.classList.toggle('show-hide');
      if(navState === false){
        nav.classList.toggle('move-in-out');
        // nav.classList.remove('move-out');
        // ul.classList.add('show');
        // ul.classList.remove('hide');
        // navState = true;
      } else {
        ul.classList.add('hide');
        // setTimeout( function(){
        //   nav.classList.add('move-out');
        //   ul.classList.remove('show');
        //   nav.classList.remove('move-in');
        // },300);
        navState = false;
      }
    }
  }
}
window.addEventListener("load", main);
