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
  }

  getTurnCount(): number {
    if (this.logicService.game) {
      return Math.round(this.logicService.game.turn / 2 + 0.5)
    }
    return 0
  }

}
