import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { HomeComponent } from './home/home.component';
import { PlayerComponent } from './player/player.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'album/:id', component: AlbumComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '404', component: PlayerComponent},
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
