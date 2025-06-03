import cn from '@/utils/cn';
interface TransactionInfoTypes {
  label: string;
  value?: string | number;
  className?: string;
}

export default function TransactionInfo({
  label,
  value,
  className,
}: TransactionInfoTypes) {
  return (
    <div
      className={cn(
        'flex items-center justify-between text-[#0F172A] dark:text-gray-300',
        className,
      )}
    >
      <span className="text-[14px] font-[400]">{label}</span>
      <span className="text-[14px] font-[400]">{value ? value : '_ _'}</span>
    </div>
  );
}
