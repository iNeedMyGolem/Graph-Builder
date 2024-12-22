import type { NextPage } from 'next'
import Head from 'next/head'

import Flow from '../components/Flow'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.graphContainer}>
        <header className={styles.header}>React Node Graph</header>
        <Flow />
      </div>
    </div>
  )
}

export default Home