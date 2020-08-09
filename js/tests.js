var expect = chai.expect;

//Requerimiento: Función para reservar horario cuando se le pasa un horario válido

describe('Testeando reservarHorario(horario)', function(){
    it('Al reservar un horario, el arreglo de horarios debería eliminar el horario seleccionado',function(){
        //realizo la prueba con un restaurante con los horarios ["12:00", "13:30", "16:00"]
        let listadoDePrueba = new Listado(listadoDeRestaurantes)
        let restaurante = listadoDePrueba.restaurantes[4];
        let cantidadDeHorariosAnterior = restaurante.horarios.length;
        let horarioAReservar = "13:30";
        restaurante.reservarHorario(horarioAReservar);
        expect(restaurante.horarios.length).to.equal(cantidadDeHorariosAnterior - 1);
        expect(restaurante.horarios.indexOf(horarioAReservar)).to.equal(-1);
    })

    it('Al reservar un horario que el restaurant no posee, el arreglo se mantiene igual.',function(){
        //realizo la prueba con un restaurante con los horarios ["14:30", "15:30", "19:00"]
        let listadoDePrueba = new Listado(listadoDeRestaurantes)
        let restaurante = listadoDePrueba.restaurantes[7];
        let cantidadDeHorariosAnterior = restaurante.horarios.length;
        let horarioAReservar = "14:00";
        restaurante.reservarHorario(horarioAReservar);
        expect(restaurante.horarios.indexOf(horarioAReservar)).to.equal(-1);
        expect(restaurante.horarios.length).to.equal(cantidadDeHorariosAnterior);
    })

    it('Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.',function(){
        //realizo la prueba con un restaurante con los horarios ["12:00", "15:00", "17:30"]
        let listadoDePrueba = new Listado(listadoDeRestaurantes)
        let restaurante = listadoDePrueba.restaurantes[10];
        let cantidadDeHorariosAnterior = restaurante.horarios.length;
        restaurante.reservarHorario();
        expect(restaurante.horarios.length).to.equal(cantidadDeHorariosAnterior);
    })
})

//Requerimiento: Función que calcula el promedio de las puntuaciones obtenidas
describe('Testeando obtenerPuntuación()', function(){
    it('Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente.',function(){
        //realizo la prueba con un restaurante con las puntuaciones [10, 5, 6]
        let listadoDePrueba = new Listado(listadoDeRestaurantes)
        let restaurante = listadoDePrueba.restaurantes[10];
        restaurante.calificaciones = [10, 5, 6];
        expect(restaurante.obtenerPuntuacion()).to.equal(7);
    })

    it('Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.',function(){
        let listadoDePrueba = new Listado(listadoDeRestaurantes)
        let restaurante = listadoDePrueba.restaurantes[14];
        restaurante.calificaciones = [];
        expect(restaurante.obtenerPuntuacion()).to.equal(0);
    })
})

//Requerimiento: Función que toma una calificación entre 1 y 10 y agrega este valor en el array de calificaciones
describe('Testeando calificar(calificacion)', function(){
    it('Si el número es negativo no cambia el array de calificaciones',function(){
        let listadoDePrueba = new Listado(listadoDeRestaurantes)
        let restaurante = listadoDePrueba.restaurantes[14];
        let cantidadDeCalificaciones = restaurante.calificaciones.length;
        restaurante.calificar(-5);
        expect(restaurante.calificaciones.length).to.equal(cantidadDeCalificaciones);
    })

    it('Si el número es mayor a 10 no cambia el array de calificaciones',function(){
        let listadoDePrueba = new Listado(listadoDeRestaurantes)
        let restaurante = listadoDePrueba.restaurantes[14];
        let cantidadDeCalificaciones = restaurante.calificaciones.length;
        restaurante.calificar(500)
        expect(restaurante.calificaciones.length).to.equal(cantidadDeCalificaciones);
    })

    it('Si no se pasa ninguna puntuación no cambia el array de calificaciones',function(){
        let listadoDePrueba = new Listado(listadoDeRestaurantes)
        let restaurante = listadoDePrueba.restaurantes[14];
        let cantidadDeCalificaciones = restaurante.calificaciones.length;
        restaurante.calificar()
        expect(restaurante.calificaciones.length).to.equal(cantidadDeCalificaciones);
    })

    it('Si se pasa un valor entre 1 y 10 se agrega al array de calificaciones',function(){
        let listadoDePrueba = new Listado(listadoDeRestaurantes)
        let restaurante = listadoDePrueba.restaurantes[14];
        let cantidadDeCalificaciones = restaurante.calificaciones.length;
        restaurante.calificar(5)
        expect(restaurante.calificaciones.length).to.equal(cantidadDeCalificaciones + 1);
    })
})

