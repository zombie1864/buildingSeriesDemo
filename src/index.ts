// CHECK POINT - 4
class Main  { // this is the blueprint for the main obj, used to structure the obj 
    private html: string 
    private style: string 
    private tableTag: string
    private mapContainer: string
    private mainResult: string
    
    constructor(private data: any) { // no params - reason: inst of main will simply produce a table 
        this.html = '<head><script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyACIaoXM5khxJYc827L7Eq74OtnmPffMA0&callback=initMap"></script><title>@zxc</title>'
        this.style = '<style type="text/css">'
        this.tableTag = `<table style="border: 1px solid black; border-collapse: collapse">`
        this.mapContainer = '<div style="float:left;overflow:hidden"id="map"></div>'
        this.mainResult = ''
    }
    private mainHeadTag = (): string => { 
        let htmlHead: string = this.html
        htmlHead += this.style
        htmlHead += '\
            #map {\
                width: 50%;\
                height: 800px;\
            }\
        </style>'
        this.mainResult += htmlHead + '</head>'
        return this.mainResult
    }

    private initMap = (): string => { // creates map 
        let result:string = '', 
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
        result += this.mainHeadTag() + '<body><script>'
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
        this.mainResult += result + this.mapContainer
        return this.mainResult
    } // end of func 

    private tableComp = ():string => { // appends th to table tag 
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
        this.mainResult += this.initMap() + '<div id="table">' + result + '</table>' + '</div>'
        return this.mainResult
    } // end of func

    private tableCssStyle = ():string => {
        this.mainResult += this.tableComp() + '\
        <style>\
            #table {\
                float: left;\
                width: 50%;\
                height: 800px;\
                overflow-y: scroll;\
            }\
        </style>'
        
        return this.mainResult
    }

    _getMainResult(): string {
        return this.tableCssStyle()
    }
}

export default Main
