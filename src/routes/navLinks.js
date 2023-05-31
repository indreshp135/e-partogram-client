import {
  IconEditCircle,
  IconHome,
  IconPlus,
  IconReportAnalytics,
  IconStethoscope
} from '@tabler/icons';

export const navLinks = [
  {
    link: '/home', label: 'home', icon: IconHome, name: 'Dashboard'
  },
  {
    link: '/add-patient', label: 'add-patient', icon: IconStethoscope, name: 'Add Patient'
  },
  {
    link: '/add-staff', label: 'add-staff', icon: IconPlus, name: 'Add Staff'
  },
  {
    link: '/update-details', label: 'update-details', icon: IconEditCircle, name: 'Update Details'
  },
  {
    link: '/report-staff', label: 'Staff On Duty', icon: IconReportAnalytics, name: 'Staff On Duty'
  }
];
