import { Pessoa } from './entities/Pessoa.js';
import { Animal, LocoJabuti } from './entities/Animal.js';
import { AbrigoView } from './views/AbrigoView.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const animaisData = require('../data/animais.json');

export class AbrigoAnimais {
  _ANIMAIS_DATA = animaisData;
  _ALL_TOYS = new Set(['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE']);
  _ALL_ANIMALS = new Set(Object.keys(this._ANIMAIS_DATA));
  _view = new AbrigoView();

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const brinquedos1 = this._parseAndValidate(brinquedosPessoa1, this._ALL_TOYS, 'Brinquedo');
    const brinquedos2 = this._parseAndValidate(brinquedosPessoa2, this._ALL_TOYS, 'Brinquedo');
    const animaisOrdem = this._parseAndValidate(ordemAnimais, this._ALL_ANIMALS, 'Animal');

    if (brinquedos1.erro) return this._view.imprimirErro(brinquedos1.erro);
    if (brinquedos2.erro) return this._view.imprimirErro(brinquedos2.erro);
    if (animaisOrdem.erro) return this._view.imprimirErro(animaisOrdem.erro);

    const pessoa1 = new Pessoa('pessoa 1', brinquedos1.data);
    const pessoa2 = new Pessoa('pessoa 2', brinquedos2.data);
    const resultadosAdocao = {};

    const animaisParaAdotar = animaisOrdem.data.map(nome => {
        const data = this._ANIMAIS_DATA[nome];
        return nome === 'Loco' ? new LocoJabuti(nome, data.tipo, data.brinquedos) : new Animal(nome, data.tipo, data.brinquedos);
    });

    for (const animal of animaisParaAdotar) {
        const p1PodeAdotar = pessoa1.podeAdotar() && animal.podeSerAdotadoPor(pessoa1);
        const p2PodeAdotar = pessoa2.podeAdotar() && animal.podeSerAdotadoPor(pessoa2);

        let adotadoPor = 'abrigo';

        if (p1PodeAdotar && p2PodeAdotar) {
            adotadoPor = 'abrigo';
        } else if (p1PodeAdotar) {
            if (pessoa1.podeAdotar()) {
                pessoa1.adotar();
                adotadoPor = pessoa1.id;
            }
        } else if (p2PodeAdotar) {
            if (pessoa2.podeAdotar()) {
                pessoa2.adotar();
                adotadoPor = pessoa2.id;
            }
        }

        resultadosAdocao[animal.nome] = adotadoPor;
    }

    if (resultadosAdocao['Loco'] !== 'abrigo') {
        if ((resultadosAdocao['Loco'] === pessoa1.id && pessoa1.animaisAdotados === 1) ||
            (resultadosAdocao['Loco'] === pessoa2.id && pessoa2.animaisAdotados === 1)) {
            resultadosAdocao['Loco'] = 'abrigo';
            if (resultadosAdocao['Loco'] === pessoa1.id) {
                pessoa1.desfazerAdocao();
            } else {
                pessoa2.desfazerAdocao();
            }
        }
    }

    return this._view.imprimirResultados(resultadosAdocao);
  }

  _parseAndValidate(inputString, validSet, typeName) {
    if (!inputString) return { data: [] };
    const items = inputString.split(',').map(item => item.trim());
    const uniqueItems = new Set();

    for (const item of items) {
      if (uniqueItems.has(item)) {
        return { erro: `${typeName} inválido: ${item}` };
      }
      uniqueItems.add(item);
      if (!validSet.has(item)) {
        return { erro: `${typeName} inválido: ${item}` };
      }
    }
    return { data: items };
  }
}