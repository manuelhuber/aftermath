declare interface VehicleDetails {
    name: string;
    type: string;
    front: number;
    side: number;
    rear: number;
    cruisingSpeed: number;
    tacticalSpeed: number;
    manoeuvrability: number;
    carryingCapacity: number;
    integrity: number;
    size: string;
    crew: string;
    traits: Trait[];
    weapons: Item[];
}

declare interface Trait {
    name: string;
    description: string;
}
