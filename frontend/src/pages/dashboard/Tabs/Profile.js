import React, { useEffect } from 'react';
import { NavLink as RouterNavLink } from "react-router-dom";
import { connect } from "react-redux";
import withRouter from "../../../components/withRouter";
import SideBarMenuMobile from '../../../layouts/AuthLayout/SideBarMenuMobile';
import { useTranslation } from "react-i18next";

function Profile(props) {
  /* intilize t variable for multi language implementation */
  const { 
    agent,
    agentAvatar,
    user
  } = props;
  const { t } = useTranslation();

  useEffect(() => {
    if (user === null) {
      return
    }

    if (agent === null) {
      return
    }

}, [user, agent]);

  function fullName (){
    if (agent !== null) {
      const agentData = agent.agent;
      const firstName = agentData.first_name;
      const lastName = agentData.last_name;
      if (firstName || lastName) {
          return firstName + " " + lastName; 
      }
    }
    return t("Name not specified");
  }

  return (
    <React.Fragment>
      <div className="user-profile me-lg-1">
        <div className="user-profile-wrapper">
          <div className="p-4">
            <div className="user-chat-nav float-end">
              <RouterNavLink to="/settings" className="btn btn-light btn-sm">
                <i className="ri-pencil-fill"></i> {t("Edit")}
              </RouterNavLink>
            </div>
            <h4 className="mb-0">{t("My Profile")}</h4>
          </div>

          <div className="user-profile-sroll-area">
            <div className="px-4 pb-4">
              <div className="mb-4">
                <img
                  src={agentAvatar}
                  className="rounded-circle avatar-lg img-thumbnail"
                />
              </div>

              <h5 className="font-size-16 mb-1 text-truncate">
                {fullName()}
              </h5>
            </div>
            {/* End profile user  */}
          </div>
          {/* end user-profile-scroll-area  */}
        </div>
        <SideBarMenuMobile />
      </div>
    </React.Fragment>
  );
}

//TODO: suscribe only to required fields. Prevent redundunt re-render 
const mapStateToProps = (state) => ({
  agent: state.Agents.agent,
  agentAvatar: state.Agents.avatar,
  user: state.User.user  
});

const mapDispatchToProps = {
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
