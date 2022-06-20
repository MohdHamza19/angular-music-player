import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiscPlayerAppComponent } from './misc-player-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';
import { FlexboxComponent } from '../demo/flexbox/flexbox.component';
import { NewReleasesComponent } from './components/new-releases/new-releases.component';
import { AllSongsComponent } from './components/all-songs/all-songs.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { MusicBarComponent } from './components/music-bar/music-bar.component';
import { UsersModule } from './users/users.module';
import { PlaylistComponent } from './components/playlist/playlist.component';

const routes: Routes = [
  {
    path: '', component: MiscPlayerAppComponent,
    children: [
      { path: 'now-playing', component: MainContentComponent },
      { path: 'new', component: NewReleasesComponent },
      { path: 'playlist', component: PlaylistComponent },
      { path: 'all', component: AllSongsComponent },
      { path: '', redirectTo: 'now-playing' },
      {
        path: 'user',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
      }
    ]
  },
  // {
  //   path: 'user',
  //   loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  // },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  declarations: [
    MiscPlayerAppComponent,
    ToolbarComponent,
    SideNavComponent,
    MainContentComponent,
    NewReleasesComponent,
    AllSongsComponent,
    MusicBarComponent,
    PlaylistComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    UsersModule,
    RouterModule.forChild(routes),
  ]
})
export class MiscPlayerModule { }
