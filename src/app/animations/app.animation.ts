import {
    trigger,
    state,
    style,
    animate,
    transition
  } from '@angular/animations';

  export function visibility() {
      return trigger('visibility', [
        state(
          'show',
          style({
            transform: 'scale(1.0)',
            opacity: 1
          })
        ),
        state(
          'hide',
          style({
            transform: 'scale(0.5)',
            opacity: 0
          })
        ),
        // transition(':enter', animate('0.5s ease-in')),
        // transition(':leave', animate('0.5s ease-out'))
        transition('* => *', animate('0.5s ease-in-out')),
      ]);
  }

  export function flyInOut() {
      return trigger('flyInOut', [
          state('*', style({ opacity: 1, transform: 'translateX(0)'})),
          transition(':enter', [style({opacity: 0, transform: 'translateX(-100%)' }), animate('500ms ease-in')]),
          transition(':leave', [style({opacity: 1, transform: 'translateX(100%)'}), animate('500ms ease-out')])
      ]);
  }

  export function expand() {
    return trigger('expand', [
        state('*', style({ opacity: 1, transform: 'translateX(0)' })),
        transition(':enter', [
            style({ transform: 'translateY(-50%)', opacity: 0 }),
            animate('200ms ease-in', style({ opacity: 1, transform: 'translateX(0)' }))
        ])
    ]);
}

export function flyIn() {
  return trigger('inputFormState', [
    state(
      'pending',
      style({
        transform: 'scale(1.0)',
        opacity: 1
      })
    ),
    state(
      'done',
      style({
        transform: 'scale(0.0)',
        opacity: 0
      })
    ),
    transition('* => *', animate('1s ease-in-out'))
  ]);
}

export function flyOut() {
  return trigger('formDetailState', [
    state(
      'show',
      style({
        transform: 'scale(1.0)',
        opacity: 1
      })
    ),
    state(
      'hide',
      style({
        transform: 'scale(0.0)',
        opacity: 0
      })
    ),
    transition('hide => show',  [style({opacity: 1, transform: 'scale(1.0)' }), animate('5s')]),
    transition('show => hide', [style({opacity: 0, transform: 'scale(0.0)' }), animate('5s')])
  ]);
}
