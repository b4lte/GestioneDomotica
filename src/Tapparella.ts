import { Dispositivo } from './Dispositivo.js';

export class Tapparella extends Dispositivo {
    private aperta: boolean = false; // di default la tapparella è chiusa

    constructor(ipAddress: string) {
        super(ipAddress);
    }

    public apri(): void {
        if (this.aperta) {
            console.log("La tapparella è già aperta.");
        } else {
            this.aperta = true;
            this.statoDispositivo = true;
            console.log("La tapparella è stata aperta.");
        }
    }

    public chiudi(): void {
        if (!this.aperta) {
            console.log("La tapparella è già chiusa.");
        } else {
            this.aperta = false;
            this.statoDispositivo = false;
            console.log("La tapparella è stata chiusa.");
        }
    }

    public get statoTapparella(): boolean {
        return this.aperta;
    }
}
