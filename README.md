### Puzzle Solver

Esse é um projeto que utiliza BFS para resolver um labirinto e um jogo de Wumpus World. Utilizamos um Front-end para visualizar o labirinto e o resultado, permitindo também o usuário customizar o mesmo e definir diferentes valores para os simbolos que existem.

Você pode acessar o Front-end do projeto [aqui](https://puzzlesolver.vercel.app).

### Algoritmo - Maze

O projeto utiliza um algoritmo de Breath-First Search (BFS) para resolver o labirinto. O algoritmo utiliza uma fila para percorrer o labirinto, e cada elemento da fila é um par de coordenadas (linha, coluna). Através de cada par, seus vizinhos são identificados e adicionados à fila cada possivel.

Com os vizinhos definidos diversos checks são realizados até encontrar a sai do labirinto. Com a saida encontrada através da busca, é retornado um array de coordenadas que representa o caminho percorrido até a saida.

Com esse resultado, é possível visualizar o labirinto e o caminho percorrido até a saída, o total de passos e o total de scores obtidos.

O algoritmo pode ser encontrado dentro de `./src/lib/maze`, com os seguintes métodos:

- `getMazePathUsingBreathFirstSearch()`: retorna um array de coordenadas que representa o caminho percorrido até a saída do labirinto.
- `getNeighbors()`: retorna um array de coordenadas que representa os vizinhos de uma coordenada.
- `findStart()`: retorna a coordenada inicial do labirinto.
- `findEnd()`: retorna a coordenada final do labirinto.

### Algoritmo - Wumpus World

O puzzle de Wumpus World utiliza de métodos que são responsáveis por controlar o agente por um labirinto. Sempre que o agente se move, é verificado se existe um Wumpus ou um poço na nova posição. Se existir, o agente é morto. Se não existir, o agente continua a percorrer o labirinto. O agente também é responsável por verificar se o agente está na posição de um tesouro, e se estiver, o agente ganha um score.

A imprementação pode ser encontrado dentro de `./src/lib/wumpus`, com os seguintes métodos:
