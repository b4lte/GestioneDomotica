import { Dispositivo } from './Dispositivo';

export class Stanza {
    private dispositivi: Dispositivo[] = [];
    public nomeStanza: string;

    constructor(nome: string) {
        this.nomeStanza = nome;
    }

	public get listaDispositivi(): Dispositivo[]  {
		return this.dispositivi;
	}


    public aggiungiDispositivo(dispositivo: Dispositivo): void {
        this.dispositivi.push(dispositivo);
    }

    // Metodo per ottenere un dispositivo specifico (Luce, Termostato, Tapparella)
    public getDispositivo<T extends Dispositivo>(tipo: string): T | null {
        return this.dispositivi.find(dispositivo => dispositivo instanceof (eval(tipo))) as T | null;
    }

    public controllaDispositivi(attiva: boolean): void {
        this.dispositivi.forEach(dispositivo => {
            if (attiva) {
                dispositivo.attiva();
            } else {
                dispositivo.disattiva();
            }
        });
    }

    // Metodo per attivare/disattivare tutti i dispositivi nella stanza
    public accendiSpegniDispositivi(attiva: boolean): void {
        this.dispositivi.forEach(dispositivo => {
            if (attiva) {
                dispositivo.attiva();
            } else {
                dispositivo.disattiva();
            }
        });
        console.log(`Tutti i dispositivi nella stanza ${this.nomeStanza} sono stati ${attiva ? "attivati" : "disattivati"}.`);
    }
}
