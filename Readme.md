##Sales Record System relatório

Objetivos alcançados
1. Envio de arquivos
2. Parsing dos arquivos
3. Elaboração de uma mensagem de erro caso haja falha no parsing

##Processo de desenvolvimento

1. Analisando os requisitos e aruqivos, concluiu-se todas as entradas de arquivo poderiam ser armazenadas em 2 tipos de vendas
a. Venda Simples
b. Venda Comissionada
- Onde as transações do tipo 1 formariam a venda simples e transações do tipo 2, 3 e 4 seriam unidas em uma venda comissionada
- Foi inferida uma dependência funcional com base na hora x produto nos tipos 2, 3 e 4, permitindo conectar os 3 em uma mesma venda para fins de normalização
- Ao encontrar uma transação do tipo 2, 3 ou 4. Busca-se no banco pela combinação, hora x produto (utilizada nesse caso como chave primária)
para encontrar a transação comissionada correspondente a ela
- Se não for encontrada, uma nova é criada.

2. Criação de um front-end simples, parsing de arquivos feito com base no tamanho definido no arquivo de requisitos
3. Envio do arquivo para o Backend
4. Processamento de erros baseados em tipagem e valor dos elementos após o parsing
5. Uso de DTO para gerar objeto tipado com base no item recebido pelo backend
6. Criação de mensagem de erros com base em array de objetos de erro: "EntryError"
-Cada objeto mostra uma linha e os valores com erro que foram encontrados nela
-Uma possível melhoria seria o uso do sistema de annotations do nest para validação de dados


