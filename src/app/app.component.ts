import { Component, trigger, state, style, transition, animate, keyframes, group } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
      trigger('divState', [
          state('normal', style({
              'background-color': 'red',  //1 way to use
              transform: 'translateX(0)'
          })),
          state('highlighted', style({
              backgroundColor: 'blue',  //the other way to use
              transform: 'translateX(100px)'
          })),
          transition('normal <=> highlighted', [   // pass in an array of things you want to do in between
              style({
                  'background-color': 'orange'   // no animation, just apply the style directly
              }),
              animate(1000, style({              // animate and apply the style during certain time
                  borderRadius: '50px'
              })),
              animate(500)   //without style means transition to the end state
          ]),   //300 is the time takes, can also use <=> if both direction have the same time.
          //transition('highlighted => normal', animate(800))   // from state to another state
      ]),
      trigger('wildState', [
          state('normal', style({
              'background-color': 'red',  //1 way to use
              transform: 'translateX(0) scale(1)'
          })),
          state('highlighted', style({
              'background-color': 'blue',  //the other way to use
              transform: 'translateX(100px) scale(1)'
          })),
          state('shrr', style({
              'background-color': 'green',  //the other way to use
              transform: 'translateX(50px) scale(0.5)'
          })),
          transition('normal => highlighted', animate(300)),   //300 is the time takes, can also use <=> if both direction have the same time.
          transition('highlighted => normal', animate(800)),   // from state to another state
          transition('shrr <=> *', animate(800)),
      ]),

      trigger('list1', [
          state('in', style({
              opacity: 1, //fully visible
              transform: 'translateX(0)'
          })),
          transition('void => *', [   //void is a angular build in state
              style({
                  opacity: 0,
                  transform: 'translateX(-100px)'   // need to define a start state style, then apply animation
              }),
              animate(300)
          ]),
          transition('* => void', [   //void is a angular build in state
              animate(300, style({
                  opacity: 0,
                  transform: 'translateX(100px)'    // need to give a final state, so it animate to the final state style
              }))
          ]),
      ]),

      trigger('list2', [
          state('in', style({
              opacity: 1, //fully visible
              transform: 'translateX(0)'
          })),
          transition('void => *', [
              animate(1000, keyframes([
                  style({
                      transform: 'translateX(-100px)',
                      opacity: 0,
                      offset: 0
                  }),
                  style({
                      transform: 'translateX(-50px)',
                      opacity: 0.5,
                      offset: 0.3
                  }),
                  style({
                      transform: 'translateX(-20px)',
                      opacity: 1,
                      offset: 0.8
                  }),
                  style({
                      transform: 'translateX(0px)',
                      opacity: 1,
                      offset: 1
                  }),
              ]))
          ]),
          transition('* => void', [   //void is a angular build in state
              group([
                  animate(300, style({
                      color: 'red'
                  })),
                  animate(800, style({
                      opacity: 0,
                      transform: 'translateX(100px)'    // need to give a final state, so it animate to the final state style
                  })),
              ]),
          ]),
      ]),
  ]
})
export class AppComponent {
    state = 'normal';
    wildState = 'normal';
    list = ['Milk', 'Sugar', 'Bread'];

    onAnimate() {
        this.state == 'normal' ? this.state = 'highlighted' : this.state = 'normal';
        this.wildState == 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
    }

    onShrink() {
        this.wildState = 'shrr';
    }

    onAdd(item) {
        this.list.push(item);
    }

    onDelete(item) {
        this.list.splice(this.list.indexOf(item), 1);
    }

    animationStarted(event) {
        console.log(event);
    }
    animationEnded(event) {
        console.log(event);
    }
}
