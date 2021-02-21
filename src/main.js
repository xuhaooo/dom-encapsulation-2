const log = console.log.bind(console)

jQuery('.test')
    .find('.child')
    .addClass('red')
    .addClass('blue')
    .addClass('green')
    .end()
    .addClass('yellow')
