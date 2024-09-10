export class SistemaDomotico {
    constructor(nome) {
        this.stanze = [];
        this.nome = nome;
    }
    get nomeSistema() {
        return this.nome;
    }
    set nomeSistema(nome) {
        this.nome = nome;
    }
    get listaStanze() {
        return this.stanze;
    }
    aggiungiStanza(stanza) {
        this.stanze.push(stanza);
        console.log(`Stanza aggiunta al sistema domotico ${this.nome}`);
    }
    mostraDispositivi(sistema) {
        this.stanze.forEach(stanza => {
            console.log(stanza.listaDispositivi);
        });
    }
    // Ottieni l'ultima stanza aggiunta al sistema
    ottieniUltimaStanza() {
        if (this.stanze.length > 0) {
            return this.stanze[this.stanze.length - 1];
        }
        else {
            console.log("Nessuna stanza presente nel sistema.");
            return null;
        }
    }
    accendiSpegniStanze(attiva) {
        this.stanze.forEach(stanza => {
            stanza.accendiSpegniDispositivi(attiva);
        });
        console.log(`Tutte le stanze nel Sistema Domotico ${this.nome} sono state ${attiva ? "attivate" : "disattivate"}.`);
    }
    accendiSpegniStanza(stanza, attiva) {
        stanza.accendiSpegniDispositivi(attiva);
        console.log(`Stanza ${stanza.nomeStanza} è stata ${attiva ? "attivata" : "disattivata"}.`);
    }
    // Metodo per ottenere una stanza per nome
    ottieniStanzaPerNome(nomeStanzaSelezionata) {
        for (const stanza of this.stanze) {
            if (stanza.nomeStanza === nomeStanzaSelezionata) {
                return stanza;
            }
        }
        return null; // Restituisce null se la stanza non è stata trovata
    }
}
