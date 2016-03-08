import { Component, Inject } from 'angular2/core';
import { Router } from 'angular2/router';

import './footer.less';

const quotes : string[] = [
    'I LIVE, I DIE, I LIVE AGAIN',
    'WITNESS ME',
    'MY WORLD IS FIRE - AND BLOOD',
    'HOPE IS A MISTAKE',
    'WHERE MUST WE GO... WE WHO WANDER THIS WASTELAND IN SEARCH OF BETTER SELVES?',
    'KNOWLEDGE IS POWER - GUARD IT WELL',
    'IF IT\'S WORTH DOING, IT\'S WORTH DYING FOR',
    'EVEN A MAN WHO HAS NOTHING CAN STILL OFFER HIS LIFE',
    'THERE IS NO INNOCENCE - ONLY VARYING DEGREES OF GUILT',
    'IT DOESN\'T MATTER WHEN YOU DIE - ONLY HOW',
    'HOW MUCH MORE CAN THEY TAKE FROM ME?',
    'IT\'S NOT MY BLOOD',
    'I AM YOUR REDEEMER!',
    'IT IS BY MY HAND YOU WILL RISE FROM THE ASHES OF THIS WORLD',
    'THERE IS NO GOING BACK!',
    'WHY CAN\'T YOU STOP?',
    'AND NOW WE BRING HOME THE BOOTY!',
    'ONE MAN, ONE BULLET',
    'THERE IS NO TRIUMP WITHOUT VICTIMS',
    'THE DEAD DON\'T YEARN FOR REVENGE - BUT THE LIVING DO',
    'A DEATH WITH GLORY BRINGS ETERNAL LIFE',
    'WE WILL BE JUDGED NOT BY OUR LIVES BUT BY OUR DEATHS',
    'TRUE WARRIOIRS DON\'T STRIFE FOR VICOTRY BUT FOR DEATH',
    'INNOCENCE PROVES NOTHING',
    'HATRED IS THE GREATEST GIFT TO HUMANITY',
    'HAPPINESS IS A DELUSION OF THE WEAK',
    'TRUTH IS SUBJECTIVE',
    'DAMNATION IS ETERNAL',
    'DO YOU HEAR THE VOICES, TOO?',
    'MAIM KILL BURN! MAIM KILL BURN!',
    'SANITY IS FOR THE WEAK!'
];

@Component({
    selector: 'footer',
    template: require('./footer.html')
})
export class Footer {

    randomQuote : string;

    constructor (@Inject(Router) route : Router) {
        route.subscribe(() => {
            this.randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        });

    }

}
