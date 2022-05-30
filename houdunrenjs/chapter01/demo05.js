'use strict'
const HOST = {
    url: 'https://hdr.com',
    port: 443
}
Object.freeze(HOST)
// HOST.port = 80
console.log(HOST);

let a = 1
let b = a
console.log(a, b);
b = 3
console.log(a, b);

let e = {
    name: 'hdr'
}
let f = e
console.log(e, f);
f.name = 'hdr.com'
console.log(e, f);


let m = 324;
let n;
console.log(typeof m);
console.log(typeof n);

function start(num) {
    console.log(typeof name);
    num = num || 5
    if (num == undefined) {
        num = 5
    }
    for (let i = 0; i < num; i++) {
        console.log('*');
    }

}
start()


function show(){
    'use strict'
    web = 'hdr.com'
}
// show()


let {naming,url} = {naming:'hdr','url':'hdr.com'}
// 简写
({naming,url} = {naming:'hdr','url':'hdr.com'})
console.log(naming);


