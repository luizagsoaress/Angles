# Λngles

**Λngles** é um **dicionário inglês** totalmente online, onde o usuário consegue pesquisar por palavras da língua inglesa e visualizar seus detalhes, como:

- **Fonética**
- **Definições**
- **Exemplos**
- **Sinônimos**
- **Antônimos**
- **Classes Gramaticais**

## Como Usar?

```mermaid
graph TD
  A[Acesse o site] --> B{Pesquise uma palavra}
  B -->|Ela existe?| C[Os detalhes da palavra serão exibidos]
  B -->|Ela não existe?| D[Erro] --> E[Verifique a ortografia e tente novamente]
```

## Exemplo 

Resultado da busca pela palavra **`yes`**:

![image](./imagens/github/github(1).png)

## Fonte

|Fonte|Endpoint                                                  |
|----|----------------------------------------------------------|
|DictionaryApi| `https://api.dictionaryapi.dev/api/v2/entries/en/`| 

**Padrão de uso:**

> `https://api.dictionaryapi.dev/api/v2/entries/en/${palavra}`

## Acesse Aqui

> [Λngles](https://luizagsoaress.github.io/Angles/)
