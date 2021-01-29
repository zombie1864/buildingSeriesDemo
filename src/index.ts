import data from './data/data.json' // export of JSON by configuring ts with "resolveJsonModule": true

class Main { // this is the blueprint for the main obj, used to structure the obj 
    table: string
    dataObj: any

    constructor() { // no params - reason: inst of main will simply produce a table 
        this.table = `<table>`
        this.dataObj = data
    }
    
    addColName = () => { // appends th to table tag 
        let result: string = this.table; // gives the table tag 
        const arrOfColName = Object.keys(data.results[0]) // ds is [key1,...,key2]
        arrOfColName.forEach( colName => {
            result += `<th>${colName}`.toString() // concats th to table tag 
        })
        // this.addTd(result)
        return result
    } // end of func

    addTd = () => { // the idea is here 
        let result = this.addColName()
        const arrOfDataObj = data.results // ds is [{},...,{}]
        arrOfDataObj.forEach( dataObj => {
            let dataObjValues = Object.values(dataObj) // ds is [val1,...,val2]
            dataObjValues.forEach( value => {
                result += `<td>${value}</td>`.toString()
            })
        })

        return result
    }

    renderWorld() {
        return (this.table + '<h1>World</h1>').toString()
    }
}

export default Main