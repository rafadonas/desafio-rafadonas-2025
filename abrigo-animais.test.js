import { AbrigoAnimais } from './src/abrigo-animais.js';

describe('Abrigo de Animais', () => {
    const GREEN = '\x1b[32m';
    const YELLOW = '\x1b[33m';
    const RED = '\x1b[31m';
    const RESET = '\x1b[0m';

    test('Deve rejeitar animal inválido', () => {
        const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
        expect(resultado.erro).toBe(`${RED}Animal inválido: Lulu${RESET}`);
        expect(resultado.lista).toBeFalsy();
    });

    test('Deve encontrar pessoa para um animal', () => {
        const resultado = new AbrigoAnimais().encontraPessoas(
          'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');

        expect(resultado.lista[0]).toBe(`${GREEN}Rex - pessoa 1${RESET}`);
        expect(resultado.lista[1]).toBe(`${YELLOW}Fofo - abrigo${RESET}`);
        expect(resultado.lista.length).toBe(2);
        expect(resultado.erro).toBeFalsy();
    });

    test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
        const resultado = new AbrigoAnimais().encontraPessoas(
          'BOLA,NOVELO,RATO,LASER', 'BOLA,RATO,LASER,NOVELO', 'Mimi,Fofo,Rex,Bola');

        expect(resultado.lista[0]).toBe(`${YELLOW}Mimi - abrigo${RESET}`);
        expect(resultado.lista[1]).toBe(`${YELLOW}Fofo - abrigo${RESET}`);
        expect(resultado.lista[2]).toBe(`${YELLOW}Rex - abrigo${RESET}`);
        expect(resultado.lista[3]).toBe(`${YELLOW}Bola - abrigo${RESET}`);
        expect(resultado.lista.length).toBe(4);
        expect(resultado.erro).toBeFalsy();
    });

    test('Não deve adotar Loco se a pessoa não tiver outro animal', () => {
        const resultado = new AbrigoAnimais().encontraPessoas('SKATE,RATO', 'NOVELO,LASER', 'Loco,Bola');

        expect(resultado.lista[0]).toBe(`${YELLOW}Loco - abrigo${RESET}`);
        expect(resultado.lista[1]).toBe(`${YELLOW}Bola - abrigo${RESET}`);
        expect(resultado.erro).toBeFalsy();
    });

    test('Deve rejeitar brinquedo repetido no input', () => {
        const resultado = new AbrigoAnimais().encontraPessoas('RATO,RATO', '', '');
        expect(resultado.erro).toBe(`${RED}Brinquedo inválido: RATO${RESET}`);
        expect(resultado.lista).toBeFalsy();
    });

    test('Deve rejeitar animal repetido no input', () => {
        const resultado = new AbrigoAnimais().encontraPessoas('', '', 'Rex,Rex');
        expect(resultado.erro).toBe(`${RED}Animal inválido: Rex${RESET}`);
        expect(resultado.lista).toBeFalsy();
    });
});