function Image(props) {
    return <div className="image card-body"><img src={props.src} alt="logo" style={{ width: "150px" }} /></div>;
  }
  export default Image;