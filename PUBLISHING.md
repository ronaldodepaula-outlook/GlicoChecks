# Publicação & Releases — GlicoChecks

Este guia descreve os passos para publicar o projeto no GitHub e, futuramente, publicar builds (APK / IPA) via Expo/EAS.

## Publicar no GitHub
1. Crie um repositório no GitHub.
2. Configure o remoto e envie o código:

```powershell
git remote add origin <git-url>
git push -u origin main
```

3. Adicione `README.md`, `CONTRIBUTING.md` e `LICENSE` ao repositório (estes arquivos já existem neste projeto).
4. Use tags semânticas para marcar releases:

```powershell
git tag -a v1.0.0 -m "Primeira versão"
git push origin --tags
```

5. Crie um Release no GitHub (opcional): inclua notas de versão e artefatos.

## Publicar builds com Expo
### 1) Expor uma versão de preview (Expo Dev)

```powershell
npm start
# use QR code para executar no app Expo
```

### 2) Builds nativas (EAS) — (recomendado para distribuição)

1. Configure conta Expo e EAS (https://docs.expo.dev/eas/)
2. Instale `eas-cli` globalmente:

```powershell
npm install -g eas-cli
```

3. Autentique e configure o projeto:

```powershell
eas login
eas build:configure
```

4. Gerar build (Android/iOS):

```powershell
# Android
eas build --platform android

# iOS
eas build --platform ios
```

Observação: iOS requer conta Apple e configuração de certificados.

## Publicação na loja (Play Store / App Store)
- Depois de gerar builds com EAS, baixe os artefatos e siga os procedimentos do Google Play Console e App Store Connect para subir o APK/AAB ou IPA.

## Boas práticas para releases
- Atualize `package.json` com a nova versão antes de criar a tag.
- Mantenha um `CHANGELOG.md` (ou use a seção de releases do GitHub) com as alterações.
- Teste o build em dispositivos reais quando possível.

Se precisar, posso:
- Gerar um `CHANGELOG.md` automático com base nos commits,
- Configurar GitHub Actions para CI (checagem de tipos e build Android),
- Ajudar a configurar EAS para builds automatizados.
