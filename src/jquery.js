const log = console.log.bind(console)

window.jQuery = function (selector) {
    const elements = document.querySelectorAll(selector)
    return {
        addClass(className){
            for(let i=0;i<elements.length;i++){
                elements[i].classList.add(className)
                // 用闭包来维持函数（elements - addClass）
            }
            return this // return 的对象就是调用函数里面的 this
        },
        find(selector){
            
        }
    }
}