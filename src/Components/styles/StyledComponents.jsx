import { Skeleton, keyframes, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { colorGray, matBlack } from "../../constants/color";

export const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: 1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

export const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const InputBox = styled("input")`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 3rem;
  font-size: 20px;
  border-radius: 1.5rem;
  background-color: ${colorGray};
`;

export const SearchField = styled("input")`
  padding: 1rem 2rem;
  width: 20vmax;
  outline: none;
  border: none;
  border-bottom: 2px solid ${matBlack};

  background-color: ${colorGray};
  font-size: 1.1rem;
`;

export const CurvedButton = styled("button")`
  border-radius: 1.5rem;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: none;
  gap: 12px;
  oultine: none;
  background-color: ${matBlack};
  transition: all ease 0.2s;
  cursor: pointer;
  color: white;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const bounceAnimation = keyframes`
  0% {transform :scale(1);}
  50% {transform :scale(1.5);}
  100% {transform :scale(1);}
`;

export const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bounceAnimation} 1s infinite`,
}));
