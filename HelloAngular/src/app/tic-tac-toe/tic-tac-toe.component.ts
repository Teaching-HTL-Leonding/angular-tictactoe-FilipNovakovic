import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Player = 'X' | 'O';
type SquareValue = Player | ' ';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.css'
})


export class TicTacToeComponent {
  board: SquareValue[] = Array(9).fill(' ');
  currentPlayer: Player = 'X';
  winningLine: number[] | undefined = undefined;

  get winner(): SquareValue | undefined {
    return this.winningLine ? this.board[this.winningLine[0]] : undefined;
  }

  makeMove(index: number) {
    if (this.winner || this.board[index] !== ' ') return;

    this.board[index] = this.currentPlayer;
    this.winningLine = this.getWinner();

    if (!this.winningLine) {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  getWinner(): number[] | undefined {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    return lines.find(([a, b, c]) => this.board[a] !== ' ' && this.board[a] === this.board[b] && this.board[a] === this.board[c]);
  }

  resetGame() {
    this.board = Array(9).fill(' ');
    this.winningLine = undefined;
    this.currentPlayer = 'X';
  }
}
