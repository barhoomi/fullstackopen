const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const { requestLogger } = require("../utils/middleware")

blogsRouter.get("/", (request, response) => {
    response.send("<h1>Hello World!</h1>")
})

blogsRouter.get("/api/blogs", async (request, response) => {
    const blogs = await Blog.find({})
    response.status(200).json(blogs)
})

blogsRouter.post("/api/blogs", async (request, response) => {
    const newBlog = new Blog(request.body)

    const blog = await newBlog.save()
    response.status(201).json(blog)

})

blogsRouter.get("/api/blogs/:id", async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            response.status(200).json(blog)
        }
        else {
            response.status(404).end()
        }
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter