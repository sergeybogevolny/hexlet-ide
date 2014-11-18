/** @jsx React.DOM */

var React = require("react/addons");
var TerminalsActions = require('editor/actions/TerminalsActions');

var Terminal = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-md-12">
          <iframe className="terminal-frame" name="terminalFrame"/>
          <div ref="terminal"></div>
        </div>
      </div>
    );
  },

  terminalResize: function () {
    var terminal = this.props.terminal;
    terminal.terminal.fit();
  },

  shouldComponentUpdate: function() {
    return false;
  },

  componentDidMount: function() {
    var terminal = this.props.terminal;

    terminal.terminal.on("data", function(data) {
      TerminalsActions.startUpdateTerminal({
        id: terminal.id,
        data: data
      });
    });

    terminal.terminal.open(this.refs.terminal.getDOMNode());

    terminalFrame.onresize = function(){
      this.terminalResize();
    }.bind(this);
  }
});


module.exports = Terminal;
