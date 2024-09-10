import { Luce } from './Luce.js';
import { Termostato } from './Termostato.js';
import { Tapparella } from './Tapparella.js';
import { Stanza } from './Stanza.js';
import { SistemaDomotico } from './SistemaDomotico.js';

const sistemaDomotico = new SistemaDomotico("sistema1");

// Popola il menu a tendina con le stanze
function popolaMenuStanze() {
    const selezionaStanza1 = document.getElementById('selezionaStanza1') as HTMLSelectElement;
    const selezionaStanza2 = document.getElementById('selezionaStanza2') as HTMLSelectElement;
    const selezionaStanza3 = document.getElementById('selezionaStanza3') as HTMLSelectElement;

    // Pulisci entrambi i menu
    selezionaStanza1.innerHTML = '';
    selezionaStanza2.innerHTML = '';
    selezionaStanza3.innerHTML = '';

    // Ottieni tutte le stanze dal sistema domotico
    const stanze = sistemaDomotico.listaStanze;

    // Aggiungi ogni stanza come opzione in tutti i menu
    stanze.forEach(stanza => {
        const option = document.createElement('option');
        option.value = stanza.nomeStanza; // Usa il nome della stanza come valore
        option.textContent = stanza.nomeStanza; // Mostra il nome della stanza nel menu

        // Aggiungi l'opzione al primo menu
        selezionaStanza1.appendChild(option.cloneNode(true));

        // Aggiungi l'opzione al secondo menu
        selezionaStanza2.appendChild(option.cloneNode(true));

        // Aggiungi l'opzione al terzo menu
        selezionaStanza3.appendChild(option.cloneNode(true));
    });
}

// Funzione per verificare la classe del dispositivo
function verificaTipo(dispositivo: any): string {
    let tipo = "";
    if (dispositivo instanceof Luce) {
        tipo = `Luce, grado: ${dispositivo.intensitaAttuale}`;

    } else if (dispositivo instanceof Termostato) {
        tipo = `Termostato, grado: ${dispositivo.temperaturaAttuale}`;

    } else if (dispositivo instanceof Tapparella) {
        tipo = `Tapparella, grado: ${dispositivo.statoTapparella}`;

    } else {
        console.log("Il dispositivo non appartiene a nessuna delle classi specificate");
    }

    return tipo;
}


// Funzione per aggiornare l'elenco delle stanze e dispositivi
function aggiornaListaStanze() {
    const stanzeContainer = document.getElementById('listaStanze');
    if (stanzeContainer) {
        stanzeContainer.innerHTML = ''; // Svuota la lista prima di aggiornare

        sistemaDomotico.listaStanze.forEach(stanza => {
            const stanzaDiv = document.createElement('div');
            stanzaDiv.classList.add('stanza');

            const titoloStanza = document.createElement('h3');
            titoloStanza.textContent = `Stanza: ${stanza.nomeStanza}`;
            titoloStanza.style.fontWeight = 'bold'; // Applica il grassetto
            titoloStanza.style.fontSize = 'larger'; // e aumenta la dimensione del testo
            stanzaDiv.appendChild(titoloStanza);

            const listaDispositivi = document.createElement('ul');

            // Itera sui dispositivi della stanza e crea una lista
            stanza.listaDispositivi.forEach(dispositivo => {
                const dispositivoItem = document.createElement('li');
                
                let tipo = verificaTipo(dispositivo);
                dispositivoItem.textContent = `Dispositivo: ${tipo}, IP: ${dispositivo.ipDispositivo}, Stato: ${dispositivo.statoDispositivo ? 'Attivo' : 'Inattivo'}`;
                listaDispositivi.appendChild(dispositivoItem);
            });

            stanzaDiv.appendChild(listaDispositivi);
            stanzeContainer.appendChild(stanzaDiv);
        });
    }
}

