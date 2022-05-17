### Maze solver with BFS

Esse é um projeto que utiliza BFS para resolver um labirinto. Utilizamos um Front-end para visualizar o labirinto e o resultado, permitindo também o usuário customizar o mesmo e definir diferentes valores para os simbolos que existem.

Você pode acessar o Front-end do projeto [aqui](https://mazesolver.vercel.app).

### Algoritmo

O projeto utiliza um algoritmo de Breadth-First Search (BFS) para resolver o labirinto. O algoritmo utiliza uma fila para percorrer o labirinto, e cada elemento da fila é um par de coordenadas (linha, coluna). Através de cada par, seus vizinhos são identificados e adicionados à fila cada possivel.

Com os vizinhos definidos diversos checks são realizados até encontrar a sai do labirinto. Com a saida encontrada através da busca, é retornado um array de coordenadas que representa o caminho percorrido até a saida.

Com esse resultado, é possível visualizar o labirinto e o caminho percorrido até a saída, o total de passos e o total de scores obtidos.

O algoritmo pode ser encontrado dentro de [`./src/lib/maze`](https://github.com/gabsdotco/maze/blob/main/src/lib/maze/index.ts), com os seguintes métodos:

- `getMazePathUsingBreadthFirstSearch()`: retorna um array de coordenadas que representa o caminho percorrido até a saída do labirinto.
- `getNeighbors()`: retorna um array de coordenadas que representa os vizinhos de uma coordenada.
- `findStart()`: retorna a coordenada inicial do labirinto.
- `findEnd()`: retorna a coordenada final do labirinto.
