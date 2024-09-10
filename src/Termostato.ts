import { Dispositivo } from './Dispositivo.js';

export class Termostato extends Dispositivo {
    private temperatura: number = 20; // Impostata a 20°C come default

    constructor(ipAddress: string) {
        super(ipAddress);
    }

    public impostaTemperatura(temperatura: number): void {
        if (temperatura < 15 || temperatura > 25) {
            console.log("La temperatura deve essere compresa tra 15°C e 25°C.");
        } else {
            this.temperatura = temperatura;
            console.log(`Temperatura impostata a ${temperatura}°C`);
        }
    }

    public get temperaturaAttuale(): number {
        return this.temperatura;
    }
}
