import styled from "styled-components";

export const WhiteButton = styled.button`
  border-style: solid;
  border-color: #bfbfbf;
  cursor: pointer;
  width: ${(props) => props.width || "300px"};
  height: ${(props) => props.height || "40px"};
  border-radius: 100px;
  border-width: 1px;
  background-color: white;
  font-weight: ${(props) => props.fontweight || "600"};
  color: ${(props) => props.buttontxtcolor || "#000000"};
  margin-top: ${(props) => props.margintop || "20px"};
  margin-bot: ${(props) => props.marginbot || "10px"};
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const ButtonDark = styled.button`
  cursor: pointer;
  width: ${(props) => props.width || "300px"};
  height: ${(props) => props.height || "40px"};
  border-radius: 100px;
  border-width: 0px;
  color: ${(props) => props.buttontxtcolor || "#ffffff"};
  border-color: #1d9bf0;
  background-color: ${(props) => props.buttonbgcolor || "#1d9bf0"};
  margin-top: ${(props) => props.margintop || "10px"};
  margin-bot: ${(props) => props.marginbot || "10px"};
  margin-left: ${(props) => props.marginleft || "0px"};
  &:hover {
    background-color: ${(props) => props.hover || "#1f1f1f"};
  }
`;