//Requerimiento: Función que busca un restaurante únicamente dando un id valido
describe('Testeando buscarRestaurante(id)', function(){
    it('Si el id no se encuentra o está vacío devuelve undefined',function(){
        let listadoDePrueba = new Listado(listadoDeRestaurantes)
        expect(listadoDePrueba.buscarRestaurante(-2)).to.equal(undefined);
        expect(listadoDePrueba.buscarRestaurante()).to.equal(undefined);
    })
    it('Si el id es válido devuelve un restaurante',function(){
        let listadoDePrueba = new Listado(listadoDeRestaurantes)
        expect(listadoDePrueba.buscarRestaurante(17)).to.be.an.instanceof(Restaurant);
    })
})

//Requerimiento: Función que filtra los restaurantes con las opciones seleccionadas
describe('Testeando obtenerRestaurantes(filtroRubro, filtroCiudad, filtroHorario)', function(){
    it('pasado ningún parametro, muestra todos los restaurantes',function(){
        let listadoDePrueba = new Listado(listadoDeRestaurantes)
        let cantidadDeRestaurantes = listadoDePrueba.length;
        listadoDePrueba.obtenerRestaurantes(null, null, null)
        expect(listadoDePrueba.length).to.equal(cantidadDeRestaurantes);
    })
    it('pasando parcialmente los filtros, devuelve correctamente el listado, pasando uno solo',function(){
        let listadoDePrueba = new Listado(listadoDeRestaurantes)
        let listadoFiltrado = listadoDePrueba.obtenerRestaurantes("Hamburguesa", null, null);
        let contador = 0;
        for (let i = 0; i < listadoDePrueba.restaurantes.length; i++) {
            if (listadoDePrueba.restaurantes[i].rubro === "Hamburguesa") {
                contador = contador + 1
            } 
        }
        expect(listadoFiltrado.length).to.equal(contador);
    })
    it('pasando parcialmente los filtros, devuelve correctamente el listado, pasando 2',function(){
        let listadoDePrueba = new Listado(listadoDeRestaurantes)
        let listadoFiltrado = listadoDePrueba.obtenerRestaurantes(null, "París", "16:00");
        let contador = 0;
        for (let i = 0; i < listadoDePrueba.restaurantes.length; i++) {
            if (listadoDePrueba.restaurantes[i].ubicacion === "París") {
                for (let j = 0; j < listadoDePrueba.restaurantes[i].horarios.length; j++) {
                    if (listadoDePrueba.restaurantes[i].horarios[j] === '16:00' ) {
                        contador = contador + 1
                    }
                }
            }
        }
        expect(listadoFiltrado.length).to.equal(contador);
    })
    it('pasando todos los filtros, devuelve correctamente el listado',function(){
        let listadoDePrueba = new Listado(listadoDeRestaurantes)
        let listadoFiltrado = listadoDePrueba.obtenerRestaurantes("Hamburguesa", "Nueva York", "17:00");
        let contador = 0;
        for (let i = 0; i < listadoDePrueba.restaurantes.length; i++) {
            if (listadoDePrueba.restaurantes[i].ubicacion === "Nueva York") {
                for (let j = 0; j < listadoDePrueba.restaurantes[i].horarios.length; j++) {
                    if (listadoDePrueba.restaurantes[i].horarios[j] === '17:00' ) {
                        if (listadoDePrueba.restaurantes[i].rubro === "Hamburguesa"){
                            contador = contador + 1
                        }
                    }
                }
            }
        }
        expect(listadoFiltrado.length).to.equal(contador);
    })
})

