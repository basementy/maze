import type { NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';

import { getMazePathUsingBreadthFirstSearch } from '@/lib/maze';

import { Button, Flex, Text } from '@/components/ui';
import {
  exampleMaze,
  MazeConfiguration,
  SolverInsertModal,
} from '@/components/pages';
import Head from 'next/head';

const exampleMazeConfiguration: MazeConfiguration = {
  maze: exampleMaze,
  startSymbol: 'S',
  endSymbol: 'E',
  scoreSymbol: '@',
};

const Home: NextPage = () => {
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const [mazeSolutionPath, setMazeSolutionPath] =
    useState<({ x: number; y: number } | undefined)[]>();

  const [mazeConfiguration, setMazeConfiguration] = useState<MazeConfiguration>(
    exampleMazeConfiguration
  );

  const getSplittedMaze = useMemo(() => {
    return mazeConfiguration.maze.split('\n').map((row) => row.split(''));
  }, [mazeConfiguration]);

  const getCellColor = (x: number, y: number, type: string) => {
    if (
      mazeSolutionPath?.some((path) => path?.x === x && path?.y === y) &&
      isSolved
    ) {
      if (type === mazeConfiguration.scoreSymbol) return '#B983FF';
      else return '#99FEFF';
    } else {
      return isSolved ? '$gray800' : '$gray700';
    }
  };

  const handleSolveMaze = () => {
    const path = getMazePathUsingBreadthFirstSearch(
      getSplittedMaze,
      mazeConfiguration?.startSymbol,
      mazeConfiguration?.endSymbol
    );

    if (path) {
      setMazeSolutionPath(path);
      setIsSolved(true);
    }
  };

  const handleReset = () => {
    setMazeConfiguration(exampleMazeConfiguration);
    setMazeSolutionPath(undefined);
    setIsSolved(false);
    setTotalScore(0);
  };

  const handleInsertMaze = (mazeConfiguration: MazeConfiguration) => {
    handleReset();

    setMazeConfiguration(mazeConfiguration);
  };

  useEffect(() => {
    if (mazeSolutionPath) {
      getSplittedMaze.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          if (
            mazeSolutionPath.find(
              (path) =>
                path?.x === cellIndex &&
                path?.y === rowIndex &&
                cell === mazeConfiguration.scoreSymbol
            )
          ) {
            setTotalScore((totalScore) => totalScore + 1);
          }
        });
      });
    }
  }, [mazeSolutionPath, getSplittedMaze, mazeConfiguration.scoreSymbol]);

  return (
    <>
      <Head>
        <title>BFS Algorithm - Maze solver</title>
      </Head>
      <Flex
        direction="column"
        css={{
          width: '100%',
          height: '100%',
          backgroundColor: '#090909',
          backgroundImage: 'radial-gradient($gray900 1px, transparent 0)',
          backgroundSize: '8px 8px',
          backgroundPosition: '-19px -19px',
          overflow: 'auto',
        }}
      >
        <Flex direction="column" css={{ width: '100%', padding: '$md' }}>
          <Text css={{ color: '$gray200' }}>Maze solver</Text>
          <Text size="sm" css={{ color: '$gray500' }}>
            Breadth First Search Algorithm
          </Text>
        </Flex>
        <Flex
          align="center"
          justify="center"
          direction="column"
          css={{ width: '100%', height: '100%', padding: '$md', gap: '$md' }}
        >
          <Flex direction="column" css={{ width: '100%', maxWidth: '600px' }}>
            <Text weight="bold" size="xl" css={{ color: '$gray200' }}>
              Solve a n:n maze
            </Text>
            <Text css={{ color: '$gray500' }}>
              Use the default maze or{' '}
              <Text
                as="span"
                css={{
                  color: '$gray500',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  '&:hover': {
                    color: '$gray300',
                  },
                }}
                onClick={() => setIsInsertModalOpen(true)}
              >
                enter your own
              </Text>
            </Text>
          </Flex>
          <Flex
            direction="column"
            css={{
              width: '100%',
              height: 'fit-content',
              maxWidth: '600px',
              padding: '$md',
              backgroundColor: '$black',
              borderRadius: '$sm',
              boxShadow: '$large',
              border: '1px solid',
              borderColor: '$gray800',
            }}
          >
            {getSplittedMaze?.map((row, rowIndex) => (
              <Flex key={rowIndex} css={{ width: '100%', height: '100%' }}>
                {row.map((cell, cellIndex) => (
                  <Text
                    key={cellIndex}
                    css={{
                      width: '100%',
                      height: '100%',
                      transitionDuration: cell === '.' ? '0.5s' : '1s',
                      color: getCellColor(cellIndex, rowIndex, cell),
                    }}
                  >
                    {cell}
                  </Text>
                ))}
              </Flex>
            ))}
          </Flex>
          <Flex justify="between" css={{ width: '100%', maxWidth: '600px' }}>
            <Flex direction="column">
              <Text
                size="sm"
                css={{ color: !isSolved ? '$gray500' : '#99FEFF' }}
              >
                Total steps: {mazeSolutionPath?.length || 0}
              </Text>
              <Text
                size="sm"
                css={{ color: !isSolved ? '$gray500' : '#B983FF' }}
              >
                Total scores: {totalScore}
              </Text>
            </Flex>
            <Flex css={{ gap: '$md' }}>
              <Button variant="secondary" onClick={() => handleReset()}>
                Reset
              </Button>
              <Button
                variant="primary"
                disabled={isSolved}
                onClick={() => handleSolveMaze()}
              >
                Solve
              </Button>
            </Flex>
          </Flex>
        </Flex>
        {isInsertModalOpen && (
          <SolverInsertModal
            onClose={() => setIsInsertModalOpen(false)}
            onConfirm={(mazeConfiguration) =>
              handleInsertMaze(mazeConfiguration)
            }
          />
        )}
      </Flex>
    </>
  );
};

export default Home;
