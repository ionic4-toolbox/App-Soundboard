import { Component, OnInit } from '@angular/core';
import { SoundsDataService } from './../../services/sounds-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  songs: any;
  constructor(private soundsData: SoundsDataService) { }

  ngOnInit() {
    this.soundsData.load().subscribe(data => { this.songs = data.results[0].songs; console.log(this.songs) }
    );
  }

}
