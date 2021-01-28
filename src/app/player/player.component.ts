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
  index: number;
  playlist: Track[];
  track: Track;
  volume: number = 0.5;
  audio = new Audio();
  
  constructor(private sharedService: SharedService, private deezerService: DeezerService) { }

  ngOnInit() {
    this.sharedService.pop().subscribe(
      track => {
        if(track) {
          this.playlist.push(track)
        }
      }
    )
    this.sharedService.getTrack().subscribe(
      track => {
        this.playlist = new Array()
        this.index = 0

        this.track = track
        this.audio.volume = this.volume;
        
        if(this.track != null){
          this.playlist.push(track)
          this.loadAudio(this.track)  
        }
        else{
          this.deezerService.getTrack(1109731).subscribe(
            data => {
              this.playlist.push(data)

              this.track = data
              this.audio.src = this.track.preview;              
              this.audio.load();
            }
          )
        }
      }
    )
    this.changeCols(window.innerWidth)

    this.audio.onended = (ev) => {
      if(this.index >= this.playlist.length - 1){
        this.isPlaying = false
      }
      else {
        this.index++
        this.track = this.playlist[this.index]

        this.loadAudio(this.track)
      }
    }
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

  play() {
    this.isPlaying? this.audio.pause() : this.audio.play()    
    this.isPlaying = !this.isPlaying
  }

  back() {
    if(this.index > 0) {
      this.index--
      this.track = this.playlist[this.index]
      this.loadAudio(this.track)
    }
  }

  next() {
    if(this.index < this.playlist.length - 1) {
      this.index++
      this.track = this.playlist[this.index]
      this.loadAudio(this.track)
    }
  }

  loadAudio(track: Track) {
    this.audio.src = track.preview
    this.audio.load()
    this.audio.play()
    this.isPlaying = true 
  }
}
