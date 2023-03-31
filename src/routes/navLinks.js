import {
  IconEditCircle,
  IconHome,
  IconPlus,
  IconRecharging,
  IconReportAnalytics,
  IconStethoscope
} from '@tabler/icons';

export const navLinks = [
  { link: '/home', label: 'home', icon: IconHome },
  { link: '/add-patient', label: 'add-patient', icon: IconStethoscope },
  { link: '/add-staff', label: 'add-staff', icon: IconPlus },
  { link: '/update-details', label: 'update-details', icon: IconEditCircle },
  { link: '/discharge-patient', label: 'discharge-patient', icon: IconRecharging },
  { link: '/report-staff', label: 'Staff On Duty', icon: IconReportAnalytics }
];
