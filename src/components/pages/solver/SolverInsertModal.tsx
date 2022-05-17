import { FC, useMemo, useState } from 'react';

import { Button, Flex, Input, Text, Textarea } from '@/components/ui';

export const exampleMaze = `#############################
#....###############...#...##
#.##........@........#.#.#..#
S.####################...##.#
##########################..#
#..................@.......##
#.###########################
#..........@................F
#############################`;

export interface MazeConfiguration {
  maze: string;
  startSymbol: string;
  endSymbol: string;
  scoreSymbol: string;
}

export interface SolverInsertModalProps {
  onConfirm: (configuration: MazeConfiguration) => void;
  onClose: () => void;
}

export const SolverInsertModal: FC<SolverInsertModalProps> = ({
  onClose,
  onConfirm,
}) => {
  const [maze, setMaze] = useState(exampleMaze);
  const [startSymbol, setStartSymbol] = useState('S');
  const [endSymbol, setEndSymbol] = useState('F');
  const [scoreSymbol, setScoreSymbol] = useState('@');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInsert = () => {
    setErrorMessage('');

    if (maze.length && !!startSymbol && !!endSymbol && !!scoreSymbol) {
      if (
        maze.includes(startSymbol) &&
        maze.includes(endSymbol) &&
        maze.includes(scoreSymbol)
      ) {
        onConfirm({
          maze,
          startSymbol,
          endSymbol,
          scoreSymbol,
        });

        onClose();
      } else {
        setErrorMessage('Your maze should contain all the defined symbols');
      }
    }
  };

  const isFormValid = useMemo(() => {
    return !!maze.length && !!startSymbol && !!endSymbol && !!scoreSymbol;
  }, [maze, startSymbol, endSymbol, scoreSymbol]);

  return (
    <Flex
      align="center"
      justify="center"
      css={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      <Flex
        css={{
          zIndex: '10',
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundColor: '$black',
          opacity: '0.8',
        }}
      />
      <Flex
        direction="column"
        css={{
          zIndex: '15',
          width: '100%',
          maxWidth: '720px',
          backgroundColor: '$gray900',
          boxShadow: '$large',
          border: '1px solid',
          borderColor: '$gray800',
          borderRadius: '$sm',
        }}
      >
        <Flex
          css={{
            width: '100%',
            padding: '$md',
            borderBottom: '1px solid',
            borderBottomColor: '$gray800',
          }}
        >
          <Text size="lg" weight="bold" css={{ color: '$white' }}>
            Insert maze
          </Text>
        </Flex>
        <Flex direction="column" css={{ padding: '$md', gap: '$md' }}>
          {!!errorMessage && (
            <Flex
              css={{
                width: '100%',
                padding: '$md',
                borderRadius: '$sm',
                backgroundColor: '$white',
              }}
            >
              <Text css={{ color: '$gray900' }}>{errorMessage}</Text>
            </Flex>
          )}
          <Textarea
            rows={12}
            value={maze}
            onChange={({ target }) => setMaze(target.value)}
          />
          <Flex css={{ width: '100%', gap: '$md' }}>
            <Flex direction="column" css={{ width: '100%', gap: '$sm' }}>
              <Text size="sm" css={{ color: '$gray500' }}>
                Start symbol
              </Text>
              <Input
                value={startSymbol}
                placeholder="The start of the maze"
                onChange={({ target }) => setStartSymbol(target.value)}
              />
            </Flex>
            <Flex direction="column" css={{ width: '100%', gap: '$sm' }}>
              <Text size="sm" css={{ color: '$gray500' }}>
                End symbol
              </Text>
              <Input
                value={endSymbol}
                placeholder="The end of the maze"
                onChange={({ target }) => setEndSymbol(target.value)}
              />
            </Flex>
            <Flex direction="column" css={{ width: '100%', gap: '$sm' }}>
              <Text size="sm" css={{ color: '$gray500' }}>
                Score symbol
              </Text>
              <Input
                value={scoreSymbol}
                placeholder="The maze scores"
                onChange={({ target }) => setScoreSymbol(target.value)}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex
          justify="end"
          css={{
            width: '100%',
            padding: '$md',
            borderTop: '1px solid',
            borderTopColor: '$gray800',
            gap: '$md',
          }}
        >
          <Button variant="secondary" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={!isFormValid}
            onClick={() => handleInsert()}
          >
            Insert
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
