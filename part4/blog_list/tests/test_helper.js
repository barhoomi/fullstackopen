const Blog = require("../models/blog")

const initialBlogs = [
    {
        title: "No speed limit",
        author: "Derek Sivers",
        url: "https://sive.rs/kimo",
        likes: 1,
    },
    {
        title: "You make your perfect world",
        author: "Derek Sivers",
        url: "https://sive.rs/ayw8",
        likes: 4,
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ content: "willremovethissoon" })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map((blog) => blog.toJSON())
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
}