import { animate, state, style, transition, trigger } from "@angular/animations";

export const Animations = {
  animeTrigger:
  trigger('sidenavAnimationIsExpanded', [
    state(
      'true',
      style({
        width: '200px'
      })
    ),
    state(
      'false',
      style({
        width: '70px',
      })
    ),
    transition('true <=> false', [animate('0.5s')])
  ])
}
