import { Stanza } from "./Stanza";

export class SistemaDomotico {
    private nome: string;
    private stanze: Stanza[] = [];

    constructor(nome: string) {
        this.nome = nome;
    }

    public get nomeSistema(): string {
        return this.nome;
    }

    public set nomeSistema(nome: string) {
        this.nome = nome;
    }

    public get listaStanze(): Stanza[] {
        return this.stanze;
    }


    public aggiungiStanza(stanza: Stanza): void {
        this.stanze.push(stanza);
        console.log(`Stanza aggiunta al sistema domotico ${this.nome}`);
    }

    public mostraDispositivi(sistema: SistemaDomotico): void {
        this.stanze.forEach(stanza => {
            console.log(stanza.listaDispositivi);
        })
    }

    // Ottieni l'ultima stanza aggiunta al sistema
    public ottieniUltimaStanza(): Stanza | null {
        if (this.stanze.length > 0) {
            return this.stanze[this.stanze.length - 1];
        } else {
            console.log("Nessuna stanza presente nel sistema.");
            return null;
        }
    }

    public accendiSpegniStanze(attiva: boolean): void {
        this.stanze.forEach(stanza => {
            stanza.accendiSpegniDispositivi(attiva);
        });
        console.log(`Tutte le stanze nel Sistema Domotico ${this.nome} sono state ${attiva ? "attivate" : "disattivate"}.`);
    }

    public accendiSpegniStanza(stanza: Stanza, attiva: boolean): void {
        stanza.accendiSpegniDispositivi(attiva);
        console.log(`Stanza ${stanza.nomeStanza} è stata ${attiva ? "attivata" : "disattivata"}.`);
    }

    // Metodo per ottenere una stanza per nome
    public ottieniStanzaPerNome(nomeStanzaSelezionata: string): Stanza | null {
        for (const stanza of this.stanze) {
            if (stanza.nomeStanza === nomeStanzaSelezionata) {
                return stanza;
            }
        }
        return null; // Restituisce null se la stanza non è stata trovata
    }
}