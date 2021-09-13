import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Game } from './game';
import { share, switchMap, takeUntil } from 'rxjs/operators';
import { Subject, timer } from 'rxjs';
import { waitForAsync } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class LogicService {
  
  private gameUrl: string = 'http://localhost:8080/games';
  private pollingData: any;
  private stopPolling = new Subject();

  game: Game | undefined;
  multiplayer: boolean = false;

  reset(): void {
    waitForAsync(this.stopPolling.next);
    this.http.post<Game>(this.gameUrl, '').subscribe(game => this.game = game);
    this.pollingData = timer(1000, 1000).pipe(
      switchMap(() => this.http.get<Game>(this.gameUrl + "/" + this.game?.id)),
      share(),
      takeUntil(this.stopPolling)
    ).subscribe(game => this.game = game)
  }
  
  select(ring: number, field: number): void {
    if (this.game != undefined) {
      this.http.post<Game>(this.gameUrl + "/" + this.game.id + "/play/" + ring +'/' + field, '').subscribe(game => this.game = game);
      if(!this.multiplayer) {
        this.http.post<Game>(this.gameUrl + "/" + this.game.id + "/play", '').subscribe(game => this.game = game);
      }
    }
  }

  connect(id: number): void {
    waitForAsync(this.stopPolling.next);
    this.http.get<Game>(this.gameUrl + "/" + id).subscribe(game => this.game = game);
    this.pollingData = timer(1000, 1000).pipe(
      switchMap(() => this.http.get<Game>(this.gameUrl + "/" + this.game?.id)),
      share(),
      takeUntil(this.stopPolling)
    ).subscribe(game => this.game = game)
  }

  checkEnd(): number {
    if (this.game != undefined) {
      switch (this.game.state) {
        case "P1WIN": return 1;
        case "P2WIN": return 2;
        case "DRAW": return 3;
        default: return 0;
      }
    }
    return 0;
  }

  constructor(
    private http: HttpClient
  ) { }
}
