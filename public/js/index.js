//socket cliente
const socket = io()
socket.emit('message', 'Comunicacion Establecida')

console.log('Test: Estoy en el index');