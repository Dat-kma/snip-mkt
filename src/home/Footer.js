import React, {Component} from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="vnt-footer__bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-6"><span className="vnt-footer__bottom__text">Bản quyền © 2018 Vntrip.vn</span></div>
                        <div className="col-6"><div className="social-footer"><a  className="social-footer__fb"><i className="fab fa-facebook-square" />Facebook</a><a className="social-footer__google"><i className="fab fa-google-plus-square" />Google</a><a  className="social-footer__google"><i className="fab fa-twitter-square" />Twitter</a></div></div>
                    </div>

                </div>
            </div>

        );
    }
}

export default Footer;