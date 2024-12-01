import { useSelector } from "react-redux";
import "./infor.scss";
export default function UserDetails() {
  const user = useSelector((state) => state.user.user);
  console.log(user);

  return (
    <div className="user-container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
        className="main-container-user"
      >
        <h1>
          <span>Thông tin cá nhân</span>
        </h1>
        <div className="container_left">
          <div className="infor_left">
            <label>First Name: </label>
            <div className="title">{user.first_name}</div>
          </div>
          <div className="infor_left">
            <label>Last Name: </label>
            <div className="title"> {user.last_name}</div>
          </div>
          <div className="infor_left">
            <label>Email: </label>
            <div className="title">{user.email}</div>
          </div>
          <div className="infor_left">
            <label>Phone: </label>
            <div className="title"> {user.phone}</div>
          </div>
          <div className="infor_left">
            <label>Address: </label>
            <div className="title"> {user.address}</div>
          </div>
          <div className="infor_left">
            <label>Information: </label>
            <div className="title"> {user.information_agent}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
