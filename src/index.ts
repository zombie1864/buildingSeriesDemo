// CHECK POINT
class Main  { // this is the blueprint for the main obj, used to structure the obj 
    html: string 
    style: string 
    tableTag: string
    mapContainer: string
    
    constructor(private data: any) { // no params - reason: inst of main will simply produce a table 
        this.html = '<head><script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyACIaoXM5khxJYc827L7Eq74OtnmPffMA0&callback=initMap"></script><title>@zxc</title>'
        this.style = '<style type="text/css">'
        this.tableTag = `<table style="border: 1px solid black; border-collapse: collapse">`
        this.mapContainer = '<div style="float:left;overflow:hidden"id="map"></div>'
    }

    tableComp = ():string => { // appends th to table tag 
        let result: string = this.tableTag; // gives the table tag 
        Object.keys(this.data.results[0]).forEach( colName => { // iterates thr [key1,...,key2]
            if (colName === "energy_breakdown" || colName === "co2eui_breakdown") return 
            result += `<th style="border: 1px solid black; border-collapse: collapse">${colName}`.toString() // concats th to table tag 
        })
        result += '<tr></tr>'
        this.data.results.forEach( function(dataObj:any) { //iterates thr [{},...,{}]
            Object.values(dataObj).forEach( (value) => {
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

    initMap = (): string => { // creates map 
        let result:string = '<body><script>', 
            addMarker:string = 'function addMarker(props){\
                let marker = new google.maps.Marker({\
                    position: props.coords,\
                    map: map\
                });\
                if (props.content) {\
                    let infoWindow = new google.maps.InfoWindow({ content: props.content });\
                    marker.addListener("mouseover", () => {\
                        infoWindow.open(map, marker);\
                    });\
                    marker.addListener("mouseout", () => {\
                        infoWindow.close();\
                    });\
                }\
            }'

        result += `function initMap(){\
            let options = {\
                zoom: 10, \
                center: { lat:40.71846, lng: -73.99391 }\
            };\
            let map = new google.maps.Map(document.getElementById("map"), options);\
        `
        result += addMarker 

        const arrOfDataObj = this.data.results // ds is [{},...,{}]
        arrOfDataObj.forEach( function(obj:any) { // graps each {}
            if ( obj.latitude === null || obj.longitude === null ) return 
            result += `addMarker({\
                coords: { lat:${obj.latitude}, lng:${obj.longitude} },\
                content: "<h1>${obj.building_name}-id:${obj.bdbid}</h1>"\
            });`
        })
        result += '};</script></body>'
        return result
    } // end of func 

/*****************************************************************************/
// ----------------------------[ CSS ]----------------------------
/*****************************************************************************/
mapCssStyle = (): string => { 
    let result:string = this.style
    result += '\
        #map {\
            width: 50%;\
            height: 800px;\
        }\
    </style>'
    return result + '</head>'
}

    tableCssStyle = ():string => {
        return '\
        <style>\
            #table {\
                float: left;\
                width: 50%;\
                height: 800px;\
                overflow-y: scroll;\
            }\
        </style>'
    }
}

export default Main
