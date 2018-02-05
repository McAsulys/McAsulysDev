import React from 'react';
import ReactDOM from 'react-dom';

let idx = 0;

class Root extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      minScore : 0,
      persons : [
          {
              id: idx++,
              name: "Jane",
              surname: "Smith",
              score: 250,
              avatar: 'imgs/avatar2.png'
          },
          {
              id: idx++,
              name: "John",
              surname: "Dow",
              score: 1780,
              avatar: 'imgs/avatar1.png'
          },
          {
              id: idx++,
              name: "Betty",
              surname: "O'Brian",
              score: 2120,
              avatar: 'imgs/avatar3.png'
          }
      ]
    };
    this.delete=this.delete.bind(this); //ça permet de modifier la methode pour fixer l'objet courant
  }
  render() {
    let tab = this.state.persons
      .filter(p => p.score > this.state.minScore)
      .map(p => <Card key={p.id} person={p} delete={this.delete}/>);
    return(  <div>
              {tab}
              <input type="number" id="score" onChange={(e) => this.updateScore()}/>
            </div>
          );
  }

  updateScore(){
    const v = document.getElementById("score").value;
    const min = /^\+?(0|[1-9]\d*)$/.test(v) ? parseInt(v) : 0;
    this.setState({minScore: min});
    console.log(min);
  }

  delete(id){
    let tab = this.state.persons.filter(p => p.id != id);
    this.setState({persons: tab});
  }
}

class Card extends React.Component {

  render() {
    console.log(this.props);
    let rank = "";
    if(this.props.person.score > 0)
      rank = "gray";
    if(this.props.person.score > 1000)
      rank = "green";
    if(this.props.person.score > 2000)
      rank = "blue";
    return (
      <div className="card">
        <div className="top">
          <div>
            <img src={this.props.person.avatar}></img>
          </div>
          <div>
            <h2>Name : {this.props.person.name}</h2>
            <h2>Surname : {this.props.person.surname}</h2>
          </div>
          <span className="delete" onClick={(e) => this.props.delete(this.props.person.id)}>&times;</span>
        </div>
        <div className={rank+" score"}>
          <h1>{this.props.person.score}</h1>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<Root/>, document.getElementById('root'));
