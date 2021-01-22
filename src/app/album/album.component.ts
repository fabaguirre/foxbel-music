import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../model/entities/album';
import { Track } from '../model/entities/track';
import { DeezerService } from '../model/services/deezer.service';
import { SharedService } from '../model/services/shared.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album: Album;
  displayedColumns: string[] = ['id', 'title'];
  
  constructor(
    private activatedToute: ActivatedRoute,
    private deezerService: DeezerService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.activatedToute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.deezerService.getAlbum(id)
        .subscribe(
          data => {
            this.album = data
            this.album.tracks = data.tracks.data

            console.log(this.album)
          }
        )
      }
    })
  }

  play(track: Track){
    track.album = this.album
    this.sharedService.loadTrack(track)
  }

}
