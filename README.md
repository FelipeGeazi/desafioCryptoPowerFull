# Desafio Crypto Power Full 💸💸💸💸


Objetivo 
O Desafio Crypto Power Full, consite na criação de um token no formato ERC20 para que possa ser distribuido entre os participantes da rede. O desafio é agregado com  a implementação de testes para o contrato. Além de funções especificas como as seguintes. 

Mint
A partir de agora o suprimento total pode sofrer alteração através do processo de Mint (Mint significa Cunhagem, em inglês). Ou seja novos tokens podem ser criados e distribuidos (ou não) dentro da rede. Usamos a logica de adicionar 10 tokens em cada trasação ao supply total da rede. A configuração consiste na limitação de 500 tokens a ser disponibilizados a rede. Toda vez que o total supply superar esse valor, ativa a função Burn. 

Burn
A partir de agora tokens podem deixar de existir, tambem afetando o suprimento total de tokens na rede. Para criar o qeuilibrio da rede. Realizamos a função Burn, que consiste na queima de metade do total supply. Todas as vezes que o mesmo ultrapassa a marca de 500 tokens

Pausable
Negociações e transferencias podem ser pausadas e impedidas de serem feitas por quanto tempo o dono do contrato quiser. Somente serão reativadas as tranferencias mediate a activação do contrato pela função activeCancelled(0).

kill
Ela requer que o contrato esteja cancelado para ser validada. Após a sua execução, todas as operações serão impedidas de ser concluidas. 







Instruções
Tente executar algumas das seguintes tarefas no terminal:

 ```
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
Menbros envolvidos:
[@FelipeGeazi](https://github.com/FelipeGeazi)
[@danielcsar](https://github.com/danielcsar)
[@menezesmario](https://github.com/menezesmario)
