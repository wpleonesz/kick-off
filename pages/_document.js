import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="kick-off - Sistema de agendamiento de canchas" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
