import React from 'react';

const HeaderLogo = ({ link, logoLg, logoSm }) => (
  <a
    className="logo"
    href={link}
  >
    {/* mini logo for sidebar mini 50x50 pixels */}
    <div className="logo-mini">{logoSm}</div>
    {/* logo for regular state and mobile devices */}
    <div className="logo-lg">{logoLg}</div>
  </a>
);

HeaderLogo.propTypes = {
  link: React.PropTypes.string,
  logoLg: React.PropTypes.element,
  logoSm: React.PropTypes.element,
};

HeaderLogo.defaultProps = {
  link: '/',
  logoLg: <span><b>Crypto</b></span>,
  logoSm: <span><b>C</b></span>,
};

export default HeaderLogo;
