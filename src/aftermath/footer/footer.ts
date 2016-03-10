import { Component, Inject } from 'angular2/core';
import { Router } from 'angular2/router';

// Style
import './footer.less';

const quotes : string[] = [
    'i live, i die, i live again',
    'witness me',
    'my world is fire and blood',
    'hope is a mistake',
    'where must we go... we who wander this wasteland in search of better selves?',
    'knowledge is power - guard it well',
    'if it\'s worth doing, it\'s worth dying for',
    'even a man who has nothing can still offer his life',
    'there is no innocence - only varying degrees of guilt',
    'it doesn\'t matter when you die - only how',
    'how much more can they take from me?',
    'it\'s not my blood',
    'i am your redeemer!',
    'it is by my hand you will rise from the ashes of this world',
    'there is no going back!',
    'why can\'t you stop?',
    'and now we bring home the booty!',
    'one man, one bullet',
    'there is no triump without victims',
    'the dead don\'t yearn for revenge - but the living do',
    'a death with glory brings eternal life',
    'we will be judged not by our lives but by our deaths',
    'true warrioirs don\'t strife for vicotry but for death',
    'innocence proves nothing',
    'hatred is the greatest gift to humanity',
    'happiness is a delusion of the weak',
    'truth is subjective',
    'damnation is eternal',
    'do you hear the voices too?',
    'maim kill burn! maim kill burn!',
    'sanity is for the weak!',
    'people die',
    'beauty fades',
    'love changes',
    'and you will always be alone',
    'if you run from me, i will pursue',
    'we\'ll play some games',
    'from my rotting body, flowers shall grow and i am in them and that is eternity',
    'the past is always with us',
    'the wider he smiled and called us friend, the tighter we clung to our purses',
    'for every battle honour, a thousand heroes die alone, unsung, and unremembered',
    'Sometimes the good must perish so that the rest survive',
    'Inspiration grows from the barrel of a gun',
    'If your plan\'s working, it\'s probably a trap',
    'Victory? What use is victory? Let me have a battle of annihilation',
    'Years of love have been forgot, in the hatred of a minute',
    'Every sinner has a past, every saint has a future'
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
