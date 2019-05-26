import sdk from "../sdk.js";
import { connect } from "react-redux";
import actions from "../Actions/index.js";

let Sidebar = ({session, currentChat}) => {
  let [title, setTitle] = useState("");
  useEffect(() => {
    sdk.auth
      .getChat(session, currentChat)
      .then(res => setTitle(res.data.title))
      .catch(err => console.log(err));
  });
  return <div className="header">{title}</div>;
};

export default connect(
  ({user: {session}, chats: {currentChat}})=>({session, currentChat}),
  actions
)(Sidebar);
