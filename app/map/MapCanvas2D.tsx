import { useRef } from "react";
import MapItem2D from "./MapItem2D";
import { Coord, MapItem, toMapCoord } from "./map";

export default function MapCanvas2D({
    items,
    onClick,
}: {
    items: MapItem[];
    onClick?: (coord: Coord) => void;
}) {
    const mapRef = useRef<HTMLDivElement>(null);

    const getMapCoord = (e: React.PointerEvent) => {
        const rect = mapRef.current!.getBoundingClientRect();
        return {
            x: Math.round(e.clientX - rect.left),
            y: Math.round(e.clientY - rect.top),
        };
    };

    return (
        <div className="overflow-auto">
            <div
                ref={mapRef}
                onPointerDown={(e) => {
                    if (onClick && e.target === mapRef.current) {
                        onClick(toMapCoord(getMapCoord(e)));
                    }
                }}
            >
                {items.map((item) => (
                    <MapItem2D key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}