//Requerimiento: Funciones que crea listas que luego serán mostradas
describe('Testeando obtenerXXXXXXX()', function(){
    it('dado un listado conocido con 6 rubros distintos filtra correctamente',function(){
        let listadoDePrueba = new Listado(listadoDeRestaurantes)
        let listadoDeRubros = listadoDePrueba.obtenerRubros();
        expect(listadoDeRubros.length).to.equal(6);
    })
    it('dado un listado conocido con 5 ubicaciones distintas filtra correctamente',function(){
        let listadoDePrueba = new Listado(listadoDeRestaurantes)
        let listadoDeUbicaciones = listadoDePrueba.obtenerUbicaciones();
        expect(listadoDeUbicaciones.length).to.equal(5);
    })
    it('dado un listado conocido con 21 horarios distintos filtra correctamente',function(){
        let listadoDePrueba = new Listado(listadoDeRestaurantes)
        let listadoDeHorarios = listadoDePrueba.obtenerHorarios();
        expect(listadoDeHorarios.length).to.equal(20);
    })
})

//TDD


//Requerimiento: calcular el precio base de una reserva
describe('Calcular precio base', function(){
	it('Con 4 personas y 100 pesos c/u - 400',function(){
        const horario = new Date(2019,10,30,18,00,00);
        var reserva = new Reserva(horario,4,100,"DES1");
        expect(reserva.calcularPrecioBase()).to.equal(400);
    })
})

//Requerimiento: calcular el precio final de una reserva
describe('Calcular precio final', function(){
    it('Sin ningún descuento ni adicional (2 personas $100 c/u) - 200',function(){
        const horario = new Date(2019,10,25,18,00,00);
        var reserva = new Reserva(horario,2,100,"");
        expect(reserva.calcularPrecioTotal()).to.equal(200);
    })
    it('Con descuento por grupos grandes (5 personas $100 c/u menos 5%) - 475',function(){
        const horario = new Date(2019,10,25,18,00,00);
        var reserva = new Reserva(horario,5,100,"");
        expect(reserva.calcularPrecioTotal()).to.equal(475);
    })
    it('Con descuento por grupos grandes (8 personas $100 c/u menos 10%) - 720',function(){
        const horario = new Date(2019,10,25,18,00,00);
        var reserva = new Reserva(horario,8,100,"");
        expect(reserva.calcularPrecioTotal()).to.equal(720);
    })
    it('Con descuento por grupos grandes (10 personas $100 c/u menos 15%) - 850',function(){
        const horario = new Date(2019,10,25,18,00,00);
        var reserva = new Reserva(horario,10,100,"");
        expect(reserva.calcularPrecioTotal()).to.equal(850);
    })
    it('Con descuento por cupón DES15 (10 personas $100 c/u menos 15% y 15% acumulado) - 700',function(){
        const horario = new Date(2019,10,25,18,00,00);
        var reserva = new Reserva(horario,10,100,"DES15");
        expect(reserva.calcularPrecioTotal()).to.equal(700);
    })
    it('Con descuento por cupón DES200(10 personas $100 c/u menos 15% y $200 acumulado) - 650',function(){
        const horario = new Date(2019,10,25,18,00,00);
        var reserva = new Reserva(horario,10,100,"DES200");
        expect(reserva.calcularPrecioTotal()).to.equal(650);
    })
    it('Con descuento por cupón DES1 (10 personas $100 c/u menos 15% y $100 acumulado) - 750',function(){
        const horario = new Date(2019,10,25,18,00,00);
        var reserva = new Reserva(horario,10,100,"DES1");
        expect(reserva.calcularPrecioTotal()).to.equal(750);
    })
    it('Con adicional por horario a las 20:30 (10 personas $100 c/u menos 15% y 5% adicional) - 900',function(){
        const horario = new Date(2019,10,25,20,30,00);
        var reserva = new Reserva(horario,10,100,"");
        expect(reserva.calcularPrecioTotal()).to.equal(900);
    })
    it('Con adicional por fin de semana (10 personas $100 c/u menos 30% descuentos y 15% adicional) - 800',function(){
        const horario = new Date(2019,10,23,20,30,00);
        var reserva = new Reserva(horario,10,100,"DES15");
        expect(reserva.calcularPrecioTotal()).to.equal(850);
    })
})

