import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { debounceTime, map, shareReplay } from 'rxjs/operators';
import { OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Track } from '../model/entities/track';
import { SharedService } from '../model/services/shared.service';
import { Router } from '@angular/router';
import { DeezerService } from '../model/services/deezer.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  @ViewChild('searchBox') searchInput: ElementRef;
  hideResult:boolean;
  searchResults: Track[]= new Array();
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    user = {
      name: 'Fabrizio A.',
      visible: true
    }

    library = {
      title: 'Mi Librería',
      items: [
        {
          name: 'Recientes',
          route: '/home'
        },
        {
          name: 'Artistas',
          route: '**'
        },
        {
          name: 'Álbums',
          route: '/album'
        },
        {
          name: 'Canciones',
          route: '**'
        },
        {
          name: 'Estaciones',
          route: '**'
        }
      ]
    }

    playlist = {
      title: 'Playlist',
      items: [
        {
          name: 'Metal',
          route: '**'
        },
        {
          name: 'Para bailar',
          route: '**'
        },
        {
          name: 'Rock 90s',
          route: '**'
        },
        {
          name: 'Baladas',
          route: '**'
        }
      ]
    }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private deezerService: DeezerService,
    private sharedService: SharedService,
    private router:Router,) {}

  ngOnInit() {
    if(window.innerWidth <= 900){
      this.user.visible = false
    }
  }
  ngAfterViewInit(){
    let buttonStream$=fromEvent(this.searchInput.nativeElement, 'keyup')
    .pipe(debounceTime(500))
    .subscribe(()=>{
      let param: string = this.searchInput.nativeElement.value;
      if(param.length != 0 && param != null){
        this.search(this.searchInput.nativeElement.value);
        this.hideResult = false;
      }else{
        this.hideResult = true;
      }
    });
  }
  
  onResize(event){
    event.target.innerWidth <= 900? this.user.visible = false: this.user.visible = true
  }

  search(param: string) {
    this.deezerService.findTrackByName(param).subscribe(
      data => this.searchResults = data.data
    )
  }

  onResultClick(item){
    this.hideResult=true;
    this.searchInput.nativeElement.value = '';

    if(item.type == 'track'){
      this.sharedService.loadTrack(item)
    }else{
      this.router.navigate(['/album',item.id]);
    }
  }
}
