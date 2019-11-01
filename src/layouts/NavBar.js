import React from "react";
import { Select, Menu, Dropdown, Icon} from 'antd';

const { Option } = Select;


const menu = (
    <Menu>
        <Menu.Item>
            <a rel="noopener noreferrer" href="/"><Icon type="home" /> 首 页
            </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href='#' onClick={e => e.preventDefault()}><Icon type="poweroff" /> 退出登录</a>
        </Menu.Item>
    </Menu>
  );
  

class NavBar extends React.Component{

    state = {
        current: 'mail',
    }

    constructor(props){
        super(props);
    }

    handleChange = e => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
    }

    render() {
        return (
            <div className="nav-bar-wrapper clearfix">
                <span className="text">站点:</span>
                <div className="site-menu">
                    <Select defaultValue="jack" style={{ width: 150 }} onChange={this.handleChange}>
                        <Option value="jack">Zaful</Option>
                        <Option value="lucy">Rosegal</Option>
                        <Option value="Yiminghe">Dresslily</Option>
                    </Select>
                </div>
                <div className="fr">
                    <Dropdown overlay={menu} placement="bottomRight">
                        <a className="ant-dropdown-link" href='#' onClick={e => e.preventDefault()}>
                        环球xxx &nbsp;<Icon type="down" />
                        </a>
                    </Dropdown>
                </div>
            </div>
        )
    }
}

export default NavBar;