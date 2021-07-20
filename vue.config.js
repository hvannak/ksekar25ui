module.exports = {
    css: {
      loaderOptions: {
        sass: {
          prependData: `
            @import "@/assets/styles/_shared.scss";
            @import "@/assets/styles/_global.scss";
          `,
        },
      },
    },
  };