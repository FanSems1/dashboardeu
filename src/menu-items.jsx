import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined'; 
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined'; 
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'; 
import BusinessIcon from '@mui/icons-material/Business';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import WorkIcon from '@mui/icons-material/Work';
import PoolIcon from '@mui/icons-material/Pool';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PlaceIcon from '@mui/icons-material/Place';
import MapIcon from '@mui/icons-material/Map';
import PublicIcon from '@mui/icons-material/Public';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import RouteIcon from '@mui/icons-material/Route';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ArchiveIcon from '@mui/icons-material/Archive';
import DescriptionIcon from '@mui/icons-material/Description';
import CampaignIcon from '@mui/icons-material/Campaign';
import EditIcon from '@mui/icons-material/Edit';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ImageIcon from '@mui/icons-material/Image';
import StarIcon from '@mui/icons-material/Star';

const icons = {
  NavigationOutlinedIcon,
  HomeOutlinedIcon,
  ChromeReaderModeOutlinedIcon,
  SecurityOutlinedIcon,
  ContactSupportOutlinedIcon,
  GavelOutlinedIcon,
  BusinessOutlinedIcon,
  EngineeringOutlinedIcon,
  LocalShippingOutlinedIcon,
  BusinessIcon,
  DriveEtaIcon,
  WorkIcon,
  PoolIcon,
  AccountBoxIcon,
  LocationOnIcon,
  ApartmentIcon,
  PlaceIcon,
  MapIcon,
  PublicIcon,
  LocationCityIcon,
  RouteIcon,
  AssignmentTurnedInIcon,
  InventoryIcon,
  CategoryIcon,
  PriceChangeIcon,
  ReceiptIcon,
  ListAltIcon,
  ArchiveIcon,
  DescriptionIcon,
  CampaignIcon,
  EditIcon,
  PermIdentityIcon,
  ImageIcon,
  StarIcon
};

