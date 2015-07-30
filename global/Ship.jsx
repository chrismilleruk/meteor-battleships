// Ship component - represents a single battleship item
Ship = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    ship: React.PropTypes.object.isRequired
  },

  directionClick(event) {
    console.log(arguments);
  },

  lengthClick(event) {
    console.log(arguments);
    
  },

  render() {
    return (
      <li>
        <span><label>Position:</label>{this.props.ship.pos}</span>
        &nbsp;
        <span onClick={this.directionClick}><label>Direction:</label>{this.props.ship.direction}</span>
        &nbsp;
        <span onClick={this.lengthClick}><label>Length:</label>{this.props.ship.length}</span>
      </li>
    );
  }
});
