import { Dispositivo } from './Dispositivo.js';
export class Termostato extends Dispositivo {
    constructor(ipAddress) {
        super(ipAddress);
        this.temperatura = 20; // Impostata a 20°C come default
    }
    impostaTemperatura(temperatura) {
        if (temperatura < 15 || temperatura > 25) {
            console.log("La temperatura deve essere compresa tra 15°C e 25°C.");
        }
        else {
            this.temperatura = temperatura;
            console.log(`Temperatura impostata a ${temperatura}°C`);
        }
    }
    get temperaturaAttuale() {
        return this.temperatura;
    }
}
