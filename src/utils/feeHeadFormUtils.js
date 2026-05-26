export const YES = 'Yes';

export const toBoolean = (value) => value === YES;

export const toYesNo = (value) => (value ? YES : 'No');

export const initialFeeHeadForm = {
  feeHeadCode: '',
  feeHeadName: '',
  description: '',
  mandatory: 'No',
  active: YES,
  displayOrder: '',
};

export const feeHeadFromApiToForm = (head) => ({
  feeHeadCode: head?.feeHeadCode ?? '',
  feeHeadName: head?.feeHeadName ?? head?.name ?? '',
  description: head?.description ?? '',
  mandatory: toYesNo(head?.mandatory),
  active: head?.active === false ? 'No' : YES,
  displayOrder: head?.displayOrder != null ? String(head.displayOrder) : '',
});

export const validateFeeHeadFormFields = (form, validationCopy, { requireCore = true } = {}) => {
  const errors = {};
  const code = form.feeHeadCode.trim().toUpperCase();
  const name = form.feeHeadName.trim();
  const order = form.displayOrder.trim();

  if (requireCore || code) {
    if (!code && requireCore) {
      errors.feeHeadCode = validationCopy.codeRequired;
    } else if (code.length > 30) {
      errors.feeHeadCode = validationCopy.codeMax;
    } else if (code && !/^[A-Z0-9_]+$/.test(code)) {
      errors.feeHeadCode = validationCopy.codePattern;
    }
  }

  if (requireCore || name) {
    if (!name && requireCore) {
      errors.feeHeadName = validationCopy.nameRequired;
    } else if (name.length > 100) {
      errors.feeHeadName = validationCopy.nameMax;
    }
  }

  if (order && !/^-?\d+$/.test(order)) {
    errors.displayOrder = validationCopy.displayOrderInt;
  }

  return errors;
};

export const buildCreateFeeHeadPayload = (form) => {
  const trimmedOrder = form.displayOrder.trim();
  return {
    feeHeadCode: form.feeHeadCode.trim().toUpperCase(),
    feeHeadName: form.feeHeadName.trim(),
    ...(form.description.trim() ? { description: form.description.trim() } : {}),
    mandatory: toBoolean(form.mandatory),
    refundable: false,
    active: toBoolean(form.active),
    ...(trimmedOrder ? { displayOrder: Number.parseInt(trimmedOrder, 10) } : {}),
  };
};

export const buildUpdateFeeHeadPayload = (form, original) => {
  const payload = {};
  const code = form.feeHeadCode.trim().toUpperCase();
  const name = form.feeHeadName.trim();
  const description = form.description.trim();
  const order = form.displayOrder.trim();
  const originalOrder = original?.displayOrder != null ? String(original.displayOrder) : '';

  if (code && code !== (original?.feeHeadCode ?? '')) payload.feeHeadCode = code;
  if (name && name !== (original?.feeHeadName ?? original?.name ?? '')) payload.feeHeadName = name;

  if (description !== (original?.description ?? '')) {
    payload.description = description;
  }

  if (toBoolean(form.mandatory) !== Boolean(original?.mandatory)) {
    payload.mandatory = toBoolean(form.mandatory);
  }

  if (toBoolean(form.active) !== (original?.active !== false)) {
    payload.active = toBoolean(form.active);
  }

  if (order !== originalOrder) {
    payload.displayOrder = order ? Number.parseInt(order, 10) : null;
  }

  return payload;
};
