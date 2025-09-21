import { Suspense } from 'react';
import ProposalPage from './ProposalPage';

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
          <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
      <ProposalPage />
    </Suspense>
  );
}