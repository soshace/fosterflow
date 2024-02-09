/**
 * Layout for pages for authorized users like dashboard pages
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import withRouter from '../../components/withRouter';
import {
    getAuthorizedUser, 
    getUserAgents,
} from '../../redux/actions';
import Alerts from "./Alerts";
import SidebarMenuDesktop from "./SidebarMenuDesktop";
import SidebarMenuMobile from "./SidebarMenuMobile";

const Index = (props) => {
    console.log ('Layouts Authout Layout index rendering');
    const {
        children,
        layoutMode,
        getAuthorizedUser,
        getUserAgents,
    } = props;

    if (layoutMode){
        //TODO: move to jsx template
        document.body.setAttribute("data-bs-theme", props.layoutMode);
    }

    useEffect(() => {
        document.title = "FosterFlow Chat";

        if (!document.body.classList.contains('mobileStickUrlBar')) {
            document.body.classList.add('mobileStickUrlBar');
        }

        if (!document.documentElement.classList.contains('overscrollYnone')) {
            document.documentElement.classList.add('overscrollYnone');
        }

        getAuthorizedUser();
        getUserAgents();
    }, []);

    return (
        <React.Fragment>
            <div className="auth-layout">

                <div className="auth-layout-content">
                    <Alerts/>
                    {/* left sidebar menu */}
                    <SidebarMenuDesktop />
                    {/* <SidebarMenuMobile /> */}
                    {/* render page content */}
                    {children}
                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        layoutMode: state.Layout.layoutMode
    };
};

const mapDispatchToProps = {
    getAuthorizedUser,
    getUserAgents
  };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));