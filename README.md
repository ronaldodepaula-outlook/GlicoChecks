# GlicoChecks

GlicoChecks é um aplicativo móvel (React Native + Expo) para registrar e acompanhar medições de glicemia, aplicações de insulina e notas relacionadas à saúde.

Principais funcionalidades
- Registrar medições de glicose (valor, tipo de alimentação, data/hora, observações)
- Registrar aplicações de insulina (dosagem, tipo, ponto, alimentação, data/hora, observações)
- Registrar notas (tipo, descrição, data/hora, observações)
- Histórico completo com filtros por período e tipo
- Gráficos de evolução (últimos registros de glicemia)
- Seletores de data/hora personalizados (JS puro)
- Integração com AsyncStorage para persistência local

Este repositório contém a base do app, componentes reutilizáveis e documentação para desenvolvedores e usuários.

---

## Status

- Linguagem: TypeScript
- Framework: React Native (Expo)

---

## Começando (Desenvolvedor)

### Requisitos
- Node.js (LTS recomendado)
- npm ou yarn
- Expo CLI (opcional): `npm install -g expo-cli`

### Passos rápidos (PowerShell)

```powershell
# instalar dependências
npm install

# checar tipos TypeScript
npx tsc --noEmit

# iniciar o app (Expo)
npm start
```

### Dependências opcionais para gráficos e ícones

Para exibir gráficos e ícones de forma completa no app, instale as dependências opcionais:

```powershell
npm install react-native-chart-kit react-native-svg @expo/vector-icons
```

---

## Estrutura do projeto

- `App.tsx` – definição do Stack Navigator e rotas principais.
- `src/screens/` – telas do aplicativo (Home, SelectMeasurementType, AddGlucose, AddInsulin, AddNote, History, Charts).
- `src/components/` – componentes reutilizáveis (ex.: `DateTimePickerSimple`).
- `src/services/storage.ts` – serviço de persistência usando AsyncStorage.
- `src/types/` – tipos TypeScript usados no app.
- `src/utils/` – utilitários (formatação de datas, etc.).

---

## Principais comandos

- `npm start` — inicia o Metro / Expo CLI.
- `npx tsc --noEmit` — checagem TypeScript (não emite arquivos).

---

## Contribuindo

Leia `CONTRIBUTING.md` para orientações detalhadas sobre como contribuir, fluxo de trabalho e regras de commit.

---

## Licença

Adicione aqui a licença do seu projeto (por exemplo MIT). Se quiser, eu posso adicionar um `LICENSE` com o conteúdo apropriado.
