import data from './data/data.json' // export of JSON by configuring ts with "resolveJsonModule": true

class Main { // this is the blueprint for the main obj, used to structure the obj 
    client: string; 
    // details: string; 
    // amount: number 

    constructor() {
        this.client = '<html><body><h1>hello world</h1></body></html> '
        // this.details = d; 
        // this.amount = a; 
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