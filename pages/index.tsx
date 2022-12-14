import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useCompany } from 'src/hooks/company';
import di from 'server/container';
import { useIdentity } from 'src/hooks/identity';

const Home: NextPage = (props) => {
  const { data, error } = useCompany();
  const identity = useIdentity();
  const loading = !data && !error;
  console.log('data', data)
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold underline text-red-500">
          Hello world!
        </h1>
        <div>{props.data && props.data.map((i) => <p key={i.id}>{i.companyName}</p>)}</div>
        <div>
          {loading ? <p>LOADING !!!</p> : <p>loaded. you are welcome</p>}
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  return di('CompanyController').run(req, res);
}

export default Home;
