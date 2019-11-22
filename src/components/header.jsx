import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <>
        <section id="hero-image">
          <div id="collection-header">
            <div id="title">
              <h1>{this.props.title}</h1>
            </div>
            <div id="publisher">
              <h4>{this.props.publisher}</h4>
            </div>
          </div>
        </section>
        <section id="description">{this.props.description}</section>
      </>
    );
  }
}

export default Header;
