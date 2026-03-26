// Streams -> 

// process.stdin
//     .pipe(process.stdout)

import { Readable, Transform, Writable } from 'node:stream'; //importa o módulo de leitura nativo do node

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
            if(i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
        }, 1000)
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, enconding, callback) {
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, enconding, callback){
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())