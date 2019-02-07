import { Component, OnInit, Input } from '@angular/core';
import { trigger, keyframes, animate, transition } from '@angular/animations';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import * as kf from './keyframes';

import { MediaService } from './../../services/media.service';

export interface CountDownTimer {
  seconds: number;
  secondsRemaining: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
}

@Component({
  selector: 'media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss'],
  animations: [
    trigger('playerAnimation', [
      transition('* => slideInUp', animate(2000, keyframes(kf.slideInUp))),
    ])
  ]
})
export class MediaPlayerComponent implements OnInit {

  @Input() timeInSeconds: number;
  timer: CountDownTimer;
  timerOptions = {}

  sound: string;
  soundVolume: number = 35;
  vol: number;
  ifSoundPlaying: boolean = true;
  visibleControlVolume: boolean = false;

  constructor(
    private alertCtrl: AlertController,
    private media: MediaService,
    private storage: Storage) {
    this.vol = this.soundVolume;
  }

  ngOnInit() {

    this.initTimer(0);
  }

  hasFinished() {
    return this.timer.hasFinished;
  }

  initTimer(time) {
    this.timeInSeconds = time;

    this.timer = <CountDownTimer>{
      seconds: this.timeInSeconds,
      runTimer: false,
      hasStarted: false,
      hasFinished: false,
      secondsRemaining: this.timeInSeconds
    };

    this.timer.displayTime = this.secondsAsDigitalClock(this.timer.secondsRemaining);
  }

  startTimer() {
    this.timer.hasStarted = true;
    this.timer.runTimer = true;
    this.timerTick();
  }

  pauseTimer() {
    this.timer.runTimer = false;
  }

  resumeTimer() {
    this.startTimer();
  }

  timerTick() {
    setTimeout(() => {
      if (!this.timer.runTimer) { return; }
      this.timer.secondsRemaining--;
      this.timer.displayTime = this.secondsAsDigitalClock(this.timer.secondsRemaining);
      if (this.timer.secondsRemaining > 0) {
        this.timerTick();
      } else {
        this.timer.hasFinished = true;
        this.stopSong();
      }
    }, 1000);
  }

  secondsAsDigitalClock(inputSeconds: number) {
    const secNum = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor((secNum - (hours * 3600)) / 60);
    const seconds = secNum - (hours * 3600) - (minutes * 60);
    let hoursString = '';
    let minutesString = '';
    let secondsString = '';
    hoursString = (hours < 10) ? '0' + hours : hours.toString();
    minutesString = (minutes < 10) ? '0' + minutes : minutes.toString();
    secondsString = (seconds < 10) ? '0' + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }

  // Play or Pause Song
  toggleSong() {
    if (this.ifSoundPlaying) {
      this.stopSong();
      this.pauseTimer();
    } else {
      this.playSong();
      this.timerTick();
    }
  }

  playSong() {
    console.log('tocando');
    this.storage.get('hasPlaying').then(value => {
      this.sound = value;
      this.media.playSound(this.sound);
    });
    this.ifSoundPlaying = true;
  }

  stopSong() {
    this.ifSoundPlaying = false;
    console.log('stop');
    this.media.pauseSound();
  }

  changeVolume() {
    this.visibleControlVolume = !this.visibleControlVolume;
  }

  onVolumeChanged(evt) {
    let vol = this.soundVolume / 100;
    this.media.setVolumeSound(vol);
    setTimeout(() => this.visibleControlVolume = false, 2000);
  }

  toggleTimer() {
    this.timerOptions = {
      title: 'Definir Timer',
      inputs: [
        {
          type: 'radio',
          label: 'Sem duração',
          value: 'sem duracao',
          checked: true,
        },
        {
          type: 'radio',
          label: '1 Minuto',
          value: '60'
        },
        {
          type: 'radio',
          label: '5 Minutos',
          value: '300'
        },
        {
          type: 'radio',
          label: '10 Minutos',
          value: '600'
        },
        {
          type: 'radio',
          label: '15 Minutos',
          value: '900'
        },
        {
          type: 'radio',
          label: '30 Minutos',
          value: '1800'
        },
        {
          type: 'radio',
          label: '45 Minutos',
          value: '2700'
        },
        {
          type: 'radio',
          label: '1 hora',
          value: '3600'
        },
        {
          type: 'radio',
          label: '2 Horas',
          value: '7200'
        },
        {
          type: 'radio',
          label: '3 Horas',
          value: '10800'
        },
        {
          type: 'radio',
          label: '4 Horas',
          value: '14400'
        }
      ],
      buttons: [
        {
          text: 'OK',
          role: 'ok',
          handler: value => {
            this.initTimer(value);
            this.startTimer();
          }
        }
      ]
    }
    const alert = this.alertCtrl.create(this.timerOptions);
    alert.then(data => data.present());

  }


}
