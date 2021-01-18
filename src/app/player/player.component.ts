import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs/operators';
import { Track } from '../model/entities/track';
import { DeezerService } from '../model/services/deezer.service';
import { SharedService } from '../model/services/shared.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  cols = {
    info: 4,
    play: 3,
    volume: 4,
  }
  icon_volume: string = 'volume_up';

  isPlaying: boolean = false;
  isMute: boolean = false;
  track: Track;
  volume: number = 0.5;
  audio = new Audio();
  
  constructor(private sharedService: SharedService, private deezerService: DeezerService) { }

  ngOnInit() {
    this.sharedService.getTrack().subscribe(
      track => {
        this.track = track
        
        if(this.track != null){
          this.audio.src = this.track.preview;
          this.audio.load();
          this.audio.volume = this.volume;
          this.audio.play();
          this.isPlaying = true;       
        }
        else{
          this.getTrack(1109731)
        }
      }
    )
    this.changeCols(window.innerWidth)
  }
  
  onResize(event) {
    this.changeCols(event.target.innerWidth)
  }

  changeCols(width) {
    
    if(width <= 420){
      this.cols.info = 0
      this.cols.play = 11
      this.cols.volume = 0
    }else if(width <= 700){
      this.cols.info = 5
      this.cols.play = 6
      this.cols.volume = 0
    }else{
      this.cols.info = 4
      this.cols.play = 3
      this.cols.volume = 4
    }
  }

  getTrack(id: number) {
    this.deezerService.getTrack(id).subscribe(
      data => this.track = data
    )
  }

  mute() {
    this.audio.muted = !this.isMute
    this.isMute = !this.isMute
  }

  setVolume(event: any){
    let volume = event.target.value / 100
    if(volume > .4){
      this.icon_volume = 'volume_up'
    }
    else if (volume > 0){
      this.icon_volume = 'volume_down'
    }
    else {
      this.icon_volume = 'volume_mute'
    }
    this.audio.volume = volume
  }

  play(){
    this.isPlaying? this.audio.pause() : this.audio.play()    
    this.isPlaying = !this.isPlaying
  }

}
