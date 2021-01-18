import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Track } from '../entities/track';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private trackSelected = new BehaviorSubject<Track>(null);

  constructor() { }

  loadTrack(track: Track){
    this.trackSelected.next(track)
  }

  getTrack(): Observable<Track> {
    return this.trackSelected.asObservable();
  }

}
