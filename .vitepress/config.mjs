import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "QRL Zond Testnet",
  description:
    "Public testing of the next evolution of post-quantum secure distributed ledger technology",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Installation", link: "/install" },
      { text: "Testing", link: "/testing" },
      { text: "Reporting", link: "/reporting" },
    ],

    sidebar: [
      {
        text: "Installation",
        items: [
          { text: "Windows", link: "/windows" },
          { text: "Linux", link: "/linux" },
          { text: "Mac", link: "/mac" },
        ],
      },
      {
        text: "Testing",
        items: [
          { text: "Running", link: "/running" },
          { text: "Getting synced", link: "/syncing" },
          { text: "Creating a wallet", link: "/creating-wallet" },
          { text: "Making a transaction", link: "/transaction" },
        ],
      },
      {
        text: "Reporting",
        items: [
          { text: "Error report", link: "/error"},
          { text: "Bug report", link: "/bug" },
          { text: "Feature request", link: "/feature" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/theqrl/test-zond" },
    ],
  },
});
