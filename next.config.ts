module.exports = {
  webpack: (config: { externals: string[] }, isServer: never) => {
    if (isServer) {
      config.externals.push('pptxgenjs')
    }
    return config
  }
}