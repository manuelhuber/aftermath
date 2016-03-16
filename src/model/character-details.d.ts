declare interface CharacterDetails {

    // General stuff left side (on the character sheet)
    name : string;
    homeWorld : string;
    background : string;
    role : string;
    eliteAdvances : string;
    divination : string;
    about : string;
    // General stuff right side (on the character sheet)
    gender : string;
    age : string;
    build : string;
    complexion : string;
    quirks : string;
    superstition : string;
    momentos : string;
    allies : string;
    enemies : string;

    story : string;

    aptitudes : string[];

    // Bad stuff
    insanity : number;
    mentalDisorders : string[];
    corruption : number;
    malignancies : string[];
    mutations : string[];

    // XP
    experienceEarned : number;
    characteristicExperience : number;
    skillExperience : number;
    talentExperience : number;
    psykerExperience : number;
    experienceAvailable : number;

    // Characteristics
    characteristics : Characteristics;

    homeworldBonus : string;
    backgroundBonus : string;
    roleBonus : string;

    skills : Skill[];

    talents : Talent[];

    fatePoints : number;
    wounds : number;

    items : Item[];

    sins : Sins;

    personality : QuestionAnswer[];

    relationships : QuestionAnswer[];

}

declare interface Characteristics {
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
}

declare interface Talent {
    name : string;
    description : string;
    comment : string;
}

declare interface Item extends Sortable {
    type : string;
    description : string;
    image : string;
}

declare interface Skill {
    name : string;
    rank : number;
    total : number;
}

declare interface Sins {
    gluttony : number;
    greed : number;
    sloth : number;
    envy : number;
    wrath : number;
    pride : number;
    lust : number;
}

declare interface QuestionAnswer {
    question : string;
    answer : string;
}
