export const server = {
    protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
    domain: process.env.NODE_ENV === 'production' ? 'marvelapp.creaciondepaginasweb.co' : 'localhost',
    port: process.env.NODE_ENV === 'production' ? '': '2000',
    get: function() {
        return this.protocol+'://'+this.domain+':'+this.port
    }
}

export const general = {
    color_button_modal: 'rgb(0, 0, 0)'
}