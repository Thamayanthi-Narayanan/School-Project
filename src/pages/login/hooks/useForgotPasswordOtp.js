import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { forgotPassword, verifyForgotPasswordOtp } from '../../../apis/authApi';
import { routePaths } from '../../../constants/routePaths';
import { forgotPasswordMock } from '../../../data/mocks/login/forgotPassword.mock';
import {
  clearForgotPasswordNotice,
  getForgotPasswordNotice,
  getPendingResetIdentifier,
  setForgotPasswordNotice,
  setPasswordResetToken,
} from '../../../services/authSession';
import {
  buildIdentifierOnlyPayload,
  validateOtp,
} from '../../../utils/loginIdentifier';
import { extractResetTokenFromResponse } from '../../../utils/authResponse';
import { parseApiError } from '../../../utils/apiError';

const copy = forgotPasswordMock.otp;
const RESEND_COOLDOWN_SECONDS = 30;

export const useForgotPasswordOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const verifiedRef = useRef(false);
  const [identifier] = useState(() => getPendingResetIdentifier());

  const initialNotice =
    location.state?.otpSentMessage
    || getForgotPasswordNotice()
    || copy.subtitle;

  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [notice, setNotice] = useState(initialNotice);

  useEffect(() => {
    if (verifiedRef.current) return undefined;
    if (!identifier) {
      navigate(routePaths.forgotPassword, { replace: true });
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
      const response = await forgotPassword(buildIdentifierOnlyPayload(identifier));

      if (!response?.success) {
        setErrors({ general: response?.message || copy.resendFailed });
        return;
      }

      setNotice(response.message || forgotPasswordMock.request.defaultSuccessMessage);
      setForgotPasswordNotice(response.message);
      startCooldown();
    } catch (error) {
      const { general } = parseApiError(error, 'otp');
      setErrors({ general: general || copy.resendFailed });
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
        const response = await verifyForgotPasswordOtp({
          ...buildIdentifierOnlyPayload(identifier),
          otp,
        });

        if (!response?.success) {
          setErrors({ general: response?.message || copy.verifyFailed });
          return;
        }

        const reset = extractResetTokenFromResponse(response);

        if (!reset?.resetToken) {
          setErrors({ general: response?.message || copy.verifyFailed });
          return;
        }

        verifiedRef.current = true;
        setPasswordResetToken(reset.resetToken);
        clearForgotPasswordNotice();

        navigate(routePaths.resetPassword, {
          replace: true,
          state: { fromForgotPasswordOtp: true },
        });
      } catch (error) {
        const { general, fieldErrors, status } = parseApiError(error, 'otp');
        const isInvalidOtp =
          status === 401
          || (general?.toLowerCase().includes('otp') ?? false);

        setErrors(
          fieldErrors.otp
            ? fieldErrors
            : isInvalidOtp && general
              ? { otp: general }
              : { general: general || copy.verifyFailed },
        );
      } finally {
        setIsVerifying(false);
      }
    },
    [identifier, otp, navigate],
  );

  const handleBack = useCallback(() => {
    navigate(routePaths.forgotPassword, { replace: true });
  }, [navigate]);

  return {
    identifier,
    otp,
    errors,
    isVerifying,
    isResending,
    cooldown,
    notice,
    updateOtp,
    handleVerify,
    handleResend,
    handleBack,
  };
};
