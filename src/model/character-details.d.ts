import {ItemModel} from './item';
declare interface CharacterDetailsModel {

    // General stuff
    name : string;
    role : string;
    about : string;
    story : string;

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

    experienceEarned : number;

    talents : string[];

    items : ItemModel[];

}
