# Especificação: Editor de Código com Syntax Highlighting

## Protótipo (Pencil)
Referência: `docs/assets/devroast.pen` - Screen 1 - Code Input

### Estrutura do Editor no Protótipo
- **Window Header**: 3 dots (vermelho, amarelo, verde), altura 40px
- **Line Numbers**: coluna à esquerda com números, largura 48px
- **Code Column**: área principal com syntax highlighting
- **Dimensões**: 780px × 360px

### Cores de Syntax (definidas no protótipo)
| Token | Variável |
|-------|-----------|
| Palavras-chave | `$syn-keyword` |
| Operadores | `$syn-operator` |
| Funções | `$syn-function` |
| Variáveis | `$syn-variable` |
| Números | `$syn-number` |
| Propriedades | `$syn-property` |
| Strings | `$syn-string` |

---

## Objetivo
Criar um editor de código interativo na homepage onde usuários podem colar seu código, com syntax highlighting automático (baseado na linguagem) e opção de seleção manual.

## Análise de Opções

### Bibliotecas avaliadas:

| Biblioteca | Tamanho | Uso em produção | Próprio para editor interativo |
|------------|---------|----------------|-------------------------------|
| **react-simple-code-editor** | Leve (~10KB) | Ray.so, CodeSnap | ✅ Sim |
| **Prism.js** | ~18KB min | Muito usado | ⚠️ Necesita complementar |
| **Highlight.js** | ~910KB min | Muy popular | ❌ Grande demais |
| **Shiki** | Médio | Nosso CodeBlock | ❌ Só server-side |
| **Monaco Editor** | Muito grande | VS Code | ❌ Exagerado |
| **CodeMirror 6** | Grande | Aplicações complexas | ⚠️ Complexo |

### Decisão: **react-simple-code-editor + Prism.js**

Esta é a mesma combinação usada pelo **Ray.so** e **CodeSnap**:
- **react-simple-code-editor**: Editor input textooverlay
- **Prism.js**: Syntax highlighting

Alternativa: usar apenas **react-simple-code-editor** com Highlight.js (já temos Shiki instalado, mas não é ideal para editor interativo).

## Funcionalidades Necessárias

### 1. Editor Interativo
- [ ] Campo de input para código
- [ ] Syntax highlighting em tempo real
- [ ] Suporte a múltiplas linguagens
- [ ] Seleção manual de linguagem (dropdown)
- [ ] Auto-detecção de linguagem

### 2. Auto-detecção de Linguagem
- ✅ Obrigatória
- Usar **highlight.js** com `highlightAuto()`

### 3. Tema Visual
- ✅ **Cores do Protótipo Pencil** (não Vesper)
- Criar tema customizado para Prism.js baseado nas cores `$syn-*` do protótipo
- Seguir estrutura visual: window dots + line numbers + código

### 4. Linguagens Suportadas
Dropdown com linguagens populares:
- JavaScript/TypeScript
- Python
- Java
- C#
- Go
- Rust
- Ruby
- PHP
- SQL
- HTML/CSS

## To-Dos para Implementação

- [ ] Instalar `react-simple-code-editor` e `prismjs`
- [ ] Instalar `highlight.js` para auto-detecção
- [ ] Criar tema Vesper customizado para Prism.js
- [ ] Criar componente `CodeEditor` em `src/components/ui/`
- [ ] Adicionar dropdown de seleção de linguagem populares listadas nesta doc
- [ ] Implementar auto-detecção de linguagem
- [ ] Integrar com a homepage (substituir código estático)

## Decisões Tomadas

- ✅ **Tema**: Cores do protótipo Pencil ( `$syn-*` )
- ✅ **Auto-detecção**: Obrigatória (usar `highlight.js` com `highlightAuto()`)
- ✅ **Linguagens**: JavaScript, TypeScript (iniciais)
