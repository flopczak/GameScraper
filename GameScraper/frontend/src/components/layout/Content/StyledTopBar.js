import styled from "styled-components";

export const StyledTopBar = styled.div`
  top: 0;
  width: ${(props) => (props.sidebarIsOpen ? "85%" : "97%")};
  position: fixed;
  z-index: 100;
`;
