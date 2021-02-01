import data from './data/data.json' // export of JSON by configuring ts with "resolveJsonModule": true

class Main { // this is the blueprint for the main obj, used to structure the obj 
    googleMapsApi: string 
    // gmapsJsLib: string 
    gmapsStyleTag: string 
    gmapsDemo: string 
    style: string 
    tableTag: string
    dataObj: any
    mapContainer: string
    
    constructor() { // no params - reason: inst of main will simply produce a table 
        this.googleMapsApi = '<script src="http://maps.google.com/maps/api/js?sensor=true"></script>'
        // this.gmapsJsLib = '<script src="gmaps.core.js"></script>'
        this.gmapsStyleTag = '<style type="text/css">    #map {\
            width: 400px;\
            height: 400px;\
          }\
        </style>'
        this.gmapsDemo = '  <div id="map"></div><script>\
         var map = new GMaps({ el : "#map", lat: -12.0433, lng: -77.0283, zoom: 12 });\
         </script>'
        this.style = '<style>'
        this.tableTag = `<table style="border: 1px solid black; border-collapse: collapse">`
        this.dataObj = data
        this.mapContainer = '<div style="float:left;overflow:hidden">'
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

    mapComp = ():string => {
        let result: string = this.mapContainer // gives the div 

        return result += '</div>'
    }

    cssStyle = (): string => {
        return '</style>'
    }
}

export default Main