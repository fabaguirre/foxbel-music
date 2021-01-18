import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

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

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    if(window.innerWidth <= 900){
      this.user.visible = false
    }
  }
  
  onResize(event){
    event.target.innerWidth <= 900? this.user.visible = false: this.user.visible = true
  }
}
