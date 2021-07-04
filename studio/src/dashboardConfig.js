export default {
  widgets: [
    { name: "structure-menu" },
    {
      name: "project-info",
      options: {
        __experimental_before: [
          {
            name: "netlify",
            options: {
              description:
                "NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.",
              sites: [
                {
                  buildHookId: "60df9ccc0d8a13913c69ae10",
                  title: "Sanity Studio",
                  name: "webstackbuilders-com-studio",
                  apiId: "10e24f13-ff8f-4ac8-b8c2-48093abe41d2",
                },
                {
                  buildHookId: "60df9cccae1c69a347225bd5",
                  title: "Blog Website",
                  name: "webstackbuilders-com",
                  apiId: "39e0ee79-81bc-4e1d-acd1-fe827526f980",
                },
              ],
            },
          },
        ],
        data: [
          {
            title: "GitHub repo",
            value: "https://github.com/webstackdev/webstackbuilders.com",
            category: "Code",
          },
          {
            title: "Frontend",
            value: "https://webstackbuilders-com.netlify.app",
            category: "apps",
          },
        ],
      },
    },
    { name: "project-users", layout: { height: "auto" } },
    {
      name: "document-list",
      options: {
        title: "Recent blog posts",
        order: "_createdAt desc",
        types: ["post"],
      },
      layout: { width: "medium" },
    },
  ],
};
