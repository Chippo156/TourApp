import "./infor.scss";
export default function UserDetails() {
  return (
    <div>
      <h1>
        <b>USER INFORMATION</b>
      </h1>
      <div
        style={{ display: "flex", alignItems: "center" }}
        className="main-container"
      >
        <div className="container_left">
          <div className="infor_left">
            <label>First Name: </label>
            <div className="title">Nghĩa Hiệp</div>
          </div>
          <div className="infor_left">
            <label>Last Name: </label>
            <div className="title"> Nguyễn</div>
          </div>
          <div className="infor_left">
            <label>Email: </label>
            <div className="title"> Heheh@</div>
          </div>
          <div className="infor_left">
            <label>Phone: </label>
            <div className="title"> 123456789</div>
          </div>
          <div className="infor_left">
            <label>Address: </label>
            <div className="title"> Hà Nội</div>
          </div>
          <div className="infor_left">
            <label>Information: </label>
            <div className="title"> Hehe</div>
          </div>
        </div>
      </div>
    </div>
  );
}
