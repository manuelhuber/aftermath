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
        this.checkScrolling();
    }

    toggleList () : void {
        this.showList = !this.showList;
    }

    scrollDown () : void {
        let htmlElement : HTMLElement = document.getElementById('character-list-entries-scrollable');
        let potentialNewTopValue : number =
            parseInt(window.getComputedStyle(htmlElement).top.replace(/px/, ''), 10) - this.entryHeight;
        let minimumTopValue : number =
            document.getElementById('character-list-entries').offsetHeight - htmlElement.scrollHeight;
        htmlElement.style.top =
            potentialNewTopValue < minimumTopValue
                ? minimumTopValue + 'px' : potentialNewTopValue + 'px';

    }

    scrollUp () : void {
        let htmlElement : HTMLElement = document.getElementById('character-list-entries-scrollable');
        let potentialNewTopValue : number =
            parseInt(window.getComputedStyle(htmlElement).top.replace(/px/, ''), 10) + this.entryHeight;
        htmlElement.style.top = potentialNewTopValue > 0 ? '0' : potentialNewTopValue + 'px';
    }

    private areChildrenOverflown (elemenId : string) : boolean {
        let htmlElement : HTMLElement = document.getElementById(elemenId);
        for (let i : number = 0; i < htmlElement.childElementCount; i++) {
            let child : HTMLElement = <HTMLElement>htmlElement.children[i];
            if (child.offsetTop + child.offsetHeight >
                htmlElement.offsetTop + htmlElement.offsetHeight ||
                child.offsetLeft + child.offsetWidth >
                htmlElement.offsetLeft + htmlElement.offsetWidth) {
                return true;
            }
        }
        return false;
    }

    private checkScrolling () : void {
        let htmlElement : HTMLElement = document.getElementById('character-list-entries-scrollable');
        let minimumTopValue : number =
            document.getElementById('character-list-entries').offsetHeight - htmlElement.scrollHeight;
        htmlElement.style.top =
            htmlElement.style.top < minimumTopValue
                ? minimumTopValue + 'px' : htmlElement.style.top;
    }
}
