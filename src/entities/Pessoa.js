export class Pessoa {
    constructor(id, brinquedos) {
        this.id = id;
        this.brinquedos = brinquedos;
        this.animaisAdotados = 0;
    }

    podeAdotar() {
        return this.animaisAdotados < 3;
    }

    adotar() {
        if (this.podeAdotar()) {
            this.animaisAdotados++;
            return true;
        }
        return false;
    }

    desfazerAdocao() {
        if (this.animaisAdotados > 0) {
            this.animaisAdotados--;
        }
    }
}