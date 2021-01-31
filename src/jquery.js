const log = console.log.bind(console)

window.jQuery = function (selector) {
    const elements = document.querySelectorAll(selector)
    const api = {
        addClass(){
            log(elements)
        }
    }
    return api
}