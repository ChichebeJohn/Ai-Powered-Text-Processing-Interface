export const metadata = {
  title: "AI-Powered Text Processing Interface",
  description: "An AI-powered tool for text processing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Translation API Origin Trial Token */}
        <meta
          httpEquiv="origin-trial"
          content="Aoeg49e8gXziww8aMaciOT3ocfAg14TCdd6srBr0/ENCVaog72otR4Or4Qjz9qByZNGl2mbK/pxvft9j0jf8sw0AAABReyJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJmZWF0dXJlIjoiVHJhbnNsYXRpb25BUEkiLCJleHBpcnkiOjE3NTMxNDI0MDB9"
        />

        {/* Summarization API Origin Trial Token */}
        <meta
          httpEquiv="origin-trial"
          content="ApywZEcawPu3bp6OLLTdoGZKtPjN5sKcNOYQ7FrAJbcOp/vfx7SNIZu8Zxj9gqcIPXzkGd5/KiS1HpvUvKee5gwAAABVeyJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJmZWF0dXJlIjoiQUlTdW1tYXJpemF0aW9uQVBJIiwiZXhwaXJ5IjoxNzUzMTQyNDAwfQ=="
        />

        {/* Language Detection API token removed because we now use DetectLanguage.com */}
      </head>
      <body>{children}</body>
    </html>
  );
}
