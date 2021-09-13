import { Component, OnInit } from '@angular/core';
import { LogicService } from '../logic.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(public logicService: LogicService) { }

  ngOnInit(): void {
    this.logicService.reset()
  }

  select(ring: number, field: number): void {
    this.logicService.select(ring, field);
    console.log(this.logicService.game)
  }

}
