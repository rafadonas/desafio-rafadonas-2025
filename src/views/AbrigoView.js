export class AbrigoView {

    _COLORS = {
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        red: '\x1b[31m',
        reset: '\x1b[0m'
    };

    imprimirResultados(resultadosAdocao) {
        const listaFormatada = Object.keys(resultadosAdocao)
            .map(animal => {
                const adotadoPor = resultadosAdocao[animal];
                let cor = this._COLORS.yellow; 

                if (adotadoPor.includes('pessoa')) {
                    cor = this._COLORS.green;
                }

                return `${cor}${animal} - ${adotadoPor}${this._COLORS.reset}`;
            });
        
        return { lista: listaFormatada };
    }

    imprimirErro(mensagem) {
        return { erro: `${this._COLORS.red}${mensagem}${this._COLORS.reset}` };
    }
}