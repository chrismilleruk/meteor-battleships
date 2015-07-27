
BattleBoard = React.createClass({
  propTypes: {
    ships: React.PropTypes.object.isRequired
  },

    hitTest(x, y, w = 1, h = 1) {
      let test = { left:x, top:y, right:(x+w-1), bottom:(y+h-1) };
      let ships = this.props.ships.filter((s) => {
        let ship = {
          left:s.x,
          top:s.y,
          right: (s.direction === "H") ? s.x+s.length-1 : s.x,
          bottom: (s.direction === "V") ? s.y+s.length-1 : s.y,
        };

        return test.right >= ship.left
          && test.left <= ship.right
          && test.bottom >= ship.top
          && test.top <= ship.bottom;
      });
      return ships[0];
    },

    getShipAtPos(row, col) {
      let ships = this.props.ships.filter((ship) => {
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

    renderBoard() {
      let w = 8, h = 8;
      let xAxis = [1,2,3,4,5,6,7,8], yAxis = [1,2,3,4,5,6,7,8];
      let instance = this;
      let getShip = (x, y) => {
        return instance.hitTest(x,y);
        // let ships = instance.getShips().filter((ship) => {
        //   return ship.x == x && ship.y == y;
        // });
        // return ships[0];
      };

      return yAxis.map((y) => {
        return <tr>{xAxis.map((x) => {
          let key = x + ':' + y;
          let ship = getShip(x, y);
          if (!! ship) {
            if (ship.x === x && ship.y === y) {
              if (ship.direction === "H") {
                return <td className="ship" colSpan={ship.length}>{ship._id}</td>
              } else {
                return <td className="ship" rowSpan={ship.length}>{ship._id}</td>
              }
            } else {
              return '';
            }
          }
          let cellClass = (x + y) % 2 === 0 ? "alt" : "";
          return <td className={cellClass}>&nbsp;</td>;
        })}</tr>;
      });
    },

    render() {
      return (
        <table className="battle-arena">
          {this.renderBoard()}
        </table>
      );
    }
});
