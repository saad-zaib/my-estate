import PropTypes from "prop-types";
import sergio from "../../assets/sergio.png";
import logout from "../../assets/logout1.svg";
import { unSetUserToken } from "../../features/authSlice.js";
import { unsetUserInfo } from "../../features/userSlice";
import { removeToken } from "../../services/LocalStorageService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const RealtorInformation = ({ className = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: "", email: "" }));
    dispatch(unSetUserToken({ access_token: null }));
    removeToken();
    navigate("/login");
  };
  return (
    <div>
      <div
        onClick={handleLogout}
        className="self-stretch rounded-21xl flex flex-row items-center justify-end py-2 px-0 box-border gap-[12px] max-w-full text-base text-crimson"
      >
        <img className="h-4 w-4 relative" loading="lazy" alt="" src={logout} />
        <h1 className="m-0 flex-1 relative text-inherit font-medium font-inherit inline-block max-w-[calc(100%_-_28px)]">
          <button>Logout</button>
        </h1>
      </div>
    </div>
  );
};

RealtorInformation.propTypes = {
  className: PropTypes.string,
};

export default RealtorInformation;
