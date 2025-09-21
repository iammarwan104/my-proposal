import { Suspense } from 'react';
import ProposalPage from './ProposalPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProposalPage />
    </Suspense>
  );
}