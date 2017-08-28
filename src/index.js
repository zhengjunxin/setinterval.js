export default function interval(callback, delay = 1000) {
    const everyTime = (new Date().getMilliseconds()) % delay

    // 用于清除 setTimeout
    let timeoutID = setTimeout(adjuster, delay)

    // 校准函数，保证时间的精准
    function adjuster() {
        const now = new Date()
        const wakeupTime = now.getMilliseconds()
        const nextTime = delay + everyTime - (wakeupTime % delay)
        timeoutID = setTimeout(adjuster, nextTime)

        callback()
    }

    return function clearInterval() {
        clearTimeout(timeoutID)
    }
}
