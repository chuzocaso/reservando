var Reserva = function(horario, cantidadDePersonas, precioPorPersona, codigoDeDescuento) {
    this.horario = horario;
    this.cantidadDePersonas = cantidadDePersonas;
    this.precioPorPersona = precioPorPersona;
    this.codigoDeDescuento = codigoDeDescuento;
}

Reserva.prototype.calcularPrecioBase = function () {
    return this.cantidadDePersonas * this.precioPorPersona
}

Reserva.prototype.calcularPrecioTotal = function () {
    var precioBase = this.calcularPrecioBase();
    var descuentoPorGrupo = this.calcularDescuentoPorGrupo();
    var descuentoPorCodigo = this.calcularDescuentoPorCodigo();
    var descuentos = descuentoPorGrupo + descuentoPorCodigo;
    var adicionales = this.calcularAdicionales();
    return precioBase + adicionales - descuentos
}

Reserva.prototype.calcularDescuentoPorGrupo = function () {
    var descuento = 0;
    if (this.cantidadDePersonas>=4 && this.cantidadDePersonas<=6) {
        descuento += 0.05
    }
    else if (this.cantidadDePersonas>=7 && this.cantidadDePersonas<=8) {
        descuento += 0.10
    }
    else if (this.cantidadDePersonas>8) {
        descuento += 0.15
    }
    return this.calcularPrecioBase() * descuento
}

Reserva.prototype.calcularDescuentoPorCodigo = function () {
    var descuento = 0;
    if (this.codigoDeDescuento==="DES15") {
        descuento = 0.15 * this.calcularPrecioBase()
    }
    else if (this.codigoDeDescuento==="DES200") {
        descuento = 200
    }
    else if (this.codigoDeDescuento==="DES1") {
        descuento = this.precioPorPersona
    }
    return descuento
}

Reserva.prototype.calcularAdicionales = function () {
    var adicional = 0;
    var hora = this.horario.getHours();
    var dia = this.horario.getDay();
    if ((hora>=13 && hora<14) || (hora>=20 && hora<21)) {
        adicional += 0.05;
    }
    if (dia>=5 && dia<=7) {
        adicional += 0.10;
    }
    return this.calcularPrecioBase() * adicional
}

