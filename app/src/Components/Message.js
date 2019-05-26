export default ({msg, type}) => {
    let inp = msg;
    return <div>
        {{
            notif: <div className="info">
                {inp}
            </div>,
            
            incoming: <div className="message incoming">
                {inp}
            </div>,

            output: <div className="message outgoing">
                {inp}
            </div>,
        }[type]}
    </div>;
}