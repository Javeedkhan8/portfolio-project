const Message = ({ type, children }) => {
    return <div className={`alert ${type}`}>{children}</div>;
  };
  
  export default Message;
  