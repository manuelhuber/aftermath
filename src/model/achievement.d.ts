import './sortable.d.ts';

declare interface AchievementModel extends Sortable {
    id : number;
    description : string;
    image : string;
    earnedBy : number[];
}
