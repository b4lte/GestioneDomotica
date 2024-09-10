import { Dispositivo } from "./Dispositivo.js";
export class Luce extends Dispositivo {
    constructor(ipAdress) {
        super(ipAdress);
        this.intensita = 0; // impostata a 0 per default
    }
    regolaLuminosità(intensita) {
        if (intensita < 0 || intensita > 100) {
            console.log("La luminosità deve essere compresa tra 0 e 100.");
        }
        else {
            this.intensita = intensita;
            console.log(`Luminosità regolata al ${intensita}%`);
        }
    }
    get intensitaAttuale() {
        return this.intensita;
    }
}
