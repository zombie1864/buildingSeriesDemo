import data from './data/data.json' // export of JSON by configuring ts with "resolveJsonModule": true

class Main { // this is the blueprint for the main obj, used to structure the obj 
    style: string 
    tableTag: string
    dataObj: any
    mapContainer: string
    
    constructor() { // no params - reason: inst of main will simply produce a table 
        this.style = '<style>'
        this.tableTag = `<table style="border: 1px solid black; border-collapse: collapse">`
        this.dataObj = data
        this.mapContainer = '<div style="float:left;overflow:hidden"id="map"></div>'
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
        return result + '</table>'
    } // end of func

    mapComp = ():string => { // REMOVE THIS LATER 
        let divContainer: string = this.mapContainer // gives the div 
            // functionScript: string 

        return (divContainer )
    }

    cssStyle = (): string => {
        return '</style>'
    }

    initMap = () => {
        return '<body>\
        <script>\
        function initMap(){\
            let options = {\
                zoom: 18, \
                center: {\
                    lat:40.71846,\
                    lng: -73.99391\
                }\
            };\
            let map = new google.maps.Map(document.getElementById("map"), options);\
        }\
        </script>\
        </body>'
    }
}

export default Main