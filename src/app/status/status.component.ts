import { Component, OnInit, Input } from '@angular/core';
import { LogicService } from '../logic.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  @Input()  state: number = 0

  constructor(private logicService: LogicService) { }

  reset(): void {
    this.logicService.reset();
    this.state = 0;
  }

  ngOnInit(): void {
  }

}
