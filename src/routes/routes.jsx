import React from 'react';

import { GeneralPageContainer } from '../containers/GeneralPageContainer';
import { AuthPageContainer } from '../containers/AuthPageContainer';
import { LandingPageContainer } from '../containers/LandingPageContainer';

import { Homepage } from '../components/Home';
import { PatientData } from '../components/PatientAdmission';
import { CronForm } from '../components/CronForms';
import { NearByHospitals } from '../components/NearByHospitals';
import { AddStaff } from '../components/AddStaff';
import { AddHospital } from '../components/AddHospital';
import { Discharge } from '../components/DischargePatients';
import { ReportStaff } from '../components/ReportStaff';
import { RisksAndSuggestions } from '../components/RisksFactors';

export const publicRoutes = [
  {
    url: '/auth',
    component: <AuthPageContainer />,
    name: 'AuthPageContainer'
  },
  {
    url: '/',
    component: <LandingPageContainer />,
    name: 'LandingPageContainer'
  }
];

export const privateRoutes = [
  {
    url: '/home',
    component: <GeneralPageContainer child={<Homepage />} name="Dashboard" />,
    name: 'HomePageContainer',
    label: 'home'
  },
  {
    url: '/add-patient',
    component: <GeneralPageContainer child={<PatientData />} name="PatientDataPage" />,
    name: 'PatientDataPageContainer',
    label: 'add-patient'
  },
  {
    url: '/add-measurement/:id',
    component: <GeneralPageContainer child={<CronForm />} name="CronFormPage" />,
    name: 'CronFormPageContainer',
    label: 'add-measurement'
  },
  {
    url: '/patient-history/:id',
    component: <GeneralPageContainer child={<RisksAndSuggestions />} name="PatientHistoryPage" />,
    name: 'PatientHistoryPageContainer',
    label: 'patient-history'
  },
  {
    url: '/nearbyhospital/:id',
    component: <GeneralPageContainer child={<NearByHospitals />} name="NearByHospitalPage" />,
    name: 'NearByHospitalPageContainer',
    label: 'near-by-hospital'
  },
  {
    url: '/add-staff',
    component: <GeneralPageContainer child={<AddStaff />} name="AddStaffPage" />,
    name: 'AddStaffContainer',
    label: 'add-staff'
  },
  {
    url: '/update-details',
    component: <GeneralPageContainer child={<AddHospital />} name="AddHospitalPage" />,
    name: 'AddHospitalContainer',
    label: 'update-details'
  },
  {
    url: '/discharge-patient',
    component: <GeneralPageContainer child={<Discharge />} name="DischargePage" />,
    name: 'DischargeContainer',
    label: 'discharge-patient'
  },
  {
    url: '/report-staff',
    component: <GeneralPageContainer child={<ReportStaff />} name="ReportStaffContainer" />,
    name: 'ReportStaffContainer',
    label: 'Staff On Duty'
  }
];
