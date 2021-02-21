const log = console.log.bind(console)

const x = jQuery('.test')
    .find('.child')
x.each((div)=>log(div))
