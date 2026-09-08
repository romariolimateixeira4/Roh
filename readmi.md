# ROH — Questões Carolina 2026

## Conteúdo do pacote

- `index.html` — protótipo front-end em arquivo único, responsivo e executável localmente no navegador.
- `readmi.md` — documentação resumida do projeto.

## Objetivo

Este pacote representa a base visual/funcional inicial do **ROH — Questões Carolina 2026**, conforme o prompt mestre e os ajustes solicitados.

O projeto foi dimensionado conceitualmente para um banco inicial de **14.000+ questões originais**, distribuído por camadas:

| Camada | Mínimo | Quantidade de unidades | Subtotal |
|---|---:|---:|---:|
| Conhecimentos Comuns | 350/disciplina | 9 | 3.150 |
| Fundamental | 120/cargo | 10 | 1.200 |
| Médio/Técnico | 200/cargo | 11 | 2.200 |
| Superior | 220/cargo | 31 | 6.820 |
| Módulo Municipal | — | — | 800 |
| **Total** | | | **14.170** |

> Observação: a soma matemática dos mínimos da tabela é 14.170, portanto o requisito de 14.000+ é atendido.

## Funcionalidades representadas no protótipo

- Dashboard ROH.
- Controle de cobertura por cargo.
- Alerta visual para cargo abaixo do mínimo.
- Categorias de revisão: urgente, reforço e manutenção.
- Classificação de erros: conhecimento, interpretação, pegadinha e desatenção.
- Estrutura de questão com alternativas A–D.
- Campo de dificuldade.
- Identificação de cargo, disciplina e fonte.
- Base preparada conceitualmente para repetição espaçada.
- Interface responsiva para celular e desktop.

## Importante sobre o banco de questões

O `index.html` é um **protótipo**, não contém as 14.000 questões reais. Os números exibidos no dashboard são demonstrativos.

Para uma versão de produção, é necessário conectar o front-end a um banco de dados e implementar:

1. autenticação segura;
2. autorização por cargo/usuário;
3. banco persistente de questões;
4. painel administrativo;
5. importação/exportação CSV/JSON;
6. geração e revisão de questões;
7. detecção de duplicidade;
8. repetição espaçada;
9. histórico de respostas;
10. simulados com a matriz oficial;
11. controle de validade das permissões;
12. fundamentação e validação das questões jurídicas;
13. expansão para 20.000, 30.000 e 50.000+ questões.

## Revisão inteligente

O modelo definido pelo prompt deve considerar:

- erros das últimas 48 horas;
- erros recorrentes;
- tipo de erro;
- dificuldade;
- tempo desde a última resposta;
- intervalos crescentes de revisão, como 1, 3, 7 e 14 dias;
- percentual de acerto por assunto;
- peso do assunto na prova;
- proximidade da data da prova.

## Originalidade

As questões de produção devem ser originais e não copiadas de plataformas ou materiais protegidos. O sistema pode utilizar legislação e conhecimentos públicos como referência, mas deve criar enunciados e alternativas próprios.

## Como abrir

Extraia o ZIP e abra `index.html` em um navegador moderno.

Nenhum servidor é necessário para visualizar o protótipo.

## Próxima etapa recomendada

Transformar este protótipo em uma aplicação completa com banco de dados, autenticação, painel administrativo e carga real das questões conforme a matriz do edital do Concurso Público nº 001/2026 da Prefeitura de Carolina-MA.
