import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import 'admin-lte/dist/css/AdminLTE.min.css';
import 'admin-lte/dist/css/skins/_all-skins.min.css';
import { Link } from 'react-router'
import { AdminLTE, Header, Sidebar, HeaderLogo } from './components/adminlte';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarCollapse: false,
      sidebarMini: true,
    };
    this._sidebarToggle = this.sidebarToggle.bind(this);
  }

  sidebarToggle() {
    this.setState({
      sidebarCollapse: !this.state.sidebarCollapse,
    });
  }

  render() {
    return (
      <div>
        <AdminLTE
          layout="fixed"
          sidebarCollapsed={this.state.sidebarCollapse}
          sidebarMini={this.state.sidebarMini}
          skin="blue"
          >

          <Header
            sidebarToggle={this._sidebarToggle}
            >
            
          </Header>
          <Sidebar>
            <Sidebar.Menu title="MAIN NAVIGATION">
              <Sidebar.Menu.Item
                link="/"
                title="Tickers"
                />
            </Sidebar.Menu>
          </Sidebar>
          <div className="content-wrapper">

            <section className="content">
              {this.props.children}
            </section>
          </div>


        </AdminLTE>
      </div>
    );
  }
}

export default App;
