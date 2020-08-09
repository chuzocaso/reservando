var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
/*
código viejo
    for (var i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i] === horarioReservado) {
            this.horarios.splice(i, 1);
            return;
        }
    }
    */
//Refactorizado
var horariosFiltrados = this.horarios.filter(horario => horario !== horarioReservado);
this.horarios = horariosFiltrados;

}




Restaurant.prototype.calificar = function(nuevaCalificacion) {
    //Se corrige para que funcione al calificar con 10
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion <= 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        var promedioDeCalificaciones = calculoPromedio(this.calificaciones);
        return Math.round(promedioDeCalificaciones * 10) / 10;
    }

}

var suma = function suma(numeros) {
    var resultado = 0
    numeros.forEach(sumando => {
        resultado += sumando
    });
    return resultado
};

var calculoPromedio = function calculoPromedio(numeros) {
    return suma(numeros)/numeros.length
}