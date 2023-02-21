import Head from 'next/head'
import styles from './Layout.module.css'

export default function Page({children}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Data Collection Viewer</title>
                <meta name="description" content="View and search data collection files"/>
            </Head>

            <main className={styles.main}>
                {children}
            </main>

            <footer className={styles.footer}>

            </footer>
        </div>
    )
}
