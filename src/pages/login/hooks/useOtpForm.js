import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resendLoginOtp, verifyLoginOtp } from '../../../apis/authApi';
import { routePaths } from '../../../constants/routePaths';
import { otpPageMock } from '../../../data/mocks/login/otpPage.mock';
import {
  clearOtpLoginNotice,
  clearPendingOtpIdentifier,
  getOtpLoginNotice,
  getPendingOtpIdentifier,
  setAuthSession,
  setFirstLoginPasswordStep,
} from '../../../services/authSession';
import {
  buildIdentifierOnlyPayload,
  validateOtp,
} from '../../../utils/loginIdentifier';
import { extractAuthSessionFromResponse } from '../../../utils/authResponse';
import { parseApiError } from '../../../utils/apiError';

const RESEND_COOLDOWN_SECONDS = 30;

export const useOtpForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const verifiedRef = useRef(false);
  const [identifier] = useState(() => getPendingOtpIdentifier());

  const initialNotice =
    location.state?.otpSentMessage
    || getOtpLoginNotice()
    || otpPageMock.otpSentAtLoginMessage;

  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [sendNotice, setSendNotice] = useState(initialNotice);

  useEffect(() => {
    if (verifiedRef.current) return undefined;
    if (!identifier) {
      navigate(routePaths.login, { replace: true });
    }
    return undefined;
  }, [identifier, navigate]);

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const timer = setInterval(() => {
      setCooldown((seconds) => Math.max(0, seconds - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const startCooldown = useCallback(() => {
    setCooldown(RESEND_COOLDOWN_SECONDS);
  }, []);

  const updateOtp = useCallback((value) => {
    const digits = value.replace(/\D/g, '').slice(0, 6);
    setOtp(digits);
    setErrors((prev) => {
      if (!prev.otp && !prev.general) return prev;
      const next = { ...prev };
      delete next.otp;
      delete next.general;
      return next;
    });
  }, []);

  const handleResend = useCallback(async () => {
    if (cooldown > 0 || isResending || !identifier) return;

    setIsResending(true);
    setErrors({});

    try {
      const response = await resendLoginOtp(buildIdentifierOnlyPayload(identifier));

      if (!response?.success) {
        setErrors({ general: response?.message || otpPageMock.resendFailed });
        return;
      }

      setSendNotice(response.message || otpPageMock.resendSuccessMessage);
      startCooldown();
    } catch (error) {
      const { general } = parseApiError(error, 'otp');
      const message = general || otpPageMock.resendFailed;

      if (message.toLowerCase().includes('30 seconds')) {
        setErrors({ general: otpPageMock.resendCooldownMessage });
        startCooldown();
      } else {
        setErrors({ general: message });
      }
    } finally {
      setIsResending(false);
    }
  }, [cooldown, isResending, identifier, startCooldown]);

  const handleVerify = useCallback(
    async (event) => {
      event.preventDefault();
      if (!identifier) return;

      const otpError = validateOtp(otp);
      if (otpError) {
        setErrors({ otp: otpError });
        return;
      }

      setIsVerifying(true);
      setErrors({});

      try {
        const response = await verifyLoginOtp({
          ...buildIdentifierOnlyPayload(identifier),
          otp,
        });

        if (!response?.success) {
          setErrors({
            general: response?.message || otpPageMock.verifyFailed,
          });
          return;
        }

        const session = extractAuthSessionFromResponse(response);

        if (session) {
          setAuthSession(session);
        }

        verifiedRef.current = true;
        setFirstLoginPasswordStep();
        clearOtpLoginNotice();

        navigate(routePaths.firstLoginChangePassword, {
          replace: true,
          state: { fromOtpVerify: true },
        });
      } catch (error) {
        const { general, fieldErrors, status } = parseApiError(error, 'otp');
        const isInvalidOtp =
          status === 401
          && (fieldErrors.otp || general?.toLowerCase().includes('otp'));

        setErrors(
          isInvalidOtp && general && !fieldErrors.otp
            ? { otp: general }
            : {
                ...fieldErrors,
                ...(general && !fieldErrors.otp && !isInvalidOtp ? { general } : {}),
              },
        );
      } finally {
        setIsVerifying(false);
      }
    },
    [identifier, otp, navigate],
  );

  const handleBackToLogin = useCallback(() => {
    clearPendingOtpIdentifier();
    clearOtpLoginNotice();
    navigate(routePaths.login, { replace: true });
  }, [navigate]);

  return {
    identifier,
    otp,
    errors,
    isVerifying,
    isResending,
    cooldown,
    sendNotice,
    updateOtp,
    handleVerify,
    handleResend,
    handleBackToLogin,
  };
};
