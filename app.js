"use strict";

function main() {
  var ENTRY_POINT = "/";
  var layoutInstance = null;
  var navbarInstance = null;
  var rootElement = document.querySelector("#root");
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
    var burguerMenu = document.querySelector(".burguer-menu");
    var menuOptions = document.querySelector(".button-All");
    var nav = document.querySelector("#site-header nav");
    var mainTitle = document.querySelector('.pageTitle');
    var mainTitleBackground = document.querySelector('#site-main header');
    burguerMenu.addEventListener("click", showNavbar);
    menuOptions.addEventListener("click", showNavbar);

    function showNavbar() {
      nav.classList.toggle("display-flex");
    }
    // function goToAllSeries() {
    //   nav.classList.toggle("display-flex");
    //   mainTitle.classList.add('dark');
    //   mainTitleBackground.classList.add('dark');
    // }
  }
}
window.addEventListener("load", main);
