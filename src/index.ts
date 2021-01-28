import data from './data/data.json' // export of JSON by configuring ts with "resolveJsonModule": true

class Main { // this is the blueprint for the main obj, used to structure the obj 
    bdbid: number; 
    building_name: string; 
    address: string; 
    year_built: string; 
    total_bldg_gross_sq_ft: number; 
    parent_record_id: any; // this is found to be null but look into it later 
    oper_agency_acronym: string; 
    epapm_primary_function: string;
    outofservice: boolean; 
    latitude: number; 
    longitude: number; 

    constructor() {

    }
    
    format() {
        return data.count.toString()
    }
    results() {
        return JSON.stringify(data)
    }

    render() {
        // console.log('hello');
        // let t = .createElement('h1')
        // t.innerText = 'test'
        // return t
    }
}

export default Main