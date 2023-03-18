const msToMinutes = (ms: any) => {
    const minute = Math.floor(ms / 1000 / 60);
    const seconds = ms - (minute * 60000)
    return `${minute}:${String(seconds).substring(0, 2)}`
}

export default msToMinutes;
