import React from "react";
import * as C from "./styles";

type propsButton = {
  label: string;
  icon?: any;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

export const Button = ({ label, icon, onClick }: propsButton) => {
  return (
    <C.Container onClick={onClick}>
      {icon && (
        <C.IconArea>
          <C.Icon src={icon} />
        </C.IconArea>
      )}

      <C.Label>{label}</C.Label>
    </C.Container>
  );
};
