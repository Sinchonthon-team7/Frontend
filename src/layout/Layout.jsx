import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Header } from "./Header";
import BackgroundImage from '../assets/background.png';

const LayoutContainer = styled.div`
  width: 100%;
  min-height: 100vh; /* 전체 화면 높이를 차지하도록 설정 */
  background-image: url(${BackgroundImage}); /* 배경 이미지 적용 */
  background-size: cover; /* 화면에 꽉 차게 */
  background-position: center; /* 이미지 중앙 정렬 */
  background-repeat: no-repeat; /* 이미지 반복 없음 */
`;

const MainContent = styled.main`
  /* 필요에 따라 main 영역에 대한 스타일을 추가할 수 있습니다. */
`;

export const Layout = () => {
    return(
        <LayoutContainer>
            <Header />
            <MainContent>
                <Outlet />
            </MainContent>
        </LayoutContainer>
    )
}

export default Layout;