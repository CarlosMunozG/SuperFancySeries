'use strict';

function IntroPage(parentElement) {
  this.parentElement = parentElement;
  this.elements = null;
}

IntroPage.prototype.generate = function() {
  this.elements = `
    <header>
      <h1>Super Cool Star Wars web site</h1>
      <h2>Here you can find the info you are looking for</h2>
    </header>
  `;
  this.render();
}

IntroPage.prototype.render = function() {
  this.parentElement.innerHTML = this.elements;
}