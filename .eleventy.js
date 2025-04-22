

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/images/");
  eleventyConfig.addPassthroughCopy("src/script.js");

  eleventyConfig.addCollection("games", function (collectionApi) {
    return collectionApi.getFilteredByTag("game");
  });
  
  eleventyConfig.addCollection("featured", function (collectionApi) {
    return collectionApi.getFilteredByTag("featured");
  });
  


  return {
    dir: {
      input: "src",
      output: "public"
    },
    templateFormats: ["njk", "html", "md"]
  };
};
