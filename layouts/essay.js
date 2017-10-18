import Head from 'next/head';
import Link from 'next/link';
import slugify from 'slugify';
import format from 'date-fns/format';
import isValid from 'date-fns/is_valid';
import mapProps from 'recompose/mapProps';

import Header from '../components/header.js';
import OpenGraph from '../components/open-graph.js';
import TwitterCard from '../components/twitter-card.js';

import Main from './main.js';

import parser from '../lib/md-parser.js';
import * as colors from '../lib/colors.js';

export default mapProps(({ date, ...props }) => ({
  ...props,
  date: new Date(date),
  dateString: date
}))(({ title, content, date, dateString, slug, description }) => (
  <Main>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="twitter:widgets:theme" content="light" />
      <meta name="twitter:widgets:link-color" content={colors.blue} />
      <meta name="twitter:widgets:border-color" content={colors.blue} />
    </Head>

    <TwitterCard
      title={title}
      url={`https://sergio.now.sh/essays/${slug ||
        slugify(title, { lower: true })}`}
      description={description}
    />

    <OpenGraph
      title={title}
      description={description}
      url={`https://sergio.now.sh/essays/${slug ||
        slugify(title, { lower: true })}`}
    />

    <Link href="/" prefetch>
      <a title="Sergio Xalambrí">
        <Header sticky={false} secondary />
      </a>
    </Link>

    <a href="https://github.com/sergiodxa/personal-site" className="src">
      {'<src />'}
    </a>

    <section className="content">
      {isValid(date) && (
        <time className="publishedAt" dateTime={dateString}>
          Posted on <b>{format(date, 'MMMM DD, YYYY')}</b>
        </time>
      )}
      <article
        dangerouslySetInnerHTML={{
          __html: parser(content)
        }}
      />
    </section>

    <style jsx>{`
      a {
        color: ${colors.black};
        text-decoration: none;
      }

      .src {
        position: absolute;
        top: 0;
        right: 0;
        padding: 1rem;
      }
      .src:hover {
        text-decoration: underline;
      }

      .content {
        font-size: 1.25rem;
        margin: 0 auto 10vh;
        max-width: 36em;
        width: 100%;
      }

      .publishedAt {
        display: block;
        text-align: right;
      }

      .content :global(article) {
        box-sizing: border-box;
        font-weight: normal;
        line-height: 1.4;
        outline: 0;
        padding-left: 1em;
        padding-right: 1em;
        word-break: break-word;
        word-wrap: break-word;
      }
      .content :global(h1),
      .content :global(h2),
      .content :global(h3),
      .content :global(h4),
      .content :global(h5),
      .content :global(h6) {
        font-weight: bold;
        letter-spacing: -0.02em;
        margin: 1em 0 0;
      }

      .content :global(h1) {
        font-size: 2.5em;
        letter-spacing: -0.028em;
        margin: 0;
      }

      .content :global(h2) {
        font-size: 2em;
        border-bottom: 1px solid ${colors.black};
        box-sizing: border-box;
        margin-left: calc(-1em + 2px);
        margin-right: calc(-1em + 2px);
        padding: 0 1em 0.25em;
      }

      .content :global(h3) {
        font-size: 1.75em;
      }

      .content :global(h4) {
        font-size: 1.5em;
      }

      .content :global(h5) {
        font-size: 1.25em;
      }

      .content :global(h6) {
        font-size: 1.125em;
      }

      .content :global(a) {
        color: ${colors.blue};
      }

      .content :global(blockquote) {
        border-left: 3px solid rgba(0, 0, 0, 0.84);
        box-sizing: border-box;
        padding-left: calc(2em - 3px);
        margin-left: -2em;
        margin-right: 0;
        font-weight: 400;
        font-style: italic;
        font-size: 1em;
      }

      .content :global(blockquote > p) {
        margin: 0;
      }

      .content :global(p) {
        margin: 0.5em 0;
        font-size: 1.25em;
      }

      /* inline code */
      .content :global(p code) {
        color: ${colors.pink};
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
          serif;
        font-size: 0.8em;
        white-space: pre-wrap;
      }

      .content :global(p code:before) {
        content: '\`';
      }

      .content :global(p code:after) {
        content: '\`';
      }

      /* code blocks */
      .content :global(pre) {
        border: 1px solid ${colors.black};
        padding: 1rem calc(2rem - 1px);
        margin: 1rem -2rem;
        overflow: scroll;
      }

      .content :global(pre code) {
        color: ${colors.black};
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
          serif;
        font-size: 1rem;
      }

      /* identation sizes */
      .content :global(pre code[class~='language-javascript']),
      .content :global(pre code[class~='language-js']),
      .content :global(pre code[class~='language-html']),
      .content :global(pre code[class~='language-css']),
      .content :global(pre code[class~='language-styl']),
      .content :global(pre code[class~='language-saas']),
      .content :global(pre code[class~='language-less']),
      .content :global(pre code[class~='language-ruby']) {
        tab-size: 2;
      }
      .content :global(pre code[class~='language-java']),
      .content :global(pre code[class~='language-python']),
      .content :global(pre code[class~='language-php']) {
        tab-size: 4;
      }
      .content :global(pre code[class~='language-go']) {
        tab-size: 8;
      }

      /* table */
      .content :global(table) {
        font-size: 0.9rem;
        width: 100%;
      }

      .content :global(th) {
        padding: 5px;
        color: #9b9b9b;
        font-style: oblique;
        font-weight: normal;
        text-align: left;
      }

      .content :global(td) {
        padding: 5px;
      }

      .content :global(mark) {
        background-color: ${colors.pink};
        color: white;
        padding: 0.125em 0.2em;
      }

      /* lists */
      .content :global(ul),
      .content :global(ol) {
        font-size: 1.3em;
        font-weight: normal;
        margin-left: -2rem;
        padding-left: 2rem;
      }

      .content :global(ul) {
        list-style-type: square;
      }

      .content :global(ol) {
        list-style-type: lower-roman;
      }

      .content :global(li) {
        line-height: 1.5;
      }

      .content :global(dt) {
        font-weight: bold;
      }

      /* abbreviatures */
      .content :global(abbr) {
        cursor: help;
        text-decoration-style: dashed;
      }

      /* images */
      .content :global(figure) {
        font-size: 0;
        text-align: center;
        margin: 0;
        width: 100%;
      }

      .content :global(figcaption) {
        color: ${colors.grey};
        font-size: 0.9rem;
      }

      .content :global(img) {
        max-width: 100%;
      }

      /* videos */
      .content :global(.embed-responsive) {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        margin: 0 -2rem;
      }

      .content :global(.embed-responsive-item) {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
      }

      /* tweets */
      .content :global(.twitter-tweet) {
        margin: 0 auto;
        width: 100%;
      }

      .content :global(.twitter-tweet:not(.twitter-tweet-rendered)) {
        display: none;
      }

      /* pink */
      .content :global(.hljs-keyword),
      .content :global(.hljs-selector-tag),
      .content :global(.hljs-literal),
      .content :global(.hljs-strong),
      .content :global(.hljs-attribute),
      .content :global(.hljs-symbol),
      .content :global(.hljs-link) {
        color: ${colors.pink};
      }
      /* red */
      .content :global(.hljs-code),
      .content :global(.hljs-deletion),
      .content :global(.hljs-name) {
        color: ${colors.red};
      }
      /* green */
      .content :global(.hljs-bullet),
      .content :global(.hljs-subst),
      .content :global(.hljs-title),
      .content :global(.hljs-section),
      .content :global(.hljs-emphasis),
      .content :global(.hljs-type),
      .content :global(.hljs-built_in),
      .content :global(.hljs-builtin-name),
      .content :global(.hljs-selector-attr),
      .content :global(.hljs-selector-pseudo),
      .content :global(.hljs-addition),
      .content :global(.hljs-variable),
      .content :global(.hljs-template-tag),
      .content :global(.hljs-template-variable),
      .content :global(.hljs-function),
      .content :global(.hljs-attr) {
        color: ${colors.green};
      }
      /* yellow */
      .content :global(.hljs-string),
      .content :global(.hljs-regexp) {
        color: ${colors.yellow};
      }
      /* blue */
      .content :global(.hljs-attribute) {
        color: ${colors.blue};
      }
      /* grey */
      .content :global(.hljs-comment),
      .content :global(.hljs-quote),
      .content :global(.hljs-meta) {
        color: ${colors.grey};
      }
      /* black */
      .content :global(.hljs-params),
      .content :global(.hljs-tag) {
        color: ${colors.black};
      }
      /* bold */
      .content :global(.hljs-keyword),
      .content :global(.hljs-selector-tag),
      .content :global(.hljs-literal),
      .content :global(.hljs-doctag),
      .content :global(.hljs-title),
      .content :global(.hljs-section),
      .content :global(.hljs-type),
      .content :global(.hljs-selector-id) {
        font-weight: bold;
      }

      @media (max-width: 767px) {
        .publishedAt {
          padding-right: 1em;
        }

        .content :global(h1) {
          font-size: 2em;
          margin-left: -2px;
          line-height: 1.04;
          letter-spacing: -0.028em;
        }

        .content :global(h2) {
          font-size: 1.75em;
          margin-top: 1.75rem;
          box-sizing: border-box;
          padding-left: 0.5em;
          padding-right: 0.5em;
          margin-left: calc(-0.5em + 2px);
          margin-right: calc(-0.5em + 2px);
        }

        .content :global(h3) {
          font-size: 1.5em;
        }

        .content :global(h4) {
          font-size: 1.25em;
        }

        .content :global(h5) {
          font-size: 1.125em;
        }

        .content :global(h6) {
          font-size: 1em;
        }

        .content :global(blockquote) {
          font-size: 1.125rem;
          line-height: 1.58;
          letter-spacing: -0.004em;
          padding-left: 17px;
          margin-left: -20px;
        }

        .content :global(p) {
          font-size: 1.125rem;
          line-height: 1.58;
          letter-spacing: -0.004em;
        }

        .content :global(pre) {
          border-left: none;
          border-right: none;
          padding: 1rem 1.25rem;
          margin: 1rem -1.25rem;
        }

        .content :global(ul),
        .content :global(ol) {
          margin-left: 0;
          padding-left: 2rem;
        }

        .content :global(.embed-responsive) {
          margin: 0 -1.25rem;
        }
      }
    `}</style>
  </Main>
));
