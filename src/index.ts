import data from './data/data.json' // export of JSON by configuring ts with "resolveJsonModule": true

class Main { // this is the blueprint for the main obj, used to structure the obj 
    tableTag: string
    dataObj: any
    
    constructor() { // no params - reason: inst of main will simply produce a table 
        this.tableTag = `<table style="border: 1px solid black; border-collapse: collapse">`
        this.dataObj = data
    }
    
    tableComp = ():string => { // appends th to table tag 
        let result: string = this.tableTag; // gives the table tag 
        const arrOfColName = Object.keys(data.results[0]) // ds is [key1,...,key2]
        const arrOfDataObj = data.results // is is [{},...,{}]
        arrOfColName.forEach( colName => { // iterates thr [key1,...,key2]
            if (colName === "energy_breakdown" || colName === "co2eui_breakdown") return 
            result += `<th style="border: 1px solid black; border-collapse: collapse">${colName}`.toString() // concats th to table tag 
        })
        result += '<tr></tr>'
        arrOfDataObj.forEach( dataObj => { //iterates thr [{},...,{}]
            let dataObjValues = Object.values(dataObj) // ds is [val1,...,val2]
            dataObjValues.forEach( (value) => {
                if ( 
                    typeof value === 'number' || 
                    typeof value === 'string' ||
                    typeof value === 'boolean'
                ) {
                    result += `<td style="border: 1px solid black; border-collapse: collapse">${value}</td>`.toString()
                } else if ( value === null ) {
                    result += '<td style="border: 1px solid black; border-collapse: collapse">null</td>'
                } else {
                    result += '<tr></tr>'
                }
            })
        }) // end of iterates thr [{},...,{}]
        return result
    } // end of func
}

export default Main