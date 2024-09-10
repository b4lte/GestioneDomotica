export class Stanza {
    constructor(nome) {
        this.dispositivi = [];
        this.nomeStanza = nome;
    }
    get listaDispositivi() {
        return this.dispositivi;
    }
    aggiungiDispositivo(dispositivo) {
        this.dispositivi.push(dispositivo);
    }
    // Metodo per ottenere un dispositivo specifico (Luce, Termostato, Tapparella)
    getDispositivo(tipo) {
        return this.dispositivi.find(dispositivo => dispositivo instanceof (eval(tipo)));
    }
    controllaDispositivi(attiva) {
        this.dispositivi.forEach(dispositivo => {
            if (attiva) {
                dispositivo.attiva();
            }
            else {
                dispositivo.disattiva();
            }
        });
    }
    // Metodo per attivare/disattivare tutti i dispositivi nella stanza
    accendiSpegniDispositivi(attiva) {
        this.dispositivi.forEach(dispositivo => {
            if (attiva) {
                dispositivo.attiva();
            }
            else {
                dispositivo.disattiva();
            }
        });
        console.log(`Tutti i dispositivi nella stanza ${this.nomeStanza} sono stati ${attiva ? "attivati" : "disattivati"}.`);
    }
}
