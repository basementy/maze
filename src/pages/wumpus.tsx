import type { NextPage } from 'next';
import { useEffect, useMemo, useRef, useState } from 'react';
import Head from 'next/head';
import { cloneDeep } from 'lodash';

import { Button, Flex, Text } from '@/components/ui';

import { wumpusWorld, WumpusWorld } from '@/lib/wumpus';

const wumpusWorldClass = new WumpusWorld(cloneDeep(wumpusWorld));

const Wumpus: NextPage = () => {
  const wumpusRef = useRef(wumpusWorldClass);

  const [worldState, setWorldState] = useState<string[][]>();
  const [rerender, setRerender] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const getCellColor = (symbol: string) => {
    if (symbol === '.') return '$gray800';
    if (symbol === '#') return '$gray700';
    if (symbol === 'A') return '#99FEFF';
    if (symbol === 'W') return '#B983FF';
    if (symbol === 'G') return '#e8c364';
    if (symbol === 'P') return '#eb2848';
  };

  const getMessageColor = (message: string) => {
    if (message.toLowerCase().includes('wumpus')) return '#B983FF';
    if (message.toLowerCase().includes('gold')) return '#e8c364';
    if (message.toLowerCase().includes('won')) return '#75f08a';
    if (message.toLowerCase().includes('pit')) return '#eb2848';
  };

  const handleBoardReset = () => {
    wumpusRef.current.resetWorld(cloneDeep(wumpusWorld));

    const newWorldState = wumpusRef.current?.getMaskedWorld();

    setWorldState(() => newWorldState);
    setRerender(() => !rerender);
    setIsFinished(() => false);
    setMessages(() => []);
  };

  const handlePlayerMove = (action: 'up' | 'down' | 'left' | 'right') => {
    const status = wumpusRef.current?.movePlayerAndValidate(action);

    if (!!status) {
      const newWorldState = wumpusRef.current?.getMaskedWorld();
      const unMaskedWorldState = wumpusRef.current?.getWorld();

      setWorldState(() => newWorldState);
      setRerender(() => !rerender);
      setMessages(() => []);

      if (wumpusRef.current?.isPlayerCloseToPit()) {
        setMessages(() => ['Be careful! You are close to a pit!']);
      }

      if (wumpusRef.current?.isPlayerCloseToWumpus()) {
        setMessages((messages) => [
          ...messages,
          'Be careful! You are close to a wumpus!',
        ]);
      }

      if (wumpusRef.current?.isPlayerCloseToGold()) {
        setMessages((messages) => [...messages, 'You are close to the gold!']);
      }

      if (status === 'WON') {
        setIsFinished(() => true);
        setWorldState(() => unMaskedWorldState);
        setMessages(() => ['You won! Congratulations!']);
      }

      if (status === 'DEAD_BY_PIT') {
        setIsFinished(() => true);
        setWorldState(() => unMaskedWorldState);
        setMessages(() => ['You fell in a pit! Game over!']);
      }

      if (status === 'DEAD_BY_WUMPUS') {
        setIsFinished(() => true);
        setWorldState(() => unMaskedWorldState);
        setMessages(() => ['You were eaten by a wumpus! Game over!']);
      }
    }
  };

  useEffect(() => {
    setWorldState(wumpusRef.current.getMaskedWorld());
  }, []);

  return (
    <>
      <Head>
        <title>Wumpus World</title>
      </Head>
      <Flex
        align="center"
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
          <Text css={{ color: '$gray200' }}>Wumpus World</Text>
          <Text size="sm" css={{ color: '$gray500' }}>
            Puzzle Game
          </Text>
        </Flex>

        <Flex
          align="center"
          justify="center"
          direction="column"
          css={{
            width: '100%',
            maxWidth: '400px',
            height: '100%',
            padding: '$md',
            gap: '$md',
          }}
        >
          <Flex direction="column" css={{ width: '100%' }}>
            <Text weight="bold" size="xl" css={{ color: '$gray200' }}>
              Play the Wumpus Game
            </Text>
            <Text css={{ color: '$gray500' }}>
              Use the actions to move the player or shoot and solve the puzzle.
            </Text>
          </Flex>

          {messages.length > 0 && (
            <Flex direction="column" css={{ width: '100%', gap: '$sm' }}>
              {messages.map((message, messageIndex) => (
                <Flex
                  align="center"
                  key={messageIndex}
                  css={{
                    gap: '$sm',
                    width: '100%',
                    border: '1px solid',
                    borderColor: '$gray800',
                    borderRadius: '$sm',
                    paddingInline: '$md',
                    paddingBlock: '$sm',
                    backgroundColor: '$black',
                    transitionDuration: '0.3s',
                  }}
                >
                  <Flex
                    css={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '$lg',
                      backgroundColor: getMessageColor(message),
                    }}
                  />
                  <Text size="sm" css={{ color: '$gray200' }}>
                    {message}
                  </Text>
                </Flex>
              ))}
            </Flex>
          )}

          {!!worldState && (
            <Flex
              direction="column"
              css={{
                width: '100%',
                height: 'fit-content',
                padding: '$md',
                backgroundColor: '$black',
                borderRadius: '$sm',
                boxShadow: '$large',
                border: '1px solid',
                borderColor: '$gray800',
                gridGap: '$lg',
              }}
            >
              {worldState?.map((row, rowIndex) => (
                <Flex
                  key={JSON.stringify(worldState) + rowIndex}
                  css={{ width: '100%', height: '100%' }}
                >
                  {row.map((cell, cellIndex) => (
                    <Text
                      key={cell + cellIndex * 100}
                      css={{
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        transitionDuration: cell === '.' ? '0.5s' : '1s',
                        color: getCellColor(cell),
                      }}
                    >
                      {cell}
                    </Text>
                  ))}
                </Flex>
              ))}
            </Flex>
          )}

          <Flex
            direction="column"
            css={{
              width: '100%',
              gap: '$sm',
            }}
          >
            {!isFinished && !!worldState && (
              <>
                <Flex css={{ gap: '$sm' }}>
                  <Button
                    variant="primary"
                    css={{ width: '100%' }}
                    onClick={() => handlePlayerMove('up')}
                  >
                    Move Up
                  </Button>

                  <Button
                    variant="primary"
                    css={{ width: '100%' }}
                    onClick={() => handlePlayerMove('down')}
                  >
                    Move Down
                  </Button>
                </Flex>

                <Flex css={{ gap: '$sm' }}>
                  <Button
                    variant="primary"
                    css={{ width: '100%' }}
                    onClick={() => handlePlayerMove('left')}
                  >
                    Move Left
                  </Button>

                  <Button
                    variant="primary"
                    css={{ width: '100%' }}
                    onClick={() => handlePlayerMove('right')}
                  >
                    Move Right
                  </Button>
                </Flex>
              </>
            )}

            {!!worldState && (
              <Button variant="secondary" onClick={() => handleBoardReset()}>
                Reset
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Wumpus;
