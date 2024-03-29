import '../../styles/globals.css'
import Page from "@components/layout/Page";

function MyApp({Component, pageProps}) {
    return <Page>
        <Component {...pageProps} />
    </Page>
}

export default MyApp
