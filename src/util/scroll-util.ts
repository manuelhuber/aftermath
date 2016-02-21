function getY (element : HTMLElement) : number {
    let result : number = 0;
    do {
        result += element.offsetTop;
    } while (element = <HTMLElement> element.offsetParent);

    return result;
}

export function scrollSmooth (element : HTMLElement, time : number = 500) : void {
    let x : number = pageXOffset;
    let yStart : number = scrollY;
    let yEnd : number = getY(element) - 45;
    if (yEnd < 0) { yEnd = 0; }
    let yDelta : number = yEnd - yStart;
    let startTime : number = null;

    requestAnimationFrame(function step (timestamp : number) : void {
        if (!startTime) { startTime = timestamp; }
        let progress : number = (timestamp - startTime) / time;

        if (progress > 1) {
            // already done
            scrollTo(x, yEnd);
            return;
        }

        let currentDelta : number = yDelta * progress;
        scrollTo(x, yStart + currentDelta);

        requestAnimationFrame(step);
    });

}
