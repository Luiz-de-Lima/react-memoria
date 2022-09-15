import React from "react";
import * as C from "./styles";

type PropsItem = {
  label: string;
  value: string;
};
export const InfoItem = ({ label, value }: PropsItem) => {
  return (
    <C.Container>
      <C.label>{label}</C.label>
      <C.Value>{value}</C.Value>
    </C.Container>
  );
};
