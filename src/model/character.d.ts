//declare const BARBARIAN : string = 'BARBARIAN';
//declare const BARD : string = 'BARD';
//declare const CLERIC : string = 'CLERIC';
//declare const DRUID : string = 'DRUID';
//declare const FIGHTER : string = 'FIGHTER';
//declare const MONK : string = 'MONK';
//declare const PALADIN : string = 'PALADIN';
//declare const RANGER : string = 'RANGER';
//declare const ROGUE : string = 'ROGUE';
//declare const SORCERER : string = 'SORCERER';
//declare const WARLOCK : string = 'WARLOCK';
//declare const WIZARD : string = 'WIZARD';

declare interface CharacterModel {
    id : number;
    name : string;
    image : string;
    experience : number;
    description : string;
    achievements : number[];
    items : number[];
}
