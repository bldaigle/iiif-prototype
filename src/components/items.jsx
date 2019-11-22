import React, { Component } from "react";

class Items extends Component {
  state = {};
  render() {
    const items = this.props.results.map(item => (
      <figure key={item.imageThumbnail}>
        <div className="imageResult">
          <img src={item.imageThumbnail} alt="" />
        </div>
        <figcaption>
          <h4>{item.title}</h4>
          <p>{item.metadata[0][0]}</p>
        </figcaption>
      </figure>
    ));
    return (
      <section id="results">
        <div id="figures">{items}</div>
      </section>
    );
  }
}

export default Items;
