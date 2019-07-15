'use strict';

class Navbar {
  constructor(parentElement, links){
    this.parentElement = parentElement;
    this.links = links;
    this.elements = null;
  }

  generate(){
    this.elements = `<section class="header-info">
                    <div class="logo">
                      <img src="./images/logo-white.png" alt="logo"/>
                    </div>
                    <div class="burguer-menu">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </section>
                  <nav>
                    <ul class="nav-links">`; 
    this.links.forEach( (link) => {
      this.elements += `
        <li>
          <a class="button-${link.name}" href="#0" url=${link.url}>${link.name}</a>
        </li>`
    });
    this.elements += `</ul>
                    </nav>`;
    this.render();
  }

  render(){
    this.parentElement.innerHTML = this.elements;
  }

}

