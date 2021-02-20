const log = console.log.bind(console)

const api1 = jQuery('.test')
api1.addClass('blue')

const api2 = api1.find('child').addClass('red')

api1.addClass('green')