// Event listener per aggiungere una stanza
window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('aggiungiStanzaBtn')?.addEventListener('click', () => {
        const inputNomeStanza = (document.getElementById('nomeStanza') as HTMLInputElement);
        const nomeStanza = inputNomeStanza.value;
        if (nomeStanza) {
            const nuovaStanza = new Stanza(nomeStanza);
            sistemaDomotico.aggiungiStanza(nuovaStanza);
            console.log(`Stanza "${nomeStanza}" aggiunta al sistema.`);
            inputNomeStanza.value = '';
        }
        // Chiamata per popolare il menu a tendina delle stanze
        popolaMenuStanze();
        aggiornaListaStanze();
    });
});

// Event listener per aggiungere un dispositivo
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('aggiungiDispositivoBtn')?.addEventListener('click', () => {
        const tipoDispositivo = (document.getElementById('tipoDispositivo') as HTMLSelectElement).value;
        const inputIndirizzoIp = (document.getElementById('indirizzoIp') as HTMLInputElement);
        const indirizzoIp = inputIndirizzoIp.value;
        
        // Ottieni la stanza selezionata dal menu
        const nomeStanzaSelezionata = (document.getElementById('selezionaStanza1') as HTMLSelectElement).value;
        const stanza = sistemaDomotico.ottieniStanzaPerNome(nomeStanzaSelezionata);

        if (stanza && indirizzoIp) {
            let dispositivo;
            switch (tipoDispositivo) {
                case 'luce':
                    dispositivo = new Luce(indirizzoIp);
                    break;
                case 'termostato':
                    dispositivo = new Termostato(indirizzoIp);
                    break;
                case 'tapparella':
                    dispositivo = new Tapparella(indirizzoIp);
                    break;
            }
            if (dispositivo) {
                stanza.aggiungiDispositivo(dispositivo);
                console.log(`${tipoDispositivo} aggiunto alla stanza ${stanza.nomeStanza}`);
            }
        }
        inputIndirizzoIp.value = '';
        aggiornaListaStanze();
    });
});

// Event listener per attivare/disattivare tutti i dispositivi
window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('attivaDispositiviBtn')?.addEventListener('click', () => {
        sistemaDomotico.accendiSpegniStanze(true);
        aggiornaListaStanze();
    });
});

window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('disattivaDispositiviBtn')?.addEventListener('click', () => {
        sistemaDomotico.accendiSpegniStanze(false);
        aggiornaListaStanze();
    });
});

// Event listener per controllare dispositivi specifici
document.getElementById('accendiSpecDispositivoBtn')?.addEventListener('click', () => {
    // Ottieni la stanza selezionata dal menu a tendina
    const nomeStanzaSelezionata = (document.getElementById('selezionaStanza3') as HTMLSelectElement).value; // Usa l'ID del menu a tendina appropriato
    const stanza = sistemaDomotico.ottieniStanzaPerNome(nomeStanzaSelezionata);

    // Verifica se la stanza esiste prima di accendere o spegnere
    if (stanza) {
        sistemaDomotico.accendiSpegniStanza(stanza, true);
    } else {
        console.log("La stanza selezionata non esiste.");
    }
    aggiornaListaStanze();
});

document.getElementById('spegniSpecDispositivoBtn')?.addEventListener('click', () => {
    // Ottieni la stanza selezionata dal menu a tendina
    const nomeStanzaSelezionata = (document.getElementById('selezionaStanza3') as HTMLSelectElement).value; // Usa l'ID del menu a tendina appropriato
    const stanza = sistemaDomotico.ottieniStanzaPerNome(nomeStanzaSelezionata);

    // Verifica se la stanza esiste prima di accendere o spegnere
    if (stanza) {
        sistemaDomotico.accendiSpegniStanza(stanza, false);
    } else {
        console.log("La stanza selezionata non esiste.");
    }
    aggiornaListaStanze();
});

