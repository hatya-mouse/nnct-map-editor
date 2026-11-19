import { useMemo } from "react";
import { MapItem, toCanvasCoord } from "./map";

export default function MapItem2D({ item }: { item: MapItem }) {
    const canvasPos = useMemo(() => {
        return toCanvasCoord(item.pos);
    }, [item.pos]);

    return (
        <svg>
            <circle cx={canvasPos.x} cy={canvasPos.y} r="40" fill="royalblue" />
        </svg>
    );
}
