export class Dispositivo {
    constructor(ipAdress) {
        this.stato = false;
        this.ipAdress = "";
        this.ipAdress = ipAdress;
    }
    get statoDispositivo() {
        return this.stato;
    }
    get ipDispositivo() {
        return this.ipAdress;
    }
    set statoDispositivo(value) {
        this.stato = value;
    }
    set ipDispositivo(value) {
        this.ipAdress = value;
    }
    attiva() {
        if (this.stato) {
            console.log(`Il dispositivo con ip ${this.ipAdress} è già attivo`);
        }
        else {
            this.stato = true;
            console.log(`Il dispositivo con ip ${this.ipAdress} è stato attivato`);
        }
    }
    disattiva() {
        if (this.stato) {
            this.stato = false;
            console.log(`Il dispositivo con ip ${this.ipAdress} è stato disattivato`);
        }
        else {
            console.log(`Il dispositivo con ip ${this.ipAdress} è già disattivato`);
        }
    }
}
