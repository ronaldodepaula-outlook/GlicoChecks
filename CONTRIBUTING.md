# Contributing to GlicoChecks

Obrigado por contribuir! Este documento descreve o fluxo de contribuição recomendado para o projeto.

## Como contribuir

1. Fork do repositório (se estiver usando GitHub).
2. Crie um branch com um nome descritivo:

```
git checkout -b feat/nova-tela
```

3. Faça mudanças pequenas e commit frequente. Mensagens de commit sugeridas:
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `chore:` tarefas de manutenção

4. Rode checagens locais:

```powershell
npm install
npx tsc --noEmit
```

5. Abra um Pull Request com descrição clara do que foi alterado, instruções de teste e prints (se aplicável).

## Regras de estilo
- TypeScript para tipagem estática.
- Preferência por componentes funcionais + hooks.
- Evite mudanças de estilo ou formatação em arquivos não relacionados.

## Revisão de PR
- Um revisor fará análise de código; ajuste conforme comentários.
- Faça squash ou rebase se solicitado pelo mantenedor.

## Issues
- Ao abrir uma issue, inclua:
  - Descrição do problema
  - Passos para reproduzir
  - Logs / mensagens de erro (se houver)
  - Versão do app / sistema operacional

## Códigos de conduta
- Mantenha comunicação respeitosa e colaborativa.
- Abuse reports: abra uma issue privada para o mantenedor se ocorrer comportamento inadequado.
