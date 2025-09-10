class Animal {
    constructor(nome, tipo, brinquedos) {
        this.nome = nome;
        this.tipo = tipo;
        this.brinquedos = brinquedos;
    }

    podeSerAdotadoPor(pessoa) {
        const brinquedosPessoa = pessoa.brinquedos;
        
        if (brinquedosPessoa.length < this.brinquedos.length) {
            return false;
        }

        let indexPessoa = 0;
        let indexAnimal = 0;
        while (indexAnimal < this.brinquedos.length && indexPessoa < brinquedosPessoa.length) {
            if (brinquedosPessoa[indexPessoa] === this.brinquedos[indexAnimal]) {
                indexAnimal++;
            }
            indexPessoa++;
        }
        return indexAnimal === this.brinquedos.length;
    }
}

class LocoJabuti extends Animal {
    constructor(nome, tipo, brinquedos) {
        super(nome, tipo, brinquedos);
    }

    podeSerAdotadoPor(pessoa) {
        const brinquedosPessoa = pessoa.brinquedos;
        return this.brinquedos.every(toy => brinquedosPessoa.includes(toy));
    }
}

export { Animal, LocoJabuti };