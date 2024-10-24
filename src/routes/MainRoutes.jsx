// src/routes/MainRoutes.jsx
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';
import PrivateRoute from './PrivateRoute';
import EmployeePage from 'views/Kontak/Employee';
import CustomerPage from 'views/Kontak/Customer';
import VendorPage from 'views/Kontak/Vendor';
import VehicleCategoryPage from 'views/Master/VehicleCategory';
import OrderPage from 'views/Order/Order';
import OrderStatusPage from 'views/Order/OrderStatus';
import OrderInvoicePage from 'views/Order/OrderInvoice';
import ProfilePage from 'views/Login/Profile';
import CareerPage from 'views/Marketing/Karir';
// import FollowPage from 'views/Sales/Follow';

// Lazy-load untuk komponen halaman
const DashboardDefault = Loadable(lazy(() => import('views/Dashboard/Default')));

// Import semua halaman lainnya seperti yang sudah ada di kode sebelumnya
const CustomerLegalityPage = Loadable(lazy(() => import('views/Kontak/CustomerLegality')));
const VendorLegalityPage = Loadable(lazy(() => import('views/Kontak/VendorLegalityPage')));
const SalesPage = Loadable(lazy(() => import('views/Kontak/SalesPage')));
const SupplierPage = Loadable(lazy(() => import('views/Kontak/SupplierPage')));
const BuPage = Loadable(lazy(() => import('views/Master/Bu')));
const BuBrenchPage = Loadable(lazy(() => import('views/Master/BuBrench')));
const VehiclePage = Loadable(lazy(() => import('views/Master/Vehicle')));
const VehicleLocationPage = Loadable(lazy(() => import('views/Master/VehicleLocation')));
const PoolPage = Loadable(lazy(() => import('views/Master/Pool')));
const DriverPage = Loadable(lazy(() => import('views/Master/Driver')));
const EmployeePositionPage = Loadable(lazy(() => import('views/Master/EmployeePosition')));
const SubdistrictPage = Loadable(lazy(() => import('views/Wilayah/Subdistrict')));
const CityPage = Loadable(lazy(() => import('views/Wilayah/City')));
const ProvincePage = Loadable(lazy(() => import('views/Wilayah/Province')));
const CountryPage = Loadable(lazy(() => import('views/Wilayah/Country')));
const RoutePage = Loadable(lazy(() => import('views/Logistics/Route')));
const NewFollowUpPage = Loadable(lazy(() => import('views/Sales/FollowUpNew')));
const QualifiedFollowUpPage = Loadable(lazy(() => import('views/Sales/FollowUpQualified')));
const PropositionFollowUpPage = Loadable(lazy(() => import('views/Sales/FollowUpProposition')));
const WonFollowUpPage = Loadable(lazy(() => import('views/Sales/FollowUpWon')));
const ProductPage = Loadable(lazy(() => import('views/Sales/Product')));
const ProductVariationPage = Loadable(lazy(() => import('views/Sales/ProductVariation')));
const PricelistPage = Loadable(lazy(() => import('views/Sales/Pricelist')));
const ContractCustomerPage = Loadable(lazy(() => import('views/Sales/ContractCustomer')));
const VendorPricePage = Loadable(lazy(() => import('views/Sales/VendorPrice')));
const OrderDetailPage = Loadable(lazy(() => import('views/Order/OrderDetail')));
const OrderTotalPage = Loadable(lazy(() => import('views/Order/OrderTotal')));
const OrderHistoryPage = Loadable(lazy(() => import('views/Order/OrderHistory')));
const OrderInvoiceDetailPage = Loadable(lazy(() => import('views/Order/OrderInvoiceDetail')));
const LoseSalesPage = Loadable(lazy(() => import('views/Order/LostSales')));
const StudyCasePage = Loadable(lazy(() => import('views/Marketing/StudyCase')));
const BlogPostPage = Loadable(lazy(() => import('views/Marketing/BlogPost')));
const BisnisUnitManagement = Loadable(lazy(() => import('views/Marketing/BisnisUnitManagement')));
const AuthorPage = Loadable(lazy(() => import('views/Marketing/Author')));
const BisnisUnitDetail = Loadable(lazy(() => import('views/Marketing/BisnisUnitDetail')));
const PromoPage = Loadable(lazy(() => import('views/Marketing/Promo')));
const FollowPage = Loadable(lazy(() => import('views/Sales/Follow')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  element: <PrivateRoute><MainLayout /></PrivateRoute>,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },

    { path: '/profile', element: <ProfilePage /> },
    // Routes for KONTAK menu
    { path: '/kontak/customer', element: <CustomerPage /> },
    { path: '/kontak/vendor', element: <VendorPage /> },
    { path: '/kontak/employee', element: <EmployeePage /> },
    { path: '/kontak/customer-legality', element: <CustomerLegalityPage /> },
    { path: '/kontak/vendor-legality', element: <VendorLegalityPage /> },
    { path: '/kontak/employee-sales', element: <SalesPage /> },
    { path: '/kontak/supplier', element: <SupplierPage /> },

    // Routes for MASTER menu
    { path: '/master/bu', element: <BuPage /> },
    { path: '/master/bu-brench', element: <BuBrenchPage /> },
    { path: '/master/vehicle', element: <VehiclePage /> },
    { path: '/master/vehicle-location', element: <VehicleLocationPage /> },
    { path: '/master/vehicle-category', element: <VehicleCategoryPage /> },
    { path: '/master/pool', element: <PoolPage /> },
    { path: '/master/driver', element: <DriverPage /> },
    { path: '/master/employee-position', element: <EmployeePositionPage /> },

    // Routes for WILAYAH menu
    { path: '/wilayah/subdistrict', element: <SubdistrictPage /> },
    { path: '/wilayah/city', element: <CityPage /> },
    { path: '/wilayah/province', element: <ProvincePage /> },
    { path: '/wilayah/country', element: <CountryPage /> },

    // Routes for Logistics menu
    { path: '/logistics/route', element: <RoutePage /> },

    // Routes for SALES menu
    { path: '/sales/follow', element: <FollowPage /> },
    { path: '/sales/followUp/new', element: <NewFollowUpPage /> },
    { path: '/sales/followUp/qualified', element: <QualifiedFollowUpPage /> },
    { path: '/sales/followUp/proposition', element: <PropositionFollowUpPage /> },
    { path: '/sales/followUp/won', element: <WonFollowUpPage /> },
    { path: '/sales/product', element: <ProductPage /> },
    { path: '/sales/product-variation', element: <ProductVariationPage /> },
    { path: '/sales/pricelist', element: <PricelistPage /> },
    { path: '/sales/contract-customer', element: <ContractCustomerPage /> },
    { path: '/sales/vendorPrice', element: <VendorPricePage /> },

    // Routes for ORDER menu
    { path: '/order', element: <OrderPage /> },
    { path: '/order/order-detail/:orderId', element: <OrderDetailPage /> },
    { path: '/order/order-status', element: <OrderStatusPage /> },
    { path: '/order/order-total', element: <OrderTotalPage /> },
    { path: '/order/order-history', element: <OrderHistoryPage /> },
    { path: '/order/order-invoice', element: <OrderInvoicePage /> },
    { path: '/order/order-invoice-detail/:id', element: <OrderInvoiceDetailPage /> },
    { path: '/order/lose-sales', element: <LoseSalesPage /> },
    
    // Routes for MARKETING menu
    { path: '/marketing/study-case', element: <StudyCasePage /> },
    { path: '/marketing/blog-post', element: <BlogPostPage /> },
    { path: '/marketing/Bisnis-Unit-Management', element: <BisnisUnitManagement /> },
    { path: '/marketing/author', element: <AuthorPage /> },
    { path: '/marketing/Bisnis-Unit-Detail', element: <BisnisUnitDetail /> },
    { path: '/marketing/promo', element: <PromoPage /> },
    { path: '/marketing/karir', element: <CareerPage /> },
  ]
};

export default MainRoutes;
