import Vue from "vue"
// 引入样式
import 'vant/lib/index.css';
// 引入响应vant组件
import {
    Sticky,
    Button,
    Tab,
    Tabs,
    Tabbar, 
    TabbarItem,
    Icon,
    Swipe, 
    SwipeItem,
    Lazyload,
    NavBar,
    Search,
    Cell, 
    CellGroup,
    ShareSheet,//分享 
    Col, 
    Row,
    Sidebar, 
    SidebarItem,
    Grid, 
    GridItem,
    PullRefresh,
    Popup,
    List,
    Card,
    Empty,
    Tag,
    Image as VanImage     
} from 'vant'
Vue.use(Sticky);
Vue.use(Button);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload)// 图片懒加载
Vue.use(NavBar);
Vue.use(Search);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(ShareSheet);
Vue.use(Col);
Vue.use(Row);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(PullRefresh);
Vue.use(Popup);
Vue.use(List);
Vue.use(Card);
Vue.use(Empty)
Vue.use(Tag)
Vue.use(VanImage)