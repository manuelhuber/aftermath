// Services
import { Component, Inject, AfterViewInit } from 'angular2/core';
import { NgFor, NgIf } from 'angular2/common';
import { CharacterService } from '../../../service/character-service';

// Subcomponents
import { CharacterListEntry } from './character-list-entry/character-list-entry';

// Style
import './character-list.less';

@Component({
    selector: 'character-list',
    providers: [CharacterService],
    directives: [CharacterListEntry, NgFor, NgIf],
    template: require('./character-list.html')
})
export class CharacterList implements AfterViewInit {

    characters : CharacterModel[];
    showList : boolean = true;
    entries : number;
    showScroll : boolean;
    entryHeight : number;

    constructor (@Inject(CharacterService) characterService : CharacterService) {
        characterService.getCharacters()
            .then((chars : CharacterModel[]) => {
                this.characters = chars;
                this.entries = chars.length;
            });
    }

    ngAfterViewInit () : any {
        // Timeout is to fix the error about changing something without firing change event
        // It' angular magic and I don't really get it.
        setTimeout(() => {this.showScroll = this.areChildrenOverflown('character-list-entries') }, 1);
        this.entryHeight = document.getElementById('character-list-entry-wrapper').scrollHeight;
    }

    toggleList () : void {
        this.showList = !this.showList;
    }

    scrollDown () : void {
        let element : HTMLElement = document.getElementById('character-list-entries-scrollable');
        let potentialNewTopValue : number = parseInt(window.getComputedStyle(element).top.replace(/px/, ''), 10) - this.entryHeight;
        let minimumTopValue : number = document.getElementById('character-list-entries').offsetHeight - element.scrollHeight;
        element.style.top =
            potentialNewTopValue < minimumTopValue
                ? minimumTopValue + 'px' : potentialNewTopValue + 'px';
    }

    private areChildrenOverflown (elemenId : string) : boolean {
        let element : HTMLElement = document.getElementById(elemenId);
        for (let i : number = 0; i < element.childElementCount; i++) {
            let child : HTMLElement = <HTMLElement>element.children[i];
            if (child.offsetTop + child.offsetHeight >
                element.offsetTop + element.offsetHeight ||
                child.offsetLeft + child.offsetWidth >
                element.offsetLeft + element.offsetWidth) {
                return true;
            }
        }
        return false;
    }
}
