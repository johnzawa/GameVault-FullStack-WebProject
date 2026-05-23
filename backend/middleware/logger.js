const postLogger = (req, res, next) => {
  if (req.method === 'POST') {
    // Intercept res.json to detect success
    const originalJson = res.json.bind(res)
    res.json = function (body) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const userId = req.session?.userId || 'unauthenticated'
        console.log(`[POST LOG] ${new Date().toISOString()} | Route: ${req.originalUrl} | User ID: ${userId}`)
      }
      return originalJson(body)
    }
  }
  next()
}

export default postLogger
