export const invoicesPageMock = {
  title: 'Invoices',
  subtitle: 'Auto-calculated invoices with scholarship deductions.',
  actions: {
    printLabel: 'Print',
    downloadPdfLabel: 'Download PDF',
    newInvoiceLabel: 'New Invoice',
  },
  invoice: {
    tableColumns: ['DESCRIPTION', 'AMOUNT'],
    school: {
      name: 'Greenfield International School',
      address: '12, Park Avenue, Bengaluru 560001',
      gstin: 'GSTIN: 29ABCDE1234F1Z5',
      email: 'accounts@greenfield.edu.in',
    },
    meta: {
      label: 'INVOICE',
      number: '#INV-2026-1043',
      issued: 'Issued: 18 May 2026',
      due: 'Due: 01 Jun 2026',
    },
    billedTo: {
      label: 'BILLED TO',
      name: 'Mr. Rajesh Sharma',
      detail: 'Parent of Aarav Sharma · Class 10-A',
      phone: '+91 98765 43210',
    },
    academicYear: {
      label: 'ACADEMIC YEAR',
      year: '2025 – 2026',
      quarter: 'Quarter 1 · Apr — Jun',
    },
    lineItems: [
      { id: 'tuition', description: 'Tuition Fee — Q1', amount: '₹12,000' },
      { id: 'development', description: 'Development Fee', amount: '₹3,000' },
      { id: 'lab', description: 'Lab Fee', amount: '₹1,500' },
      { id: 'transport', description: 'Transport Fee', amount: '₹4,500' },
    ],
    summary: [
      { id: 'subtotal', label: 'Subtotal', amount: '₹21,000', type: 'default' },
      { id: 'scholarship', label: 'Scholarship (10% Merit)', amount: '- ₹2,100', type: 'deduction' },
      { id: 'total', label: 'Total payable', amount: '₹18,900', type: 'total' },
    ],
    footerNote: 'Thank you for being part of Greenfield. Payments are non-refundable after 15 days from issue.',
  },
};
