import { InvoiceData } from '@/app/store/features/invoices/invoicesSlice';
import React from 'react';
import QRCode from 'react-qr-code';

interface LoadDataQRProps {
  data: InvoiceData;
  size?: number;
}

const LoadDataQR: React.FC<LoadDataQRProps> = ({ data, size = 128 }) => {
  
  const qrValue = React.useMemo(() => {
    try {
      return JSON.stringify({
        invN: data.invoiceNumber,
        date: data.date,
        items: data.items,
        total: data.items.reduce((sum, i) => sum + (i.quantity * i.price), 0),
        // We exclude the signature (base64) here because it's too large for a QR code
        from: data.fromCompany,
        to: data.toCompany
      });
    } catch (e) {
      return "Error encoding data";
    }
  }, [data]);

  return (
    <div className="flex flex-col items-end gap-2 p-2 ">
      <QRCode
        size={size}
        value={qrValue}
        viewBox={`0 0 128 128`}
      />
      <span className="text-[10px] font-mono text-gray-400 uppercase">Scan to Import Data</span>
    </div>
  );
};

export default LoadDataQR;