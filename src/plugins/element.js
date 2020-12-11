import Vue from 'vue'
import {
  Button, Form, FormItem, Input, Message, Container, Header, Aside, Main,
  Menu, MenuItem, Submenu, Breadcrumb, BreadcrumbItem, Card, Row, Col,
  Table, TableColumn, Switch, Tooltip, Pagination, Dialog, MessageBox, Tag,
  Tree, Select, Option, Cascader
} from 'element-ui'

Vue.use(Button)
Vue.use(Form).use(FormItem).use(Input)
Vue.use(Container).use(Header).use(Aside).use(Main)
Vue.use(Menu).use(MenuItem).use(Submenu)
Vue.use(Breadcrumb).use(BreadcrumbItem).use(Card).use(Row).use(Col)
Vue.use(Table).use(TableColumn).use(Switch).use(Tooltip).use(Pagination).use(Dialog)
Vue.use(Tag).use(Tree).use(Select).use(Option).use(Cascader)
// 因为是提示，所以我们需要全局挂载，$message这个名字是自定义的
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
