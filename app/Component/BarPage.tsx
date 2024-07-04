// pages/index.tsx

"use client";

import type { NextPage } from 'next';
import Head from 'next/head';
import InterestsBarGraph from '@/components/InterestsBarGraph';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Interest Selection Percentage</title>
        <meta name="description" content="A bar graph showing the percentage of interest selection" />
      </Head>
      <main>
        <h1>Interest Selection Percentage</h1>
        <InterestsBarGraph />
      </main>
    </div>
  );
};

export default Home;
