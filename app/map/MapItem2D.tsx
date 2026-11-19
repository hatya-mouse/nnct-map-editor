import { useMemo } from "react";
import { MapItem, toCanvasCoord } from "./map";

const radius = 12;

export default function MapItem2D({ item }: { item: MapItem }) {
    const canvasPos = useMemo(() => {
        return toCanvasCoord(item.pos);
    }, [item.pos]);

    return (
        <svg
            className="absolute"
            width={radius * 2}
            height={radius * 2}
            style={{
                left: `${canvasPos.x - radius}px`,
                top: `${canvasPos.y - radius}px`,
            }}
        >
            <circle cx={radius} cy={radius} r={radius} fill="royalblue" />
        </svg>
    );
}
