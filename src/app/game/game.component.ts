import { Component, OnInit } from '@angular/core';
import { LogicService } from '../logic.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  state: number = 0
  fields: number[] = Array.from(Array(9).keys());

  constructor(public logicService: LogicService) { }

  ngOnInit(): void {}

  select(field: number): void {
    this.logicService.select(field);
    this.state = this.logicService.checkEnd()
    console.log(this.logicService.board)
  }

}
