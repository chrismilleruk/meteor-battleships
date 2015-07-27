// App component - represents the whole app
App = React.createClass({
  getShips() {
    return [
      { _id: 1, x: 3, y: 2, pos: "C2", direction: "H", length: 3 },
      { _id: 2, x: 2, y: 2, pos: "B2", direction: "V", length: 3 },
      { _id: 3, x: 4, y: 6, pos: "D6", direction: "H", length: 2 }
    ]
  },

  hitTest(x, y, w = 1, h = 1) {
    let testPos = { left:x, top:y, right:(x+w-1), bottom:(y+h-1) };
    let ships = this.getShips().filter((ship) => {
      let shipPos = {
        left:ship.x,
        top:ship.y,
        w: (ship.direction === "H") ? ship.length : 1,
        h: (ship.direction === "V") ? ship.length : 1,
      };


    });
  },

  getShipAtPos(row, col) {
    let ships = this.getShips().filter((ship) => {
      if (ship.direction === "H" && ship.y === row) {
        if (col >= ship.x && col < ship.x+ship.length) {
          return true;
        }
      }
      if (ship.direction === "V" && ship.x === col) {
        if (row >= ship.y && row < ship.y+ship.length) {
          return true;
        }
      }
      return false;
    });

    if (ships.length > 1) {
      return { _id:"X", x: col, y: row, direction: "X"}
    }

    return ships[0]; // could be undefined.
  },

  renderShips() {
    return this.getShips().map((ship) => {
      return <Ship key={ship._id} ship={ship} />
    })
  },

  renderBoard() {
    let w = 8, h = 8;
    let xAxis = [1,2,3,4,5,6,7,8], yAxis = [1,2,3,4,5,6,7,8];
    let instance = this;
    let getShip = (x, y) => {
      instance.hitTest(x,y);
      let ships = instance.getShips().filter((ship) => {
        return ship.x == x && ship.y == y;
      });
      return ships[0];
    };

    return yAxis.map((y) => {
      return <tr>{xAxis.map((x) => {
        let key = x + ':' + y;
        let ship = getShip(x, y);
        if (!! ship) {
          if (ship.x === x && ship.y === y) {
            return <td className="ship">{ship._id}</td>
          } else {
            return <td>xxx</td>;
          }
        }
        let cellClass = (x + y) % 2 === 0 ? "alt" : "";
        return <td className={cellClass}>&nbsp;</td>;
      })}</tr>;
    });
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
        <table className="battle-arena">
          {this.renderBoard()}
        </table>
      </div>
    );
  }
});