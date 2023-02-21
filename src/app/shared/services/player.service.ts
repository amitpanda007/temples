import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PlayerService {
  public volumeConfigChanged = new BehaviorSubject<boolean>(true);

  constructor() {}
}
