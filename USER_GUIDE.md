# Guia do Usuário — GlicoChecks

Bem-vindo ao GlicoChecks! Este guia descreve como usar o aplicativo para registrar medições e acompanhar sua evolução.

## Fluxo principal

1. **Home**
   - Exibe a sua última medição de glicose (se houver), estatísticas e dicas.
   - Botões de acesso rápido: Glicose, Insulina, Notas, Histórico e Gráficos.

2. **Nova Medição**
   - Toque em `+ Nova Medição` (ou use o menu rápido) para escolher o tipo: Glicose, Insulina ou Notas.

3. **Formulários**
   - Cada formulário tem campos específicos:
     - **Glicose**: Valor (mg/dL), Alimentação (Jejum/Pré-Refeição/Pós-Refeição/Solução de Controle), Data, Hora, Observações.
     - **Insulina**: Dosagem (unidades), Tipo de Insulina, Ponto de Aplicação, Alimentação, Data, Hora, Observações.
     - **Notas**: Tipo de Nota (Exercício/Refeição/Outros), Descrição Breve, Data, Hora, Observações.
   - `Data` e `Hora` usam seletores personalizados: toque para abrir o calendário (selecione um dia) e, se necessário, escolha hora/minuto.
   - Preencha os campos obrigatórios e toque em `Salvar`.

4. **Histórico**
   - Acesse `Histórico` para ver a lista completa de registros.
   - Use filtros por período (Início/Fim) e por tipo (Todos/Glicose/Insulina/Notas).
   - Toque em um registro para ver detalhes (implementar edição/exclusão como melhoria opcional).

5. **Gráficos**
   - Acesse `Gráficos` para visualizar a evolução da glicemia (últimos 20 registros por padrão).
   - Observação: para visualizar o gráfico é necessário instalar dependência opcional `react-native-chart-kit` e `react-native-svg` (ver `README.md`).

## Dicas de uso
- Registre medições com precisão: inclua tipo de alimentação para melhor contexto.
- Use notas para registrar eventos (ex.: exercício, refeições grandes) que influenciam seus níveis.
- Verifique o Histórico com filtros para analisar períodos específicos.

## Privacidade e armazenamento
- Todos os dados são armazenados localmente no dispositivo usando AsyncStorage.
- Não há sincronização com servidores por padrão; se desejar, podemos adicionar suporte a nuvem (Firebase, backend custom, etc.).

## Suporte
- Se encontrar erros ou desejar melhorias, abra uma issue no repositório do GitHub com detalhes (passos para reproduzir, logs, versão do app).

Obrigada por usar o GlicoChecks! Se quiser melhorias na experiência do usuário, me diga quais recursos priorizar (ex.: editar/excluir registros, exportar CSV, sincronização).