// Event listener per impostare l'intensità della luce
window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('impostaIntensitaLuceBtn')?.addEventListener('click', () => {
        const inputIntensita = (document.getElementById('intensitaLuce') as HTMLInputElement);
        const intensita = parseInt(inputIntensita.value);
    
        // Ottieni la stanza selezionata dal menu a tendina
        const nomeStanzaSelezionata = (document.getElementById('selezionaStanza2') as HTMLSelectElement).value; // Usa l'ID del menu a tendina appropriato
        const stanza = sistemaDomotico.ottieniStanzaPerNome(nomeStanzaSelezionata);
    
        if (stanza) {
            const luce = stanza.listaDispositivi.find(dispositivo => dispositivo instanceof Luce) as Luce;
            if (luce) {
                luce.regolaLuminosità(intensita);
                console.log(`Intensità della luce nella stanza ${stanza.nomeStanza} impostata a ${intensita}`);
            } else {
                console.log("Nessuna luce trovata nella stanza.");
            }
        } else {
            console.log("Stanza non trovata.");
        }
        
        aggiornaListaStanze();
        inputIntensita.value = '';
    });
    
});

// Event listener per impostare la temperatura del termostato
window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('impostaTemperaturaBtn')?.addEventListener('click', () => {
        // Ottieni la stanza selezionata dal menu a tendina
        const nomeStanzaSelezionata = (document.getElementById('selezionaStanza2') as HTMLSelectElement).value; // Usa l'ID del menu a tendina appropriato
        const stanza = sistemaDomotico.ottieniStanzaPerNome(nomeStanzaSelezionata);

        const inputTemperatura = (document.getElementById('temperatura') as HTMLInputElement);
        const temperatura = parseInt(inputTemperatura.value);
        
        if (stanza) {
            if (temperatura >= 15 && temperatura <= 25) {
                const termostato = stanza.listaDispositivi.find(dispositivo => dispositivo instanceof Termostato) as Termostato;
                if (termostato) {
                    termostato.impostaTemperatura(temperatura);
                    console.log(`Temperatura del termostato impostata a ${temperatura}`);
                } else {
                    console.log("Nessun termostato trovato nella stanza.");
                }
            } else {
                console.log("La temperatura deve essere compresa tra 15°C e 25°C");
            }
        } else {
            console.log("Stanza non trovata.");
        }

        aggiornaListaStanze();
        inputTemperatura.value = '';
    });
});

// Event listener per aprire la tapparella
window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('apriTapparellaBtn')?.addEventListener('click', () => {
        // Ottieni la stanza selezionata dal menu a tendina
        const nomeStanzaSelezionata = (document.getElementById('selezionaStanza2') as HTMLSelectElement).value; // Usa l'ID del menu a tendina appropriato
        const stanza = sistemaDomotico.ottieniStanzaPerNome(nomeStanzaSelezionata);

        if (stanza) {
            const tapparella = stanza.listaDispositivi.find(dispositivo => dispositivo instanceof Tapparella) as Tapparella;
            if (tapparella) {
                tapparella.apri();
                console.log("Tapparella aperta.");
            } else {
                console.log("Nessuna tapparella trovata nella stanza.");
            }
        } else {
            console.log("Stanza non trovata.");
        }

        aggiornaListaStanze();
    });
});

// Event listener per chiudere la tapparella
window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('chiudiTapparellaBtn')?.addEventListener('click', () => {
        // Ottieni la stanza selezionata dal menu a tendina
        const nomeStanzaSelezionata = (document.getElementById('selezionaStanza2') as HTMLSelectElement).value; // Usa l'ID del menu a tendina appropriato
        const stanza = sistemaDomotico.ottieniStanzaPerNome(nomeStanzaSelezionata);

        if (stanza) {
            const tapparella = stanza.listaDispositivi.find(dispositivo => dispositivo instanceof Tapparella) as Tapparella;
            if (tapparella) {
                tapparella.chiudi();
                console.log("Tapparella chiusa.");
            } else {
                console.log("Nessuna tapparella trovata nella stanza.");
            }
        } else {
            console.log("Stanza non trovata.");
        }

        aggiornaListaStanze();
    });
});

