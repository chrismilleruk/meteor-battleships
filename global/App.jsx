// App component - represents the whole app
App = React.createClass({
  getShips() {
    return [
      { _id: 1, x: 3, y: 2, pos: "C2", direction: "H", length: 3 },
      { _id: 2, x: 2, y: 2, pos: "B2", direction: "V", length: 3 },
      { _id: 3, x: 4, y: 6, pos: "D6", direction: "H", length: 2 }
    ]
  },

  renderShips() {
    return this.getShips().map((ship) => {
      return <Ship key={ship._id} ship={ship} />
    })
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Battleships</h1>
        </header>
        <ul>
          {this.renderShips()}
        </ul>
        <BattleBoard ships={this.getShips()} />
      </div>
    );
  }
});
