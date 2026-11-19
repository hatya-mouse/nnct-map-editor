"use client";

import { useState } from "react";
import MapCanvas2D from "./map/MapCanvas2D";
import { Coord, MapItem } from "./map/map";

export default function Home() {
    const [newId, setNewId] = useState<number>(0);
    const [items, setItems] = useState<MapItem[]>([]);

    const addItem = (pos: Coord) => {
        const newItem = {
            id: `${newId}`,
            pos: pos,
            label: "Point",
        };
        setNewId(newId + 1);
        setItems([...items, newItem]);
    };

    return (
        <main>
            <MapCanvas2D items={items} onClick={addItem} />
        </main>
    );
}
