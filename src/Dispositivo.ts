export class Dispositivo {
    private stato: boolean = false;
    private ipAdress: string = "";


	constructor(ipAdress: string) {
		this.ipAdress = ipAdress;
	}

	public get statoDispositivo(): boolean  {
		return this.stato;
	}
	public get ipDispositivo(): string  {
		return this.ipAdress;
	}
	public set statoDispositivo(value: boolean ) {
		this.stato = value;
	}
	public set ipDispositivo(value: string ) {
		this.ipAdress = value;
	}


    public attiva(): void {
        if (this.stato) {
            console.log(`Il dispositivo con ip ${this.ipAdress} è già attivo`);
        } else {
            this.stato = true;
            console.log(`Il dispositivo con ip ${this.ipAdress} è stato attivato`);
        }
    }

    public disattiva(): void {
        if (this.stato) {
            this.stato = false;
            console.log(`Il dispositivo con ip ${this.ipAdress} è stato disattivato`);
        } else {
            console.log(`Il dispositivo con ip ${this.ipAdress} è già disattivato`);
        }
    }
}