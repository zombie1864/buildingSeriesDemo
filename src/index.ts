import data from './data/data.json' // export of JSON by configuring ts with "resolveJsonModule": true

class Main { // this is the blueprint for the main obj, used to structure the obj 
    html: string 
    style: string 
    tableTag: string
    dataObj: any
    mapContainer: string
    
    constructor() { // no params - reason: inst of main will simply produce a table 
        this.html = '<head><script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyACIaoXM5khxJYc827L7Eq74OtnmPffMA0&callback=initMap"></script><title>Test</title>'
        this.style = '<style type="text/css">'
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

    cssStyle = (): string => { // work on the css
        let start = this.html
        let result = this.style
        start += result
        result += '\
            #map {\
                width: 400px;\
                height: 400px;\
            }\
        </style>'

        // return '</style>'
        return result + '</head>'
    }

    initMap = (): string => { // creates map 
        let result = '<body><script>', 
            addMarker = 'function addMarker(props){\
                let marker = new google.maps.Marker({\
                    position: props.coords,\
                    map: map\
                });\
            }'

        result += 'function initMap(){\
            let options = {\
                zoom: 14, \
                center: { lat:40.71846, lng: -73.99391 }\
            };\
            let map = new google.maps.Map(document.getElementById("map"), options);\
        '
        result += addMarker 

        const arrOfDataObj = data.results // ds is [{},...,{}]
        arrOfDataObj.forEach( obj => { // graps each {}
            let latVal = obj.latitude // graps the values of lat 
            let lngVal = obj.longitude // graps the values of lng 
            result += `addMarker({ coords: { lat:${latVal}, lng:${lngVal} } });`
        })
        result += '};</script></body>'
        return result
    } // end of func 
}

export default Main
