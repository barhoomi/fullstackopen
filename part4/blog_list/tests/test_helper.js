const Blog = require("../models/blog")

const initialBlogs = [
    {
        title: "No speed limit",
        author: "Derek Sivers",
        url: "https://sive.rs/kimo",
        likes: 1,
        _id: "777c44bdfecbea804ddd6bea"
    },
    {
        title: "You make your perfect world",
        author: "Derek Sivers",
        url: "https://sive.rs/ayw8",
        likes: 4,
        _id: "692c44bdfecbea604ddd6bea"
    },
    {
        title: "You play your own game",
        author: "Derek Sivers",
        url: "https://sive.rs/xxx",
        likes: 400,
        _id: "888c44bdfecbea804ddd6bea"
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