'use strict';

class Loading{
  constructor(parentElement){
    this.parentElement = parentElement;
    let elements = this.elements
    this.elements = null; 
  }

  generate() {
    this.elements = `<section id="container">
                      <div>
                        <img src="./images/borders-logo.svg">
                      </div>
                    </section>`;
    this.render();
  }
  render() {
    this.parentElement.innerHTML = this.elements;
  }

}
