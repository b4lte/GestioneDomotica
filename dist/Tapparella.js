import { Dispositivo } from './Dispositivo.js';
export class Tapparella extends Dispositivo {
    constructor(ipAddress) {
        super(ipAddress);
        this.aperta = false; // di default la tapparella è chiusa
    }
    apri() {
        if (this.aperta) {
            console.log("La tapparella è già aperta.");
        }
        else {
            this.aperta = true;
            this.statoDispositivo = true;
            console.log("La tapparella è stata aperta.");
        }
    }
    chiudi() {
        if (!this.aperta) {
            console.log("La tapparella è già chiusa.");
        }
        else {
            this.aperta = false;
            this.statoDispositivo = false;
            console.log("La tapparella è stata chiusa.");
        }
    }
    get statoTapparella() {
        return this.aperta;
    }
}
