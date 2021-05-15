const path = require('path')
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Soliloquy ひとりごと`,
    author: {
      name: `Reika Nakayama`,
      summary: `Soliloquy ひとりごと`,
    },
    description: `Soliloquy ひとりごと`,
    siteUrl: `https://soliloquy.com`,
    social: {
      twitter: `soliloquy`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'MicrocmsPosts',
        imagePath: 'featuredImage.url',
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'MicrocmsProfile',
        imagePath: 'icon.url',
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Soliloquy ひとりごと`,
        short_name: `Soliloquy`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-source-microcms',
      options: {
        apiKey: process.env.API_KEY,
        serviceId: process.env.SERVICE_ID,
        apis: [
          {
            endpoint: 'posts',
          },
          {
            endpoint: 'metadata',
            format: 'object',
          },
          {
            endpoint: 'profile',
            format: 'object',
          }
        ],
      },
    },
  ],
}
