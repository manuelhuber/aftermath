declare interface Article {
    'heading' : string;
    'content' : string;
    'subcontent' ?: Subcontent[];
}

declare interface Subcontent {
    'heading' : string;
    'content' : string;
}
