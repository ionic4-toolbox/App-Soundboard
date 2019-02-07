import { keyframes, style } from '@angular/animations';

export const slideInUp = [
  style({ transform: 'translate3d(0, 100%, 0)', visibility: 'visible', offset: 0 }),
  style({ transform: 'translate3d(0,0,0)', offset: 1 })
]
