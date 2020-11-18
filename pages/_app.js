import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import './css/style.css';
import * as gtag from '../lib/gtag';

Router.events.on('routeChangeComplete', (url) => {
  window.scrollTo(0, 0);
  gtag.pageview(url);
});
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
