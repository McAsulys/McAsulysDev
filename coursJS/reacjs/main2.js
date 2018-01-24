let quote = {
  text: "Le monde sera mon esclave",
  auteur : "Topaz",
}
class Container extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div>
        <p>{this.props.quote.text}</p>
        <p>{this.props.quote.auteur}</p>
      </div>
    );
  }
}

class Tableau extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    let t = [];
    for (let i = 0; i < this.props.nbLignes; i++) {
      t.push(<Ligne num={i} />);
    }
    return (
      <div>
        <h1>tab</h1>
        {t}
      </div>
    );
  }
}

class Ligne extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <p>Mon numero est {this.props.num}</p>
    );
  }
}

ReactDOM.render(<Container quote={quote}/>, document.getElementById('root'));
