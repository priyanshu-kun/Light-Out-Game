import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

  static defaultProps = {
    ncols: 5,
    nrows: 5,
    chanceLightStartOn: 0.25
  }


  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values

    for (let i = 0; i < this.props.nrows; i++) {
      let row = [];
      for (let j = 0; j < this.props.ncols; j++) {

        row.push(Math.random() < this.props.chanceLightStartOn);
      }
      board.push(row);
    }
    console.log(board)
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);

    // win when every cell is turned off
    // TODO: determine is the game has been won

    let hasWon = this.state.board.every(row => row.every(col => !col));

    this.setState({ board, hasWon });
  }

  makeTable() {

    let gameBoard = [];
    for (let i = 0; i < this.props.nrows; i++) {
      let row = [];
      for (let j = 0; j < this.props.ncols; j++) {
        let coord = `${i}-${j}`;
        row.push(<Cell key={coord} isLit={this.state.board[i][j]} flipCellsAround={() => this.flipCellsAround(coord)} />)
      }
      gameBoard.push(<tr key={i}>{row}</tr>)
    }

    return (
      <div>
        <div className="Board-title">
          <span className="neon-orange">Lights</span>
          <span className="flux">Out</span>
        </div>
        <table className="Board">
          <tbody>
            {gameBoard}
          </tbody>
        </table>
      </div>
    )
  }


  /** Render game board or winning message. */

  render() {
    // if the game is won, just show a winning msg & render nothing else
    return (
      this.state.hasWon
        ?
        <div className="Board-title">
          <div className="winner">
            <span className="neon-orange">YOU</span>
            <span className="flux">WIN!</span>
          </div>
        </div>
        :
        <div>
          {this.makeTable()}
        </div>
    )
  }
}


export default Board;

