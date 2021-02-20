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
            let array = []
            for (let i = 0; i < elements.length; i++) {
                const elements2 = Array.from(elements[i].querySelectorAll(selector))
                // 不变下面连接结果就不是真正的数组了
                array = array.concat(elements2)
            }
            return array
        }
    }
}