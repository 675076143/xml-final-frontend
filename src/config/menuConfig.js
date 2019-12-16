/*
* 菜单栏配置选项
* 根据此配置动态生成左侧菜单栏
* 使用map(menuConfig)
* 存在两种情况：
*   1.无子节点(<Menu.Item/>)
*   2.有子节点(<SubMenu><Menu.Item/></SubMenu>)
* 例：
* <Menu.Item key="/admin/home">
        <Link to='/admin/home'>
            <Icon type="pie-chart" />
            <span>首页</span>
        </Link>
   </Menu.Item>
*  <SubMenu
        key="sub1"
        title={
            <span>
                <Icon type="mail" />
                <span>图表</span>
            </span>
        }
    >
        <Menu.Item key="5">
            <Link to='/admin/home'>
                <Icon type="pie-chart" />
                <span>饼图</span>
            </Link>
        </Menu.Item>
    </SubMenu>
* */

const menuConfig = [
    {
        key:'/user',
        icon:'ios-contact',
        title:'用户管理',
    },
    {
        key:'/student',
        icon:'ios-document',
        title:'学生管理'
    },
    {
        key:'/score',
        icon:'ios-paper',
        title:'成绩管理'

    }
]

export default menuConfig
