import { NgModule } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { MediaPlayerComponent } from './media-player/media-player.component';

@NgModule({
    declarations: [MediaPlayerComponent],
    imports: [IonicModule],
    exports: [MediaPlayerComponent]

})

export class ComponentsModule { }