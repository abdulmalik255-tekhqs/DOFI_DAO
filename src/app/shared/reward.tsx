import LiveRevenueSlider from '@/components/reward-table/live-revenue-slider';
import RewardDistributionTable from '@/components/reward-table/reward-distribution-table';
import LivePricingSlider from '@/components/ui/live-pricing-slider';


export default function Reward() {
  return (
    <>
    <LiveRevenueSlider limits={4} />
      <RewardDistributionTable />
    </>
  );
}
