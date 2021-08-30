import { Component, h } from '@stencil/core';
export class SfCardTitle {
  render() {
    return (h("h2", { class: "sf-card-title" },
      h("slot", null)));
  }
  static get is() { return "sf-card-title"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["sf-card-title.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["sf-card-title.css"]
  }; }
}
