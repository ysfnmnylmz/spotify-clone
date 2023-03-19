const msToMinutes = (ms: number) => {
    const minute = Math.floor(ms / 1000 / 60);
    const seconds = ms - (minute * 60000)
    const sec = seconds<10000 ? seconds<1000 ? `00` : `0${String(seconds).substring(0,1)}` : String(seconds).substring(0, 2)
    return `${minute}:${sec}`
}

export default msToMinutes;
