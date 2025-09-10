# Desafio | Abrigo de Animais

Este projeto apresenta uma solução completa para o desafio "Abrigo de Animais", utilizando **JavaScript** e uma arquitetura orientada a objetos (POO) com o padrão **MVC (Model-View-Controller)**.

O objetivo é encontrar pessoas aptas a adotar animais, baseando-se em um conjunto de regras complexas e em um catálogo de animais e seus brinquedos favoritos.

---

### Arquitetura do Projeto

A solução foi construída seguindo o padrão **MVC (Model-View-Controller)** para garantir a separação de responsabilidades, modularidade e manutenibilidade.

* **Modelo (Model)**
    Localizado nas pastas `src/entities/` e `data/`, o Modelo é o coração da lógica de negócios. As classes `Pessoa` e `Animal` (com a classe especializada `LocoJabuti`) representam as entidades do problema e contêm as regras de adoção. Os dados dos animais foram externalizados para um arquivo **JSON (`data/animais.json`)**, tornando a aplicação flexível e orientada a dados.

* **Visão (View)**
    A classe `AbrigoView` na pasta `src/views/` é a camada de apresentação. Sua única responsabilidade é formatar a saída de dados com clareza, utilizando **códigos de cor ANSI** para melhorar a visualização no terminal, sem ter acesso à lógica de negócios.

* **Controlador (Controller)**
    A classe principal `AbrigoAnimais` em `src/` atua como o Controlador. Ela orquestra toda a aplicação: recebe os dados de entrada, interage com o Modelo para processar a lógica de adoção e entrega os resultados brutos para a Visão cuidar da formatação final.

---

### Funcionalidades e Regras Implementadas

Esta solução implementa todas as regras exigidas, além de aprimoramentos para um código de alta qualidade.

* **Regras de Adoção**:
    * Verificação da ordem e intercalação de brinquedos.
    * Restrição de adoção para o animal `Loco` sem a companhia de outro animal.
    * Limite de 3 animais por pessoa.
    * O animal fica no abrigo em caso de empate entre os adotantes.

* **Validações Robustas**:
    * Mensagens de erro detalhadas (`Animal inválido: NomeDoAnimal` ou `Brinquedo inválido: NomeDoBrinquedo`).
    * Validação de itens duplicados.

* **Automação**:
    * O projeto conta com um conjunto de **testes unitários** (`abrigo-animais.test.js`) usando o **Jest**, garantindo que a solução seja confiável e livre de bugs.

---

### Como Executar o Projeto

Para rodar o projeto localmente e validar a solução, siga os passos abaixo.

#### Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) e o `npm` instalados em sua máquina.

#### Execução
1.  Navegue até o diretório raiz do projeto no seu terminal.
2.  Instale as dependências do projeto:
    ```bash
    npm install
    ```
3.  Execute os testes para validar sua solução:
    ```bash
    npm test
    ```
    Se tudo estiver correto, você verá a mensagem de **`PASS`** no terminal, indicando que todos os cenários de teste foram aprovados.