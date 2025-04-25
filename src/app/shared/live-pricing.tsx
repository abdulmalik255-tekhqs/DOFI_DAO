import CryptocurrencyPricingTable from '@/components/cryptocurrency-pricing-table/cryptocurrency-pricing-table';
import DomainDaoSlider from '@/components/ui/live-domain-doa-slider';
import LivePricingSlider from '@/components/ui/live-pricing-slider';

export default function LiveDemo() {
  return (
    <>
      <LivePricingSlider limits={4} />
      <DomainDaoSlider limits={8} />
      <CryptocurrencyPricingTable />
    </>
  );
}
