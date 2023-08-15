/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DB_URI: "mongodb+srv://dbtask_user:Reynalroddy2021--@nodetask.mlz0q.mongodb.net/next-jobs?retryWrites=true&w=majority",
        JWT_SECRET:'rey-jobs'
    }
}

module.exports = nextConfig
