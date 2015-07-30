
BattleBoard2 = React.createClass({
  propTypes: {
    ships: React.PropTypes.array.isRequired
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

    return ships;
  },

  isOverlapping(ship) {
    let ships = ship.direction === "H" ?
      this.hitTest(ship.x, ship.y, ship.length, 1):
      this.hitTest(ship.x, ship.y, 1, ship.length);
    return (ships.length > 1);
  },

  renderShips() {
    return this.props.ships.map(this.renderShip);
  },

  renderShip(ship) {
    let location = {
      top: 3 + (42 * ship.y),
      left: 3 + (42 * ship.x)
    };
    let size = {
      width:42 * ship.length - 2,
      height:40,
    };
    let orientation = {
      transformOrigin: "20px 20px"
    };
    if (ship.direction==="V") {
      orientation.transform = "rotate(90deg)";
    }
    let divStyle = {
      position:'absolute',
      backgroundColor:'gray',
      ...location,
      ...size,
      ...orientation
    };
    if (this.isOverlapping(ship)) {
      divStyle.backgroundColor = "red";
      divStyle.opacity = 0.5;
    }
    return <div className="ship"
      style={divStyle}></div>
  },

  renderBoard() {
    let w = 8, h = 8;
    let xAxis = [1,2,3,4,5,6,7,8], yAxis = [1,2,3,4,5,6,7,8];
    let getShip = (x, y) => {
      return this.hitTest(x,y);
    }.bind(this);

    return yAxis.map((y) => {
      return (
        <tr>
          {xAxis.map((x) => {
            // let ship = getShip(x, y);
            // if (!! ship) {
            //   // If this isn't the top/left cell then don't render anything
            //   // since this cell will be rendered by the colSpan/rowSpan.
            //   if (ship.x !== x || ship.y !== y) {
            //     return '';
            //   }
            //
            //   let cellProps = {
            //     className: "ship"
            //   };
            //
            //   if (ship.direction === "H") {
            //     cellProps.colSpan = ship.length;
            //   } else {
            //     cellProps.rowSpan = ship.length;
            //   }
            //
            //   // Render a ship which spans several cells.
            //   return <td {...cellProps}>{ship._id}</td>;
            // }

            // Render a standard water cell with alternating colours.
            let cellClass = (x + y) % 2 === 0 ? "alt" : "";
            return <td className={cellClass}>&nbsp;</td>;
          })}
      </tr>
      );
    });
  },

  render() {
    let divStyle = {
      position: 'relative'
    };
    return (
      <div style={divStyle}>
        {this.renderShips()}
        <table className="battle-arena">
          {this.renderBoard()}
        </table>
      </div>
    );
  }
});
