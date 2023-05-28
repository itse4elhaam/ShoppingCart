import { useState, useEffect } from "react";


// a combo of two hooks that helps us in storing everything together in local storage
// <T> means generic state basically "any"
export function useLocalStorage<T>(key:string, initialValue:T | (() => T)) {
    
    const [value, setValue] = useState<T>(() =>{
        const jsonValue = localStorage.getItem(key);

        if (jsonValue !== null){ return JSON.parse(jsonValue);}

        // boiler plate TP code to make sure it doesn't scream
        if (typeof initialValue === "function" ){
            return (initialValue as () => T);
        }
        else{
            return initialValue;
        }
    })

    // will set item each time any of these value changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    
    return [value, setValue] as [typeof value, typeof setValue];
    
}