import { useState } from "preact/hooks";


export default function Counter() {
    const [counter, setCounter] = useState(0);

    return (
        <div class='flex flex-col gap-y-4 items-center justify-center my-10'>
            <div class='flex flex-row gap-x-4 items-center justify-center my-0'>
                <button class='border py-2 w-24 text-xl cursor-pointer' onClick={() => setCounter(counter + 1)}>+</button>
                <button class='border py-2 w-24 text-xl cursor-pointer' onClick={() => setCounter(counter - 1)}>-</button>
            </div>
            <span class='text-3xl bg-slate-700 text-slate-100 py-2 w-24 text-center rounded-md'>{counter}</span>
        </div>
    )
}