import e from "express";
import { difference } from "lodash";
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

export const transformPayload = (payload) => {
    return payload.map((currentpayloadInterval) => {
        const totalMinutes = (convertTimeToNumber(currentpayloadInterval.start)*60) + currentpayloadInterval.duration
        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60  
        return {
            id:currentpayloadInterval.id,
            duration : [currentpayloadInterval.start, `${hours<10? "0"+hours:hours}:${minutes<10? minutes+"0":minutes}`]
        }
    })
}

export const sortMatrix = (matrix) => {
    return matrix.sort((a,b)=> b.length - a.length )
}

export const removeRedundancy = (matrix, index) => {
    const newMatrix = []
    let currIndex = -1
    //matrix.forEach((matrixElement,currIndex) => {
    for (const matrixElement of matrix ){
        currIndex++;
        if( currIndex > index){
            const diff = difference(matrixElement, matrix[index]);
            if(diff.length){
                newMatrix.push(diff)
            }
        }else {
            newMatrix.push(matrixElement)
        }
    }
    if( matrix.length === newMatrix.length){
        return newMatrix
    }else {
        return removeRedundancy(newMatrix, index+1)
    }
}

export const getOverLappingMatrixIds = payload => {
    const intervals = transformPayload(payload)
    const dayIntervals = dayByMinntes(30)
    const matrix = []
    dayIntervals.forEach( (currenDayInterval, index) => {
            intervals.forEach(element => {
                const hasOverLapping1 = isOverlapping([currenDayInterval], element.duration )
                const hasOverLapping2 = isOverlapping([element.duration], currenDayInterval  )
                if(hasOverLapping1 && hasOverLapping2 ) {
                    matrix[index] =matrix[index] && matrix[index].length  ? [...matrix[index],element.id] : [element.id]
                } 
            });
        })
    
    return removeRedundancy(sortMatrix(matrix.filter(item => item)), 0)
    
}

export const dayByMinntes = (minute) => {
    let currentMinute = 0
    const dayIntervals  = []
    while(currentMinute <= (1440- minute)){
        const firstHours = Math.floor(currentMinute / 60)
        const firstMinutes = currentMinute % 60 
        currentMinute += minute
        const secondHours = Math.floor(currentMinute / 60)
        const secondMinutes = currentMinute % 60 
        dayIntervals.push(
            [
                `${firstHours<10? "0"+firstHours:firstHours}:${firstMinutes<10? firstMinutes+"0":firstMinutes}`,
                `${secondHours<10? "0"+secondHours:secondHours}:${secondMinutes<10? secondMinutes+"0":secondMinutes}`
            ]
        )
    }
   
    return dayIntervals
}