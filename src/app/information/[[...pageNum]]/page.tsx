import Information from '@/components/Information/Information';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Information',
  description: 'Information on animes'
};

//NOTE: This forces dynamic rendering (renders for each user request) this is done to avoid stale data
export const dynamic = "force-dynamic";

export default function InformationPage({ params: { pageNum } }: { params: { pageNum: string } }) {
  const page = parseInt(pageNum, 10) || 1;
  return <Information page={page} />
}
