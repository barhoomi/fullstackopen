const blogsRouter = require("express").Router()
const { request } = require("../app")
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

blogsRouter.delete("/api/blogs/:id", async (request, response, next) => {
    const id = request.params.id
    try {
        await Blog.findByIdAndDelete(id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.put("/api/blogs/:id", async (request, response, next) => {
    const id = request.params.id
    const {
        title,
        author,
        url,
        likes
    } = request.body

    try {
        const blog = await Blog.findById(id)

        if (!blog) {
            return response.status(404).end()
        }

        blog.title = title
        blog.author = author
        blog.url = url
        blog.likes = likes

        const updatedBlog = await blog.save()
        response.json(updatedBlog).status(200)
    }
    catch (error) {
        next(error)
    }
})


module.exports = blogsRouter