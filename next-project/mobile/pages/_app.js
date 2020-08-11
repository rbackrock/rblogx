import React from 'react'
import Head from 'next/head'

import '../style/normalize.css'
import '../style/katex.css'

export default function MyBlog({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>回滚滚的博客</title>
          <meta name="keywords" content="rbackrock, rbackrock`s blog, blog, 博客" />
          <meta content="这是 rbackrock 用来记录生活和学习的博客。" name="description" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
