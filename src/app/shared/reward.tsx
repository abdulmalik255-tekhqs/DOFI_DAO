import LiveRevenueSlider from '@/components/reward-table/live-revenue-slider';
import RewardDistributionTable from '@/components/reward-table/reward-distribution-table';

export default function Reward() {
  return (
    <>
      <LiveRevenueSlider limits={4} />
      <RewardDistributionTable />
    </>
  );
}
