// layout.js

export const metadata = {
  title: "AI-Powered Text Processing Interface",
  description: "An AI-powered tool for text processing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Enable responsive behavior */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Language Detection Api */}
        <meta
          httpEquiv="origin-trial"
          content="AllK0eI/A0ZIImoLHMRJ5CA0Fhy8WUF/ZnHNnCpD7DDRLiRiLSFUgV8Ti1ARWRZH0kQ3SYoXGxDFkarO2dms0gcAAACReyJvcmlnaW4iOiJodHRwczovL2FpLXBvd2VyZWQtdGV4dC1wcm9jZXNzaW5nLWludGVyZmFjZS5uZXRsaWZ5LmFwcDo0NDMiLCJmZWF0dXJlIjoiTGFuZ3VhZ2VEZXRlY3Rpb25BUEkiLCJleHBpcnkiOjE3NDk1OTk5OTksImlzU3ViZG9tYWluIjp0cnVlfQ=="
        />

        {/* Translation Api token */}
        <meta
          httpEquiv="origin-trial"
          content="AmZY8t8sSd7YHjMehgoNsrHmLO0w5/AiM2JyZXmb8ODt8Cux70b4nUI9SpjX5uaMYhp4tpEkTFv/KjFRDiyGgwYAAACLeyJvcmlnaW4iOiJodHRwczovL2FpLXBvd2VyZWQtdGV4dC1wcm9jZXNzaW5nLWludGVyZmFjZS5uZXRsaWZ5LmFwcDo0NDMiLCJmZWF0dXJlIjoiVHJhbnNsYXRpb25BUEkiLCJleHBpcnkiOjE3NTMxNDI0MDAsImlzU3ViZG9tYWluIjp0cnVlfQ=="
        />

       
        {/* Language Detection API  */}
        <meta 
        httpEquiv="origin-trial"
        content="ApQT2Xy0vczlyMwYwy2iC47u5wFDjOXF42FNNRufXkPKgZsx4BWo0D2wXPWN3oGxqY7ySyEEB9wV96hWKuqWjQcAAACPeyJvcmlnaW4iOiJodHRwczovL2FpLXBvd2VyZWQtdGV4dC1wcm9jZXNzaW5nLWludGVyZmFjZS5uZXRsaWZ5LmFwcDo0NDMiLCJmZWF0dXJlIjoiQUlTdW1tYXJpemF0aW9uQVBJIiwiZXhwaXJ5IjoxNzUzMTQyNDAwLCJpc1N1YmRvbWFpbiI6dHJ1ZX0="
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
