import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogicService {
  board: number[] = new Array(9).fill(0);
  curPlayer: number = 1;
  multiplayer: boolean = false;

  reset(): void {
    this.board.fill(0);
    this.curPlayer = 1;
  }

  switchPlayer(): void {
    if (this.curPlayer == 1){this.curPlayer = 2}
    else {this.curPlayer = 1}
  }

  aiPlay(player: number): void {
    var aiDone = false;
    while (!aiDone && (this.checkEnd() == 0)) {
      var aiField = Math.floor((Math.random()* 10));
      if (this.board[aiField] == 0) {
        this.board[aiField] = player;
        aiDone = true;
      }
    }
  }
  
  select(field: number): void {
    if (this.board[field] == 0 && (this.checkEnd() == 0)){
      this.board[field] = this.curPlayer;
      this.switchPlayer();
      if(!this.multiplayer) {
        this.aiPlay(this.curPlayer);
        this.switchPlayer();
      }
    }
  }

  checkEnd(): number {
    //horizontal
    for (let i of [0,3,6]) {
      if ((this.board[i] != 0) && (this.board[i] == this.board[i+1]) && (this.board[i] == this.board[i+2])) { return this.board[i]; }
    }
    //vertical
    for (let i of [0,1,2]) {
      if ((this.board[i] != 0) && (this.board[i] == this.board[i+3]) && (this.board[i] == this.board[i+6])) { return this.board[i]; }
    }
    //diagonal
    if ((this.board[0] != 0) && (this.board[0] == this.board[4]) && (this.board[0] == this.board[8])) { return this.board[0]; }
    if ((this.board[2] != 0) && (this.board[2] == this.board[4]) && (this.board[2] == this.board[6])) { return this.board[2]; }
    if (!this.board.includes(0)) { return 3; }
    return 0;
  }

  constructor() { }
}
