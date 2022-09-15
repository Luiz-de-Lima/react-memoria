import React, { useEffect, useState } from "react";
import logoImg from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";
import { Button } from "./components/Button/Button";
import { InfoItem } from "./components/InfoItem/InfoItem";
import * as C from "./App.styles";
import { GridItemType } from "./types/GridItemType";
import { items } from "./data/items";
import { GridItem } from "./components/GridItem/GridItem";
import { formatTimeElapsed } from "./components/helpers/formatTimeElapsed";

export const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItem] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  //verify if opned are equal
  useEffect(() => {
    if (showCount === 2) {
      let opened = gridItems.filter((item) => item.show === true);
      if (opened.length === 2) {
        //se igual.deixar permanente

        if (opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems];
          for (let i in tmpGrid) {
            if (tmpGrid[i].show) {
              tmpGrid[i].permanetShown = true;
              tmpGrid[i].show = false;
            }
          }
          setGridItem(tmpGrid);
          setShowCount(0);
        } else {
          setTimeout(() => {
            let tmpGrid = [...gridItems];
            for (let i in tmpGrid) {
              tmpGrid[i].show = false;
            }
            setGridItem(tmpGrid);
            setShowCount(0);
          }, 1000);
        }

        setMoveCount((moveCount) => moveCount + 1);
      }
    }
  }, [showCount, gridItems]);

  useEffect(() => {
    if (
      moveCount > 0 &&
      gridItems.every((item) => item.permanetShown === true)
    ) {
      setPlaying(false)
    }
  }, [moveCount, gridItems]);

  const resetAndCreateGrid = () => {
    //resetar jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);

    //criar grid e começar o jogo
    setPlaying(true);
    //criar grid vazio
    let tempGrid: GridItemType[] = [];
    for (let i = 0; i < items.length * 2; i++) {
      tempGrid.push({
        item: null,
        show: false,
        permanetShown: false,
      });
    }
    //preencher o grid

    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tempGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tempGrid[pos].item = i;
      }
    }
    setGridItem(tempGrid);
    setPlaying(true);
  };

  const handleItemCLick = (index: number) => {
    if (playing && index !== null && showCount < 2) {
      let tmpGrid = [...gridItems];

      if (
        tmpGrid[index].permanetShown === false &&
        tmpGrid[index].show === false
      ) {
        tmpGrid[index].show = true;
        setShowCount(showCount + 1);
      }
      setGridItem(tmpGrid);
    }
  };

  return (
    <C.Container>
      <C.Info>
        <C.logoLink>
          <img src={logoImg} width="200" alt="logo imagem" />
        </C.logoLink>
        <C.infoArea>
          <InfoItem label="tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos " value={moveCount.toString()} />
        </C.infoArea>
        <Button
          label="Reiniciar"
          icon={RestartIcon}
          onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        {gridItems.map((item, index) => (
          <GridItem
            key={index}
            item={item}
            onClick={() => handleItemCLick(index)}
          />
        ))}
      </C.GridArea>
    </C.Container>
  );
};
