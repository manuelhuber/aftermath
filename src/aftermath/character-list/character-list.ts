// Services
import { Component, Inject, AfterViewInit, NgZone } from 'angular2/core';
import { NgFor, NgIf, NgStyle } from 'angular2/common';
import { CharacterService } from '../../service/character-service';

// Subcomponents
import { CharacterListEntry } from './character-list-entry/character-list-entry';
import { CharacterDetails } from './character-details/character-details';
import { InlineIcon } from '../../components/inline-icon/inline-icon';

// Style
import './character-list.less';

enum SORT {
    ALPHABETICALLY,
    EXPERIENCE
}

@Component({
    selector: 'character-list',
    providers: [CharacterService],
    directives: [CharacterListEntry, CharacterDetails, NgFor, NgIf, NgStyle, InlineIcon],
    template: require('./character-list.html')
})
export class CharacterList implements AfterViewInit {

    /** Actual Data ------------------------------------------------------------------------------------------------- */

    characters : CharacterModel[];

    /** Stuff for html manipulation --------------------------------------------------------------------------------- */

    // All of the character entry HTML elements since we need it for sorting
    htmlEntries : HTMLElement[] = [];
    // Contains all of the entries and we move it up and down to simulate scrolling
    scrollableDiv : HTMLElement;
    showList : boolean = false;
    showScroll : boolean;
    // Lot's of calculations depend on the size of a single entry, so we get it from the HTML instead of hardcode it
    entryHeight : number;

    sortedIds : number[];
    selectedCharacterId : number;
    showCharacterDetails : boolean = false;

    reverseSort : number = 1;
    lastSort : number;

    constructor (@Inject(CharacterService) characterService : CharacterService,
                 @Inject(NgZone) zone : NgZone) {
        characterService.getCharacters()
            .then((chars : CharacterModel[]) => {
                this.characters = chars;
                this.selectedCharacterId = this.characters[0].id;
            });

        window.onresize = (ev : UIEvent) => {
            // Angular won't update the view unless I use zone.run - not sure why
            zone.run(() => { this.showScroll = this.shouldWeScroll(); });
        };
    }

    ngAfterViewInit () : any {

        let entriesList : NodeListOf<Element> = document.getElementsByClassName('character-list-entry-wrapper');
        for (let i : number = 0; i < entriesList.length; i++) {
            this.htmlEntries.push(<HTMLElement>entriesList.item(i));
        }

        this.entryHeight = document.getElementById('character-list-entry-wrapper').scrollHeight;

        this.scrollableDiv = document.getElementById('character-list-entries-scrollable');
        // Since all of the entries are position absolute the div doesn't grow on it's own
        // and we need to manually set the height of it
        this.scrollableDiv.style.height = this.entryHeight * this.characters.length + 'px';

        // Timeout is to fix the error about changing something without firing change event
        // It' angular magic and I don't really get it.
        // If we set the showScroll variable in the function it doesn't update. I really don't get angular
        setTimeout(() => { this.showScroll = this.shouldWeScroll(); }, 0);
    }

    toggleList () : void {
        this.showList = !this.showList;
    }

    /**
     * Moves the scrollable div up, so the entries further down are visible
     */
    scrollDown () : void {
        let potentialNewTopValue : number =
            parseInt(window.getComputedStyle(this.scrollableDiv).top.replace(/px/, ''), 10) - this.entryHeight;
        let minimumValue : number =
            document.getElementById('character-list-entries').offsetHeight - this.scrollableDiv.scrollHeight;
        this.scrollableDiv.style.top =
            potentialNewTopValue < minimumValue
                ? minimumValue + 'px' : potentialNewTopValue + 'px';

    }

    /**
     * Moves the scrollable div down, so the entries further up are visible
     */
    scrollUp () : void {
        let potentialNewTopValue : number =
            parseInt(window.getComputedStyle(this.scrollableDiv).top.replace(/px/, ''), 10) + this.entryHeight;
        this.scrollableDiv.style.top = potentialNewTopValue > 0 ? '0' : potentialNewTopValue + 'px';
    }

    /**
     * Sort the characters by Name
     */
    sortAlphabetically () : void {
        this.reverseSort = (this.lastSort === SORT.ALPHABETICALLY) ? -this.reverseSort : 1;
        this.lastSort = SORT.ALPHABETICALLY;
        this.sortHtmlEntries((a : HTMLElement, b : HTMLElement) => {
            if (a.getAttribute('data-name') < b.getAttribute('data-name')) {
                return -this.reverseSort;
            } else if (a.getAttribute('data-name') > b.getAttribute('data-name')) {
                return this.reverseSort;
            } else {
                return 0;
            }
        });
    }

    /**
     * Sort the characters by XP
     */
    sortXP () : void {
        this.reverseSort = (this.lastSort === SORT.EXPERIENCE) ? -this.reverseSort : 1;
        this.lastSort = SORT.EXPERIENCE;
        this.sortHtmlEntries((a : HTMLElement, b : HTMLElement) => {
            let experienceA : number = parseInt(a.getAttribute('data-experience'), 10);
            let experienceB : number = parseInt(b.getAttribute('data-experience'), 10);
            if (experienceA > experienceB) {
                return -this.reverseSort;
            } else if (experienceA < experienceB) {
                return this.reverseSort;
            } else {
                return 0;
            }
        });
    }

    showDetails (event : Event) : void {
        let htmlTarget : HTMLElement = <HTMLElement>event.currentTarget;
        this.selectedCharacterId = parseInt(htmlTarget.getAttribute('data-id'), 10);
        this.showCharacterDetails = true;
    }

    eventHandling (event : Event) : void {
        this.showCharacterDetails = event.returnValue;
    }

    /**
     * Sorts the HTML Entries with the given function and sets the Top style attribute to visually sort them
     * @param sortFunction a standard sort function that returns -1, 0 or 1
     */
    private sortHtmlEntries (sortFunction : (a : Element, b : Element) => number) : void {
        this.sortedIds = [];
        this.htmlEntries.sort(sortFunction);
        this.htmlEntries.forEach((entry : HTMLElement, index : number) => {
            this.sortedIds.push(parseInt(entry.getAttribute('data-id'), 10));
            entry.style.top = index * this.entryHeight + 'px';
        });
    }

    /**
     * Checks if we need to scroll.
     * If we are already scrolling it incorporates the height of the scroll bars to see if we actually need to scroll
     */
    private shouldWeScroll () : boolean {
        let entries : HTMLElement = document.getElementById('character-list-entries');
        let down : HTMLElement = document.getElementById('character-list-scroll-down');

        // If we are already scrolling and the div doesn't fit into the area of the entries + scroll elements
        if (this.showScroll &&
            this.scrollableDiv.scrollHeight > entries.offsetHeight + down.offsetHeight) {
            return true;
        } else if (!this.showScroll && this.scrollableDiv.scrollHeight > entries.offsetHeight) {
            return true;
        }
        // If we don't need to scroll orient the scrollable at the top
        this.scrollableDiv.style.top = '0';
        return false;
    }
}
