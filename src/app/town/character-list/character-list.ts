// Services
import { Component, Inject, AfterViewInit } from 'angular2/core';
import { NgFor, NgIf, NgStyle } from 'angular2/common';
import { CharacterService } from '../../../service/character-service';

// Subcomponents
import { CharacterListEntry } from './character-list-entry/character-list-entry';

// Style
import './character-list.less';

@Component({
    selector: 'character-list',
    providers: [CharacterService],
    directives: [CharacterListEntry, NgFor, NgIf, NgStyle],
    template: require('./character-list.html')
})
export class CharacterList implements AfterViewInit {

    characters : CharacterModel[];
    htmlEntries : HTMLElement[] = [];
    showList : boolean = true;
    showScroll : boolean;
    entryHeight : number;

    constructor (@Inject(CharacterService) characterService : CharacterService) {
        characterService.getCharacters()
            .then((chars : CharacterModel[]) => {
                this.characters = chars;
            });
    }

    ngAfterViewInit () : any {
        // Lot's of calculations depend on the size of a single entry, so we get it from the HTML instead of hardcode it
        this.entryHeight = document.getElementById('character-list-entry-wrapper').scrollHeight;

        // Since all of the entries are position absolute we need to manually set the hight of the scrollable div
        document.getElementById('character-list-entries-scrollable').style.height =
            this.entryHeight * this.characters.length + 'px';

        let entriesList : NodeListOf<Element> = document.getElementsByClassName('character-list-entry-wrapper');
        for (let i : number = 0; i < entriesList.length; i++) {
            this.htmlEntries.push(<HTMLElement>entriesList.item(i));
        }

        // Timeout is to fix the error about changing something without firing change event
        // It' angular magic and I don't really get it.
        setTimeout(() => {this.showScroll = this.checkOverflow(); }, 1);
    }

    toggleList () : void {
        this.showList = !this.showList;
    }

    scrollDown () : void {
        let scrollElement : HTMLElement = document.getElementById('character-list-entries-scrollable');
        let potentialNewTopValue : number =
            parseInt(window.getComputedStyle(scrollElement).top.replace(/px/, ''), 10) - this.entryHeight;
        let minimumTopValue : number =
            document.getElementById('character-list-entries').offsetHeight - scrollElement.scrollHeight;
        scrollElement.style.top =
            potentialNewTopValue < minimumTopValue
                ? minimumTopValue + 'px' : potentialNewTopValue + 'px';

    }

    scrollUp () : void {
        let htmlElement : HTMLElement = document.getElementById('character-list-entries-scrollable');
        let potentialNewTopValue : number =
            parseInt(window.getComputedStyle(htmlElement).top.replace(/px/, ''), 10) + this.entryHeight;
        htmlElement.style.top = potentialNewTopValue > 0 ? '0' : potentialNewTopValue + 'px';
    }

    sortAlphabetically () : void {
        this.sortHtmlEntries((a : HTMLElement, b : HTMLElement) => {
            if (a.getAttribute('data-name') < b.getAttribute('data-name')) {
                return -1;
            } else if (a.getAttribute('data-name') > b.getAttribute('data-name')) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    sortXP () : void {
        this.sortHtmlEntries((a : HTMLElement, b : HTMLElement) => {
            if (a.getAttribute('data-experience') < b.getAttribute('data-experience')) {
                return -1;
            } else if (a.getAttribute('data-experience') > b.getAttribute('data-experience')) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    // Sorts the HTML Entries with the given function and sets the Top style attribute to visually sort them
    private sortHtmlEntries (sortFunction : (a : Element, b : Element) => number) : void {
        this.htmlEntries.sort(sortFunction);
        this.htmlEntries.forEach((entry : HTMLElement, index : number) => {
            entry.style.top = index * this.entryHeight + 'px';
        });
    }

    // Checks if the scrollable div is larger than its parent
    private checkOverflow () : boolean {
        let entries : HTMLElement = document.getElementById('character-list-entries');
        let scrollable : HTMLElement = document.getElementById('character-list-entries-scrollable');
        if (scrollable.offsetTop + scrollable.offsetHeight >
            entries.offsetTop + entries.offsetHeight ||
            scrollable.offsetLeft + scrollable.offsetWidth >
            entries.offsetLeft + entries.offsetWidth) {
            return true;
        }
        return false;
    }
}
