import { Readable } from 'node:stream'

class OneToHundredStream extends Readable { //cria uma classe que herda de readable
    index = 1  //criando variável sem passar tipo?? 

    _read() {
        const i = this.index++ //relembrar classes e this

        // if(i > 100) {
        //     this.push(null)
        // } else {
        //     const buf = Buffer.from(String(i))

        //     this.push(buf)   
        // }

        setTimeout(() => {
            if(i > 5) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
        }, 1000)
    }
}

fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: 'half'
}).then(response => {
    response.text().then(data => {
        console.log(data)
    })
})