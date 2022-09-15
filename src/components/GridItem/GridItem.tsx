import React from "react";
import { GridItemType } from "../../types/GridItemType";
import b7Svg from "../../svgs/b7.svg";
import { items } from "../../data/items";
import * as C from "./styles";

type gridProps = {
  item: GridItemType;
  onClick: () => void;
};

export const GridItem = ({ item, onClick }: gridProps) => {
  return (
    <C.Container
      showBackground={item.permanetShown || item.show}
      onClick={onClick}
    >
      {item.permanetShown === false && item.show === false && (
        <C.Icon src={b7Svg} alt="" />
      )}

      {item.permanetShown ||
        (item.show && item.item !== null && (
          <C.Icon src={items[item.item].icon} alt="" opacity={0.1} />
        ))}
    </C.Container>
  );
};
