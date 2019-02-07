import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MediaPlayerComponent } from './media-player/media-player.component';

@NgModule({
  declarations: [MediaPlayerComponent],
  imports: [CommonModule, IonicModule],
  exports: [MediaPlayerComponent]

})

export class ComponentsModule { }
