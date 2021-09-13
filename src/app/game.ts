export interface Game {
  board : string[][];
  currentPlayer : string;
  id : number;
  state : string;
  turn : number;
}