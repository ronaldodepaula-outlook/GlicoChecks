# Guia do Desenvolvedor — GlicoChecks

Este guia explica como configurar o ambiente de desenvolvimento, estrutura do código, padrões e como estender o aplicativo.

Índice
- Requisitos
- Configuração do ambiente
- Estrutura do código
- Fluxo de dados e serviços
- Componentes principais
- Como adicionar uma nova tela
- Testes e checagens
- Estilo de código e commits

---

## Requisitos
- Node.js (versão LTS recomendada)
- npm ou yarn
- Expo CLI (opcional)
- Editor com suporte a TypeScript (VS Code recomendado)

---

## Configuração do ambiente
1. Clone o repositório

```powershell
git clone <repo-url>
cd GlicoChecks
npm install
```

2. Executando o app

```powershell
npx tsc --noEmit        # checar tipos
npm start               # iniciar Expo
```

3. Instalar dependências opcionais (gráficos e ícones)

```powershell
npm install react-native-chart-kit react-native-svg @expo/vector-icons
```

---

## Estrutura do código
- `App.tsx`: define o `Stack.Navigator` e registra as rotas.
- `src/screens/`: telas (cada tela é um componente React funcional em TypeScript).
- `src/components/`: componentes reutilizáveis (ex.: `DateTimePickerSimple`).
- `src/services/storage.ts`: camada de persistência com `AsyncStorage`.
- `src/types/`: definições de tipos TypeScript (ex.: `RootStackParamList`, registros).
- `src/utils/`: funções utilitárias, ex.: formatação de datas.

---

## Fluxo de dados e serviços
- Os dados são persistidos em `AsyncStorage` via o `StorageService`.
- Todas as telas que exibem dados chamam `StorageService.getRecords()` ou `getRecordsByType()` e atualizam o estado local.
- A `HomeScreen` re-carrega dados ao receber foco (`navigation.addListener('focus', ...)`) para garantir atualização dinâmica.

---

## Componentes principais
- `DateTimePickerSimple` — picker de data/hora implementado em JavaScript puro, com calendário em grade para seleção de dia.
- `ChartsScreen` — usa `react-native-chart-kit` (se instalado) para mostrar a evolução da glicemia.

---

## Como adicionar uma nova tela
1. Criar arquivo em `src/screens/NovaTela.tsx` seguindo o padrão das telas existentes.
2. Atualizar `src/types/index.ts` para adicionar a rota em `RootStackParamList`.
3. Registrar a rota em `App.tsx` com `Stack.Screen`.
4. Adicionar ícone (opcional) importando de `@expo/vector-icons`.
5. Testar fluxo navegando do app.

Exemplo mínimo:

```tsx
// src/screens/ExampleScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';

const ExampleScreen = () => (
  <View><Text>Example</Text></View>
);

export default ExampleScreen;
```

---

## Testes e checagens
- Use `npx tsc --noEmit` para checar tipos TypeScript.
- Adicione testes unitários com Jest / React Native Testing Library (não configurado por padrão).

---

## Estilo de código e commits
- Preferência por 2 ou 4 espaços (manter padrão do projeto existente).
- Escreva commits pequenos e atômicos; siga um padrão de mensagens (ex.: `feat:`, `fix:`, `chore:`).
- Abra Pull Requests no repositório remoto e peça revisão.

---

## Notas de arquitetura / decisões
- Escolhi `AsyncStorage` para simplicidade (aplicação local sem backend).
- O `DateTimePickerSimple` foi implementado em JS puro para compatibilidade multiplataforma sem dependências nativas.
- Gráficos são opcionais via `react-native-chart-kit` para reduzir dependências obrigatórias.

Se quiser, eu posso:
- Adicionar scripts de lint/format (ESLint + Prettier),
- Configurar testes com Jest,
- Adicionar CI (GitHub Actions) com checagem de tipos e linting.
