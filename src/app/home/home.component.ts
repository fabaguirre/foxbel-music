import { Component, OnInit } from '@angular/core';
import { Track } from '../model/entities/track';
import { DeezerService } from '../model/services/deezer.service';
import { SharedService } from '../model/services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  col: number = 5;

  chartTracks: Track[];
  constructor(
    private deezerService: DeezerService,
    private sharedService: SharedService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.deezerService.getCharts().subscribe(
      data => {
        this.chartTracks = data.tracks.data
      }
    )
    this.changeCols(window.innerWidth)
  }

  onResize(event) {
    this.changeCols(event.target.innerWidth)
  }

  changeCols(width) {
    if(width <= 400){
      this.col = 2
    }
    else if(width <= 800){
      this.col = 3
    }
    else if(width <= 1100){
      this.col = 4
    }
    else{
      this.col = 5
    }
  }

  play(track: Track) {
    this.sharedService.loadTrack(track)
  }

  push(track: Track) {
    this.toastr.success('', 'Se agregó a la cola', {
      timeOut: 1200,
      positionClass: 'toast-bottom-right'
    });
    this.sharedService.push(track)
  }

}
