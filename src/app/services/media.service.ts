import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Media, MediaObject } from '@ionic-native/media/ngx';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  audioFile: MediaObject;
  path: string;

  constructor(
    private plt: Platform,
    private media: Media
  ) {
    if (this.plt.is('cordova')) {
      this.path = 'android_asset/www';
    }
  }

  playSound(track) {
    if (this.plt.is('cordova')) {

      if (this.audioFile) {
        this.audioFile.stop();
        this.audioFile.release();
      }

      this.audioFile = this.media.create('/android_asset/www' + track);

      this.audioFile.onStatusUpdate.subscribe(status => {

        if (status === this.media.MEDIA_STOPPED) {
          // this.file.seekTo(0);
          // this.file.release();
          this.audioFile.play();
        }
      });

      this.audioFile.onSuccess.subscribe(() => console.log('Action is succesful'));

      this.audioFile.onError.subscribe(error => console.log("Error!, code:", error));

      // this.audioFile.setVolume(0.35);
      return this.audioFile.play();
    }
  }

  pauseSound() {
    if (this.audioFile) {
      this.audioFile.pause();
    }
  }

  playOrPauseSound(track) {
    if (this.audioFile) {
      this.audioFile.pause();
    } else {
      this.playSound(track);
    }
  }

  setVolumeSound(vol) {
    if (this.audioFile) {
      this.audioFile.setVolume(vol)
    }
  }
}
