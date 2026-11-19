export interface MapItem {
    id: string;
    pos: Coord;
    label: string;
}

export interface Coord {
    x: number;
    y: number;
}

export function toMapCoord(coord: Coord): Coord {
    return {
        x: Math.round(coord.x / 100),
        y: Math.round(coord.y / 100),
    };
}

export function toCanvasCoord(coord: Coord): Coord {
    return {
        x: coord.x * 100,
        y: coord.y * 100,
    };
}
