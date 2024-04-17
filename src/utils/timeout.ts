function clearTimeouts(timeouts: (NodeJS.Timeout|undefined)[]) {
    for (let timeout of timeouts) {
        clearTimeout(timeout);
    }
}

export {
    clearTimeouts
}