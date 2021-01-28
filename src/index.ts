class Main {
    client: string; 
    details: string; 
    amount: number 

    constructor(c: string, d: string, a: number) {
        this.client = c; 
        this.details = d; 
        this.amount = a; 
    }
    
    format() {
        return `${this.client} owes $${this.amount} for ${this.details}`
    }

    // render() {
    //     console.log('hello');
    //     let t = document.createTextNode("jeff");
    //     return t
    // }
}

// const invOne = new Main('j', 'working', 200)
// console.log(invOne);


export default Main