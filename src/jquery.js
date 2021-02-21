const log = console.log.bind(console)

window.$ = window.jQuery = function (selectorOrArray) {
    let elements
    if(typeof selectorOrArray === 'string'){
        elements = document.querySelectorAll(selectorOrArray)
    } else if(selectorOrArray instanceof Array){
        elements = selectorOrArray
    }
    const api = Object.create(jQuery.prototype)
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArray
    })
    return api
}

jQuery.fn = jQuery.prototype = {
    jquery: true,
    constructor: jQuery,
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
    children(){
        const array = []
        this.each((node)=>{
            array.push(...node.children)
        })
        return jQuery(array)
    },
    print(){
        log(elements)
    },
    get(index) {
        return this.elements[index];
    },
    appendTo(node) {
        if (node instanceof Element) {
            this.each(el => node.appendChild(el));
        } else if (node.jquery === true) {
            this.each(el => node.get(0).appendChild(el));
        }
    },
    append(children) {
        if (children instanceof Element) {
            this.get(0).appendChild(children);
        } else if (children instanceof HTMLCollection) {
            for (let i = 0; i < children.length; i++) {
            this.get(0).appendChild(children[i]);
            }
        } else if (children.jquery === true) {
            children.each(node => this.get(0).appendChild(node));
        }
    },
}