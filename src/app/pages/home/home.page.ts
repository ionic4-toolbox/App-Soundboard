import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SoundsDataService } from './../../services/sounds-data.service';
import { MediaService } from './../../services/media.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  sounds: any = [];
  soundHasClicked: boolean = false;
  soundHasPlaying: boolean = true;
  soundHasActive: any;

  constructor(
    private soundsData: SoundsDataService,
    private media: MediaService,
    private storage: Storage) { }

  ngOnInit() {
    this.soundsData.load().subscribe(data => {
      this.sounds = data.results[0].songs;
      this.soundHasActive = this.sounds[0];
    }
    );
  }

  toggleSound(sound) {

    this.soundHasActive = sound;

    if (this.soundHasClicked) {
      this.storage.remove('soundHasPlaying');
      this.media.pauseSound();
      this.media.playSound(this.soundHasActive.file);
    } else {
      this.soundHasClicked = true;
      this.storage.remove('soundHasPlaying');
      this.storage.set('soundHasPlaying', this.soundHasActive.file);
      return this.media.playSound(this.soundHasActive.file);
    }

  }

  playSound(sound) {
    this.soundHasActive = sound;
    console.log('Som ativo: ', this.soundHasActive);
    if (this.media) {
      this.soundHasClicked = false;
      this.soundHasPlaying = false;
      this.media.pauseSound();
      this.storage.remove('soundHasPlaying');
    }

    this.soundHasClicked = true;
    this.media.playSound(this.soundHasActive.file);
    this.storage.set('soundHasPlaying', this.soundHasActive.file);
    this.soundHasPlaying = true;

  }

  checkIsActive(sound) {
    return sound == this.soundHasActive;
  }

}
