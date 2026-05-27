import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routePaths } from '../constants/routePaths';
import LoginPage from '../pages/login/js/loginPage';
import OtpPage from '../pages/login/js/otpPage';
import FirstLoginChangePasswordPage from '../pages/login/js/firstLoginChangePasswordPage';
import ForgotPasswordPage from '../pages/login/js/forgotPasswordPage';
import ForgotPasswordOtpPage from '../pages/login/js/forgotPasswordOtpPage';
import ResetPasswordPage from '../pages/login/js/resetPasswordPage';
import DashboardLayout from '../layouts/dashboardLayout/js/dashboardLayout';
import DashboardPage from '../pages/dashboard/js/dashboardPage';
import StudentsPage from '../pages/students/js/studentsPage';
import StaffPage from '../pages/staff/js/staffPage';
import AdmissionPage from '../pages/admission/js/admissionPage';
import AttendancePage from '../pages/attendance/js/attendancePage';
import ScholarshipsPage from '../pages/scholarships/js/scholarshipsPage';
import ScholarshipRequestsPage from '../pages/scholarshipRequests/js/scholarshipRequestsPage';
import InvoicesPage from '../pages/invoices/js/invoicesPage';
import PaymentsPage from '../pages/payments/js/paymentsPage';
import SettingsPage from '../pages/settings/js/settingsPage';
import NotificationsPage from '../pages/notifications/js/notificationsPage';
import TransferCertificatePage from '../pages/transferCertificate/js/transferCertificatePage';
import FeeHeadPage from '../pages/feeStructure/js/feeHeadPage';
import FeeStructureConfigPage from '../pages/feeStructureConfig/js/feeStructureConfigPage';
import ReportsPage from '../pages/reports/js/reportsPage';
import UserCreationPage from '../pages/userCreation/js/userCreationPage';
import BulkUploadPage from '../pages/bulkUpload/js/bulkUploadPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routePaths.root} element={<Navigate to={routePaths.login} replace />} />
        <Route path={routePaths.login} element={<LoginPage />} />
        <Route path={routePaths.loginOtp} element={<OtpPage />} />
        <Route
          path={routePaths.firstLoginChangePassword}
          element={<FirstLoginChangePasswordPage />}
        />
        <Route path={routePaths.forgotPassword} element={<ForgotPasswordPage />} />
        <Route path={routePaths.forgotPasswordOtp} element={<ForgotPasswordOtpPage />} />
        <Route path={routePaths.resetPassword} element={<ResetPasswordPage />} />
        <Route element={<DashboardLayout />}>
          <Route path={routePaths.dashboard} element={<DashboardPage />} />
          <Route path={routePaths.students} element={<StudentsPage />} />
          <Route path={routePaths.staff} element={<StaffPage />} />
          <Route path={routePaths.admission} element={<AdmissionPage />} />
          <Route path={routePaths.attendance} element={<AttendancePage />} />
          <Route path={routePaths.scholarships} element={<ScholarshipsPage />} />
          <Route path={routePaths.scholarshipRequests} element={<ScholarshipRequestsPage />} />
          <Route path={routePaths.invoices} element={<InvoicesPage />} />
          <Route path={routePaths.payments} element={<PaymentsPage />} />
          <Route path={routePaths.settings} element={<SettingsPage />} />
          <Route path={routePaths.notifications} element={<NotificationsPage />} />
          <Route path={routePaths.transferCertificate} element={<TransferCertificatePage />} />
          <Route path={routePaths.feeHead} element={<FeeHeadPage />} />
          <Route path={routePaths.feeStructure} element={<FeeStructureConfigPage />} />
          <Route path={routePaths.reports} element={<ReportsPage />} />
          <Route path={routePaths.userCreation} element={<UserCreationPage />} />
          <Route path={routePaths.bulkUpload} element={<BulkUploadPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