export default {
  items: [
    {
      id: 'navigation',
      title: 'Eureka Group',
      caption: 'Dashboard',
      type: 'group',
      icon: icons.NavigationOutlinedIcon,
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: icons.HomeOutlinedIcon,
          url: '/dashboard'
        },
        // KONTAK MENU
        {
          id: 'kontak',
          title: 'Kontak',
          type: 'collapse',
          icon: icons.ContactSupportOutlinedIcon,
          children: [
            {
              id: 'customer',
              title: 'Customer',
              type: 'item',
              icon: icons.ContactSupportOutlinedIcon,
              url: '/kontak/customer'
            },
            {
              id: 'vendor',
              title: 'Vendor',
              type: 'item',
              icon: icons.BusinessOutlinedIcon,
              url: '/kontak/vendor' 
            },
            {
              id: 'employee',
              title: 'Employee',
              type: 'item',
              icon: icons.EngineeringOutlinedIcon,
              url: '/kontak/employee' // Assuming you want to add a URL for navigation
            },
            {
              id: 'supplier',
              title: 'Supplier',
              type: 'item',
              icon: icons.LocalShippingOutlinedIcon,
              url: '/kontak/supplier' // Keeping the original URL for Supplier
            }
          ]
        },
        // MASTER MENU
        {
          id: 'master',
          title: 'MASTER',
          type: 'collapse', // Change from 'group' to 'collapse'
          icon: icons['BusinessIcon'],
          children: [
            {
              id: 'bu',
              title: 'BU',
              type: 'item',
              url: '/master/bu',
              icon: icons['BusinessIcon'],
              breadcrumbs: false
            },
            {
              id: 'vehicle',
              title: 'Vehicle',
              type: 'item', 
              icon: icons['DriveEtaIcon'], 
              url: '/master/vehicle' 
            },
            {
              id: 'pool',
              title: 'Pool',
              type: 'item',
              url: '/master/pool',
              icon: icons['PoolIcon']
            },
            {
              id: 'driver',
              title: 'Driver',
              type: 'item',
              url: '/master/driver',
              icon: icons['DriveEtaIcon']
            },
            {
              id: 'employee-position',
              title: 'Employee Position',
              type: 'item',
              url: '/master/employee-position',
              icon: icons['AccountBoxIcon']
            }
          ]
        },
        // WILAYAH MENU
        {
          id: 'wilayah',
          title: 'Wilayah',
          type: 'collapse', // Change from 'group' to 'collapse'
          icon: icons.PlaceIcon,
          children: [
            {
              id: 'subdistrict',
              title: 'Subdistrict',
              type: 'item',
              url: '/wilayah/subdistrict',
              icon: icons.ApartmentIcon,
            },
            {
              id: 'city',
              title: 'City',
              type: 'item',
              url: '/wilayah/city',
              icon: icons.LocationCityIcon,
            },
            {
              id: 'province',
              title: 'Province',
              type: 'item',
              url: '/wilayah/province',
              icon: icons.MapIcon,
            },
            {
              id: 'country',
              title: 'Country',
              type: 'item',
              url: '/wilayah/country',
              icon: icons.PublicIcon,
            },
          ],
        },
        // LOGISTICS MENU
        {
          id: 'logistics',
          title: 'LOGISTICS',
          type: 'collapse', // Change from 'group' to 'collapse'
          icon: icons.RouteIcon,
          children: [
            {
              id: 'route',
              title: 'Route',
              type: 'item',
              url: '/logistics/route',
              icon: icons.RouteIcon,
            },
          ]
        },
        // SALES MENU
        {
          id: 'sales',
          title: 'SALES',
          type: 'collapse', 
          icon: icons.InventoryIcon,
          children: [
            {
              id: 'product',
              title: 'Product',
              type: 'item',
              url: '/sales/product',
              icon: icons.InventoryIcon,
            },
            {
              id: 'followup',
              title: 'Folow Up',
              type: 'item',
              url: '/sales/follow',
              icon: icons.InventoryIcon,
            },
            {
              id: 'pricelist',
              title: 'Pricelist',
              type: 'item',
              url: '/sales/pricelist',
              icon: icons.PriceChangeIcon,
            },
            {
              id: 'contract-customer',
              title: 'Contract Customer',
              type: 'item',
              url: '/sales/contract-customer',
              icon: icons.ReceiptIcon,
            },
            {
              id: 'vendorPrice',
              title: 'Vendor Price',
              type: 'item',
              url: '/sales/vendorPrice',
              icon: icons.PriceChangeIcon,
            },
          ],
        },
        // ORDER MENU
        {
          id: 'order',
          title: 'ORDER',
          type: 'collapse', 
          icon: icons.ListAltIcon,
          children: [
            {
              id: 'order',
              title: 'Order',
              type: 'item',
              url: '/order',
              icon: icons.ListAltIcon,
              children: []
            },
            {
              id: 'order-status',
              title: 'Order Status',
              type: 'item',
              url: '/order/order-status',
              icon: icons.ArchiveIcon,
              children: []
            },
            {
              id: 'order-invoice',
              title: 'Order Invoice',
              type: 'item',
              url: '/order/order-invoice',
              icon: icons.DescriptionIcon,
              children: []
            },
            {
              id: 'lose',
              title: 'Lose Sales',
              type: 'item',
              url: '/order/lose-sales',
              icon: icons.InventoryIcon
            },
          ],
        },
        // MARKETING MENU
        {
          id: 'marketing',
          title: 'MARKETING',
          type: 'collapse', 
          icon: icons.CampaignIcon,
          children: [
            {
              id: 'StudyCase',
              title: 'Study Case',
              type: 'item',
              url: '/marketing/study-case',
              icon: icons.CampaignIcon
            },
            {
              id: 'blog-post',
              title: 'Blog Post',
              type: 'item',
              icon: icons.EditIcon,
              url: '/marketing/blog-post',
            },
            {
              id: 'Bisnis-Unit-Management',
              title: 'BU Management',
              type: 'item',
              icon: icons['AccountBoxIcon'],
              url: '/marketing/Bisnis-Unit-Management',
            },
            {
              id: 'Bisnis-Unit-Detail',
              title: 'BU Detail',
              type: 'item',
              url: '/marketing/Bisnis-Unit-Detail',
              icon: icons.ImageIcon
            },
            {
              id: 'blog-author',
              title: 'Author',
              type: 'item',
              url: '/marketing/author',
              icon: icons.PermIdentityIcon
            },
            {
              id: 'promo',
              title: 'Promo',
              type: 'item',
              url: '/marketing/promo',
              icon: icons.StarIcon
            },
            {
              id: 'career',
              title: 'Career',
              type: 'item',
              url: '/marketing/karir',
              icon: icons.WorkIcon 
            }
          ]
        }
      ]
    },
  ]
};
