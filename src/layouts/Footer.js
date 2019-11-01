import React from "react";



class Footer extends React.Component{
    constructor(props){
        super(props);
    }

    render(h) {
        return (
            <div className="footer-wrapper">
                <iframe src="http://www.gamiss.com/eload_admin/it.php" width="100%" height="70" scrolling="no" frameBorder="0" className="iframe"></iframe>
            </div>
        )
    }
}

export default Footer;


