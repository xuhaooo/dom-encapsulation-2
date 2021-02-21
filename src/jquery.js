const log = console.log.bind(console)

window.jQuery = function (selectorOrArray) {
    let elements
    if(typeof selectorOrArray === 'string'){
        elements = document.querySelectorAll(selectorOrArray)
    } else if(selectorOrArray instanceof Array){
        elements = selectorOrArray
    }
    return {
        oldApi: selectorOrArray.oldApi,
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
            array.oldApi = this // this 是旧的 api
            return jQuery(array)
        },
        end(){
            return this.oldApi // this 是新的 api
        },
        each(fn){
            for (let i = 0; i < elements.length; i++){
                fn.call(null, elements[i], i)
            }
            return this
        },
        parent(){
            const array = []
            this.each((node)=>{
                if(array.indexOf(node.parentNode) === -1){
                    array.push(node.parentNode)
                }
            })
            return jQuery(array)
        },
        print(){
            log(elements)
        }
    }
}