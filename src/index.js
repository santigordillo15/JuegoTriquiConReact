import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//import reportWebVitals from './reportWebVitals';

class Square extends React.Component {
  render() {
    return (
      <button className="square" //recibiendo una funcion por props
      onClick={()=>this.props.onClick()}> 
        {this.props.value} 
      </button>
    );
  }
}

class Board extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state={
  //     squares: Array(9).fill(null), //creamos un array de 9 elementos
  //     NextIsX : true

  //   }
  // };

  // handleClick(i){
  //   const squaresNew = this.state.squares.slice(); //creamos un copia del array
  //   if (calculateWinner(squaresNew) || squaresNew[i]) {
  //     return;
  //   }
  //   squaresNew[i]=this.state.NextIsX ? "X":"O"; //modificamos el valor en la posicion (i)
  //   this.setState({squares:squaresNew}) ;//actualizamos state.squares
  //   this.setState({NextIsX:!this.state.NextIsX})
    
  // };
  renderSquare(i) {
    return (
    <Square value={this.props.squares[i]}
    onClick={()=>this.props.onClick(i)} //pasando funciones por medio de props
    />);
  }

  render() {
    
    return (
      <div>
        
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  
  constructor(props){
    super(props);
    this.state ={
      history : [{
        squares: Array(9).fill(null),
      }],
      NextIsX : true,
      stepNumber:0
      };
  };

  handleClick(i){
    const history  = this.state.history.slice(0,this.state.stepNumber+1);//slice(inicio, fin) fin no incluido
    const current = history[history.length - 1];
    const squaresNew = current.squares.slice(); //creamos un copia del array
    if (calculateWinner(squaresNew) || squaresNew[i]) {
      return;
    }
    squaresNew[i]=this.state.NextIsX ? "X":"O"; //modificamos el valor en la posicion (i)
    this.setState({
         history: history.concat({
           squares:squaresNew})
       });                 //usando spread operator {history: [...history, { squares:squaresNew } ]}
                      
    this.setState({NextIsX:!this.state.NextIsX});
    this.setState({stepNumber:history.length})
    
  };
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      NextIsX: (step % 2) === 0,
    });
  };


  render() {
    const history  = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;

    console.log(history)

    const moves = history.map((item,index) => {
      const descripcion = index ?
        'Go to move #' + index :
        'start Game';
      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{descripcion}</button>
        </li>
      );
    });
    
    if (winner) {
      status = 'Winner is: '+ winner;
    }else{
     status = 'Next player: '+ (this.state.NextIsX ? "X":"O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board  squares={current.squares}
          onClick={(i)=>this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{moves}</ol>
        </div>
      </div>
      
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

//funcion que calcula el ganador
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null; //return de la funcion
}
