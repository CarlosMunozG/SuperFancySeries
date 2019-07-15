"use strict";

const main = () => {
  const ENTRY_POINT = "/";
  let layoutInstance = null;
  let navbarInstance = null;
  const rootElement = document.querySelector("#root");
  let navState = false;
  const links = [
    { name: "Home", url: "/" },
    { name: "Series", url: "/series" }
  ];


  const generateLayout = () => {
    layoutInstance = new Layout(rootElement);
    layoutInstance.generate();
  }

  const generateNavbar = () => {
    navbarInstance = new Navbar(layoutInstance.header, links);
    navbarInstance.generate();
  }

  const activateRouter= () => routerInstance.buildDom(ENTRY_POINT, layoutInstance.main, null, links);
  

  const addListenersToNavbar= () => {
    const anchors = document.querySelectorAll("nav a");
    anchors.forEach( anchor => anchor.addEventListener("click", changePage) );
  }
  const changePage = event => {
    const url = event.target.attributes.url.value;
    routerInstance.buildDom(url, layoutInstance.main, null, links);
  }

  const addListenersToBurguerMenu = () => {
    const burguerMenu = document.querySelector('.burguer-menu');
    const menuOptions = document.querySelector('.button-Series');
    const backHome = document.querySelector('.button-Home');
    const nav = document.querySelector('#site-header nav');
    const ul = document.querySelector('#site-header nav ul');
    const body = document.querySelector("body");
    const main = document.querySelector("#site-main");

    const showNavbar = () => {
      body.style.background = '#111';
      main.style.background = '#111';
      if(navState === false){
        nav.classList.add('move-in-out');
        setTimeout( () => {
          ul.classList.add('show-hide');
        },300);
        navState = true;
      } else {
        ul.classList.remove('show-hide');
        setTimeout( () => {
          nav.classList.remove('move-in-out');
        },300);
        navState = false;
      }
    }
    
    burguerMenu.addEventListener('click', showNavbar);
    menuOptions.addEventListener('click', showNavbar);
    backHome.addEventListener('click', showNavbar);

  }
  generateLayout();
  generateNavbar();
  addListenersToNavbar();
  addListenersToBurguerMenu();
  activateRouter();

}
window.addEventListener("load", main);
