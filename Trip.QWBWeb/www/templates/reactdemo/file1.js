var HelloMessage = React.createClass({
    render: function () {
        return React.createElement("h1", null, "Hello World！");
    }
});
ReactDOM.render(React.createElement(HelloMessage, null), document.getElementById('example'));
