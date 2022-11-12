import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../Components/Layout';

export default function Unauthorize() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <Layout title="Unauthorize-page">
      <h1 className="text-xl">Access Denied</h1>
      {message && <div className="mb-4 text-red-500">{message}</div>}
    </Layout>
  );
}
