import { Component, OnInit } from '@angular/core';
import { LogicService } from '../logic.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  fields: number[] = Array.from(Array(9).keys());

  constructor(public logicService: LogicService) { }

  ngOnInit(): void {
    this.logicService.reset()
  }

  select(field: number): void {
    this.logicService.select(field);
    console.log(this.logicService.game)
  }

}
