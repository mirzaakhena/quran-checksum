import { useState } from 'react';
import { Button } from './Button';
import { downloadQuranWorkbook } from '../../export/quranWorkbook';

interface DownloadExcelButtonProps {
  className?: string;
}

export function DownloadExcelButton({ className = '' }: DownloadExcelButtonProps) {
  const [status, setStatus] = useState<'idle' | 'preparing' | 'error'>('idle');

  const handleClick = async () => {
    setStatus('preparing');
    try {
      await downloadQuranWorkbook();
      setStatus('idle');
    } catch (error) {
      console.error('Failed to build the Excel file', error);
      setStatus('error');
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleClick}
      disabled={status === 'preparing'}
      className={className}
    >
      {status === 'preparing' && 'Preparing Excel…'}
      {status === 'idle' && '⬇ Download Excel'}
      {status === 'error' && 'Download failed, try again'}
    </Button>
  );
}
