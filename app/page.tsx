"use client";

import { useState } from "react";
import MapCanvas2D from "./map/MapCanvas2D";
import { Coord, MapItem } from "./map/map";
import {
    NumberInput,
    NumberInputDecrement,
    NumberInputGroup,
    NumberInputIncrement,
    NumberInputInput,
} from "@/components/ui/number-input";

export default function Home() {
    const [newId, setNewId] = useState<number>(0);
    const [items, setItems] = useState<MapItem[]>([]);
    const [floor, setFloor] = useState<number>(1);

    const addItem = (pos: Coord) => {
        const newItem = {
            id: `${newId}`,
            pos: pos,
            label: "Point",
        };
        setNewId(newId + 1);
        console.log("added item", newItem);
        setItems([...items, newItem]);
    };

    return (
        <main className="w-screen h-screen flex flex-col gap-0">
            <header className="h-12 px-2 py-1 flex flex-row gap-0 items-center">
                <NumberInput
                    className="w-full max-w-48"
                    value={floor}
                    onValueChange={({ value }) => setFloor(parseInt(value))}
                >
                    <NumberInputGroup>
                        <NumberInputDecrement />
                        <NumberInputInput />
                        <NumberInputIncrement />
                    </NumberInputGroup>
                </NumberInput>
            </header>

            <MapCanvas2D items={items} onClick={addItem} />
        </main>
    );
}
