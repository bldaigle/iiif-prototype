import React from "react";
import "./App.css";
import Header from "./components/header.jsx";
import Items from "./components/items.jsx";

// Set the collection manifest we want to start with
const collectionManifest =
  "https://cdm15963.contentdm.oclc.org/iiif/info/p15963coll34/manifest.json";

// Set the publisher (or library) manually since there doesn't seem to be an identifier in the manifest
const collectionPublisher = "Oberlin College Libraries";

// Set the collection description manually since it also does not appear in the manifests
const collectionDescription =
  "The majority of the items featured here represent a small portion of the visual materials (paintings, drawings, prints; photographs and tintypes; correspondence; posters, playbills, and other ephemera) from the Frederick R. Selch Collection of American Music History. Like the more than 6,000 books and 700 instruments that comprise the principle portion of the Selch Collection, these images date from the early 16th through the late 20th centuries. They depict the history, design and use of musical instruments and all manner of musical performance. Also included here are a small number of bound volumes of flute and piano scores from the collection. For research and educational use only. For all other uses please contact Oberlin Conservatory Library Special Collections: con.special@oberlin.edu";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      publisher: "",
      description: collectionDescription,
      results: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  // Call the CONTENTdm IIIF API for collection-level metadata
  fetchData = () => {
    fetch(collectionManifest)
      .then(response => response.json())
      .then(data => {
        this.setState({
          // Set the collection title, publisher, and description in state. Ideally, these would all be dynamic, but only the title is present in the API response
          title: `${data.label}`,
          publisher: collectionPublisher,
          description: collectionDescription
        });
        return data.manifests.slice(0, 100).map(manifest => {
          return fetch(manifest["@id"])
            .then(response => response.json())
            .then(data);
        });
      })
      .then(itemManifestCalls => Promise.all(itemManifestCalls))
      .then(itemManifests => {
        let items = itemManifests.map(item => ({
          title: `${item.label}`,
          metadata: item.metadata,
          imageThumbnail:
            item.sequences[0].canvases[0].images[0].resource.service["@id"] +
            "/full/350,/0/default.jpg",
          imageMedium:
            item.sequences[0].canvases[0].images[0].resource.service["@id"] +
            "/full/1000,/0/default.jpg",
          imageFullSize: item.sequences[0].canvases[0].images[0].resource["@id"]
        }));
        this.setState({
          results: [...this.state.results, ...items]
        });
      })
      .catch(error => console.log("Failed to get data from the API", error));
  };

  render() {
    const { title, publisher, description, results } = this.state;
    return (
      <>
        <div id="header">
          <Header
            title={title}
            publisher={publisher}
            description={description}
          />
        </div>
        <div id="main">
          <Items results={results} />
        </div>
        <div id="footer"></div>
      </>
    );
  }
}

export default App;
