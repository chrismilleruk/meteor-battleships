// Ship component - represents a single battleship item
Ship = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    ship: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <li>
        <span><label>Position:</label>{this.props.ship.pos}</span>
        <span><label>Direction:</label>{this.props.ship.direction}</span>
        <span><label>Length:</label>{this.props.ship.length}</span>
      </li>
    );
  }
});
