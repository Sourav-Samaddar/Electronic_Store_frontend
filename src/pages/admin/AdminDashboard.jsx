import { Navigate, Outlet } from "react-router-dom";
import { isAdminUser } from "../../auth/HelperAuth";
import { Card, Col, Container, Row} from "react-bootstrap";
import useJwtTokenExpiration from "../../hooks/useJwtTokenExpiration";
import AdminDrawer from "../../components/admin/AdminDrawer";
import { useEffect, useState } from "react";
import SideMenu from "../../components/admin/SideMenu";
import Footer from "../../components/Footer";

const AdminDashboard = ()=>{

    const flag = useJwtTokenExpiration();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
  
    useEffect(() => {
        window.addEventListener("resize", () => {
            const ismobile = window.innerWidth < 1000;
            if (ismobile !== isMobile) setIsMobile(ismobile);
        }, false);
    }, [isMobile]);

    const adminDashboardView = ()=>{
        return (
            <>
            <div className="body-section">
                {
                    isMobile ? 
                        <Card>
                            <AdminDrawer />
                        </Card>:
                        <Container fluid className="px-3 py-3">
                            <Row>
                                <Col xs={{span:2}}>
                                    <SideMenu />
                                </Col>
                                <Col xs={{span:10}} className="ps-3 pt-2">
                                    <Outlet />
                                </Col>
                            </Row>
                        </Container>
                }
            </div>
            <Footer />
            </>
        )
    }

    return(
        (isAdminUser()) ? adminDashboardView() : <Navigate to={'/login'} />
    )
}
export default AdminDashboard;