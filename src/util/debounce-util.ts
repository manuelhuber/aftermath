import Timer = NodeJS.Timer;
export interface DebouncedFunction {
    (...args : any[]) : any;
}

export function debounce (func : DebouncedFunction, wait : number) : () => void {
    // 'private' variable for instance
    // The returned function will be able to reference this due to closure.
    // Each call to the returned function will share this common timer.
    let timeout : Timer;

    // Calling debounce returns a new anonymous function
    return function () : void {

        // This is the basic debounce behaviour where you can call this
        //   function several times, but it will only execute once
        //   [before or after imposing a delay].
        //   Each time the returned function is called, the timer starts over.
        clearTimeout(timeout);

        // Set the new timeout
        timeout = setTimeout(function () : void {

            // Check if the function already ran with the immediate flag
            let args : any[] = [].slice.call(arguments);
            // Call the original function with apply
            // apply lets you define the 'this' object as well as the arguments
            //    (both captured before setTimeout)
            func.apply(null, args);
        }, wait);

    };
};
