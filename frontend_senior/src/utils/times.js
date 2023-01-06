export const getBoxHight = (windowHight, duration) => {
    return Math.floor((windowHight/1440)* duration)
}

export const convertTimeToNumber = (time) => {
    const [hours, minutes] = time.split(':')
    return Number(hours)+(Number(minutes) /60) || 0
}

export const sortInterval = (intervals) => {
    return intervals.sort((intA,intB) => {
        const startA = convertTimeToNumber(intA[0])
        const endA = convertTimeToNumber(intA[1])

        const startB = convertTimeToNumber(intB[0])
        const endB = convertTimeToNumber(intB[1])

        if(startA > endB) return 1
        if(startB > endA) return -1
        return 0
    })
}

export const isOverlapping = (intervals, newInterval) => {
    const startNewInterval = convertTimeToNumber(newInterval[0])
    const endNewInterval = convertTimeToNumber(newInterval[1])
    for( const currentInterval of intervals) {
        const startCurrentInterval = convertTimeToNumber(currentInterval[0])
        const endCurrentInterval = convertTimeToNumber(currentInterval[1])
        if( startNewInterval < endNewInterval 
            && 
            endNewInterval > startCurrentInterval
            ){
                return true
            }
    }
    return false
}