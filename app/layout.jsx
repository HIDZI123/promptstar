import "@styles/global.css";
import NavBar from "@components/NavBar";
import Provider from "@components/Provider";

export const metadata = {
  title: "PromptStar",
  description: "Create and Discover AI prompts and much more",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>

          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <NavBar />
            {children}
          </main>
          
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
