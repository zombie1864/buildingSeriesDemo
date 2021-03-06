interface FixtureDataTypes {
    count: number, 
    next: null, 
    previous: null, 
    results: IResults[]
}

interface IResults {
    bdbid: number,
    building_name: string,
    address: string,
    year_built: string | null,
    total_bldg_gross_sq_ft: number | null,
    parent_record_id: null,
    oper_agency_acronym: string,
    epapm_primary_function: string,
    outofservice: boolean,
    latitude: number | null,
    longitude: number | null,
    energy_breakdown: object[],
    co2eui_breakdown: object[]
}

class Main { // this is the blueprint for the main obj, used to structure the obj 
    private html: string 
    private style: string 
    private tableTag: string
    private mapContainer: string
    private mainResult: string
    private data: FixtureDataTypes // data is made globally 
    
    public constructor( data: FixtureDataTypes ) { // constr func, data is local to constr func 
        this.html = '<head><script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyACIaoXM5khxJYc827L7Eq74OtnmPffMA0&callback=initMap"></script><title>@zxc</title>'
        this.style = '<style type="text/css">'
        this.tableTag = `<table style="border: 1px solid black; border-collapse: collapse">`
        this.mapContainer = '<div style="float:left;overflow:hidden"id="map"></div>'
        this.mainResult = ''
        this.data = data 
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
            zoomLvl = 10,
            centerLat = 40.71846, 
            centerLng = -73.99391,
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
        this.mainHeadTag() // this turns mainHeadTag 'on' -- exec the code inside it since it is private
        result += '<script>' 
        result += `function initMap(){\
            let options = {\
                zoom: ${zoomLvl}, \
                center: { lat:${centerLat}, lng: ${centerLng} }\
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
        result += '};</script>'
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

    public mainRes(): string {
        return this.tableCssStyle()
    }
}

export default Main
