const NotFound = () => import('./views/common/404.vue')
const Login = () => import('./views/common/Login.vue')
const forgetPassword = () => import('./views/common/forgetPassword.vue')
const Dashboard = () => import('./views/dashboard/dashboard.vue')
const Home = () => import('./views/Home.vue')

const CampaignListPage = () => import('./views/marketing-registry/CampaignListPage.vue')
const CampaignAbCasePage = () => import('./views/marketing-registry/CampaignAbCasePage.vue')
const AddCasePage = () => import('./views/marketing-registry/AddCasePage.vue')
const AbTaskPage = () => import('./views/marketing-registry/AbTaskPage.vue')
const abCaseDetails = () => import('./views/marketing-registry/abCaseDetails.vue')

const ModelExperimentsPage = () => import('./views/model-tracking/ModelExperimentsPage.vue')
const ModelTrackingPage = () => import('./views/model-tracking/ModelTrackingPage.vue')

const RegisteredModelsPage = () => import('./views/model-deploy/RegisteredModelsPage.vue')
const ModelVersionPage = () => import('./views/model-deploy/ModelVersionPage.vue')
const ModelVersionView = () => import('./views/model-deploy/ModelVersionView.vue')


let routes = [
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true,
    projectHidden: true
  },
  {
    path: '/forgetPassword',
    component: forgetPassword,
    name: '',
    hidden: true,
    projectHidden: true
  },
  {
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true,
    projectHidden: true
  },
    {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-data-line',
    projectHidden: true,
    leaf: true,
    children: [
        { path: '/dashboard', 
         component: Dashboard, 
         iconCls: 'fa fa-database',
         name: '基础看板' 
        }
    ]
    },
    {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'fa fa-cart-plus',
    projectHidden: true,
    leaf: true,
    children: [
        { path: '/campaigns', 
         component: CampaignListPage, 
         iconCls: 'fa fa-cart-plus',
         name: '营销集市' 
        },
        { path: '/campaigns/campaign=:campaign_id', 
         component: CampaignAbCasePage, 
         name: '活动管理' 
        },
        { path: '/campaigns/campaign=:campaign_id/addcase=:ab_id', 
         component: AddCasePage, 
         iconCls: 'fa fa-database',
         name: '创建实验服务' },
        { path: '/campaigns/campaign=:campaign_id/abexp=:ab_id', 
         component: AbTaskPage, 
         iconCls: 'fa fa-database',
         name: '实验组信息' },
        { path: '/campaigns/campaign=:campaign_id/abdetails=:ab_id', 
         component: abCaseDetails, 
         iconCls: 'fa fa-database', 
         name: '实验详情' },
    ]
    },
    {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'fa el-icon-ship',
    projectHidden: true,
    leaf: true,
    children: [
        { path: '/experiments', 
         component: ModelExperimentsPage,
         iconCls: 'fa el-icon-ship', 
         name: '模型实验' },
        { path: '/experiments/experiment=:experiment_id', 
         component: ModelTrackingPage, 
         name: '模型实验跟踪' }
    ]
    },
    {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'fa el-icon-share',
    projectHidden: true,
    leaf: true,
    children: [
        { path: '/models', 
         component: RegisteredModelsPage,
         iconCls: 'fa fa-cart-plus', 
         name: '模型中心' },
        { path: '/models/model=:model_name', 
         component: ModelVersionPage, 
         name: '模型版本管理' },
        { path: '/models/model=:model_name/version=:version_id', 
         component: ModelVersionView, 
         name: '模型版本详情' }
    ]
    },
    
]

export default routes
