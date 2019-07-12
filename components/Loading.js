'use strict';

function Loading(parentElement) {
  this.parentElement = parentElement;
  this.elements = null;
  this.container = null;
}

Loading.prototype.generate = function() {
  this.elements = `<section id="container">
                    <div>
                      <img src="./images/borders-logo.svg">
                    </div>
                  </section>`;
  this.render();
}

Loading.prototype.render = function() {
  this.parentElement.innerHTML = this.elements;
}

