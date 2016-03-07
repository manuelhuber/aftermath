import {ItemModel} from './item';
declare interface CharacterDetailsModel {

    // General stuff
    name : string;
    role : string;
    about : string;
    story : string;
    experienceEarned : number;

    age : string;
    look : string;
    build : string;
    quirks : string;
    superstition : string;

    // Characteristics
    weaponSkill : number;
    ballisticSkill : number;
    strength : number;
    toughness : number;
    agility : number;
    intelligence : number;
    perception : number;
    willpower : number;
    fellowship : number;
    influence : number;

    skills : {(name : string) : number};


    talents : string[];

    items : ItemModel[];

}
