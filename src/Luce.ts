import { Dispositivo } from "./Dispositivo.js";

export class Luce extends Dispositivo {
    private intensita: number = 0; // impostata a 0 per default

    constructor(ipAdress: string) {
        super(ipAdress);
    }

    public regolaLuminosità(intensita: number): void {
        if (intensita < 0 || intensita > 100) {
            console.log("La luminosità deve essere compresa tra 0 e 100.");
        } else {
            this.intensita = intensita;
            console.log(`Luminosità regolata al ${intensita}%`);
        }
    }

    public get intensitaAttuale(): number {
        return this.intensita;
    }

}