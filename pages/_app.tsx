import App from 'next/app'
import React from 'react'

class MyApp extends App<any> {
    render() {
        const { Component, pageProps } = this.props

        return <Component {...pageProps} apolloClient2={'sadsd'} />
    }
}

//export default withApollo(appWithTranslation(MyApp))
export default MyApp
